const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  response.json(await Blog.find({}));
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    response.status(201).json(await blog.save());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
