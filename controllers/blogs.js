const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Get all blog items
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

// Create new blog item
blogsRouter.post("/", async (request, response, next) => {
  try {
    if (!request.body.title || !request.body.url) {
      response.status(400).end();
    } else {
      const blog = new Blog(request.body);
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
