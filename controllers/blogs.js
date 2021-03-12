const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

// Get all blog items
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

// Create new blog item
blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    if (!request.body.title || !request.body.url) {
      response.status(400).end();
    } else {
      try {
        const body = request.body;
        const user = request.user;
        if (!request.token || !user._id) {
          return response
            .status(401)
            .json({ error: "token missing or invalid" });
        }

        const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
          user: user._id,
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
      } catch (exception) {
        next(exception);
      }
    }
  }
);

// Delete blog item
blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;
      if (!request.token || !user._id) {
        return response.status(401).json({ error: "token missing or invalid" });
      }
      const blog = await Blog.findById(request.params.id);
      if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        return response
          .status(401)
          .json({ error: "you are unauthorized to perfom that action" });
      }
    } catch (exception) {
      next(exception);
    }
  }
);

// Update blog item
blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
