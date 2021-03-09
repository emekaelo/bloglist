const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("api database requests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

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
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    // Total number of blogs is increased by one
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
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
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data", async () => {
    const newBlog = {
      author: "Me",
      likes: 6,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
