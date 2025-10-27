const blogsRouter = require("express").Router();

// models
const Blog = require("../models/blog");
const User = require("../models/user");

// tools
const jwt = require("jsonwebtoken");

// middlewares
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
      response.status(400).json({ error: "user not exist" });
    }

    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "blog not found" });
    }

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const deletedObjId = request.params.id;
  const user = await request.user;

  try {
    const blog = await Blog.findById(deletedObjId);

    if (!(blog.user.toString() === user.id.toString())) {
      return response.status(401).json({ error: "unauthorized token" });
    }

    await Blog.findByIdAndDelete(deletedObjId);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
