const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const saltRounds = 10;
  const password = "test";
  passwordHash = await bcrypt.hash(password, saltRounds);

  const testUser = new User({ username: "root", passwordHash });
  const user = await testUser.save();
  const userForToken = { username: user.username, id: user._id };
  token = jwt.sign(userForToken, process.env.SECRET);

  for (let blog of helper.initialBlogs) {
    blog.user = user._id;
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("when there are initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await helper.blogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await helper.blogsInDb();
    expect(response[0].id).toBeDefined();
  });

  test("successfully updating a single blog resource", async () => {
    const blogUpdate = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8,
    };
    let response = await helper.blogsInDb();
    await api
      .put(`/api/blogs/${response[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(blogUpdate);
    responseAfterUpdate = await helper.blogsInDb();

    expect(responseAfterUpdate[0].likes).toBe(8);
  });
});

describe("addition of a new blog", () => {
  test("successfully creates a new blog post", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Me",
      url: "localhost",
      likes: 6,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await helper.blogsInDb();
    const titles = response.map((blog) => blog.title);
    // Total number of blogs is increased by one
    expect(response).toHaveLength(helper.initialBlogs.length + 1);
    // Content of blog post is saved correctly
    expect(titles).toContain("Test Blog");
  });

  test("value of likes property defaults to 0 if omitted", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Me",
      url: "localhost",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data", async () => {
    const newBlog = {
      author: "Me",
      likes: 6,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("successfully deletion of a single blog resource", async () => {
    let response = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${response[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    responseAfterDelete = await helper.blogsInDb();

    const titles = responseAfterDelete.map((blog) => blog.title);

    expect(titles).not.toContain(response[0].title);
    expect(responseAfterDelete).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
