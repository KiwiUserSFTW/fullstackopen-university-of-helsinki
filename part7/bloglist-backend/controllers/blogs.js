const blogsRouter = require("express").Router();

// models
const Blog = require("../models/blog");

// middlewares
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const user = request.user;

    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();
    const blogWithUser = await savedBlog.populate("user", {
      username: 1,
      name: 1,
    });

    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    response.status(201).json(blogWithUser);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  const updatedObjId = request.params.id || null;

  try {
    const blog = await Blog.findById(updatedObjId);
    if (!blog) return response.status(404).json({ error: "blog not found" });

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: "unauthorized token" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    ).populate("user", {
      username: 1,
      name: 1,
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const deletedObjId = request.params.id;
  const user = request.user;

  try {
    const blog = await Blog.findById(deletedObjId);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (!(blog.user.toString() === user.id.toString())) {
      return response.status(401).json({ error: "unauthorized token" });
    }

    await Blog.findByIdAndDelete(deletedObjId);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post(
  "/:id/like",
  userExtractor,
  async (request, response, next) => {
    const updatedObjId = request.params.id || null;

    try {
      const blog = await Blog.findById(updatedObjId);
      if (!blog) return response.status(404).json({ error: "blog not found" });

      blog.likes = blog.likes + 1;
      await blog.save();

      response.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const objId = request.params.id || null;

  const { comment } = request.body;
  try {
    const blog = await Blog.findById(objId);
    if (!blog) return response.status(404).json({ error: "blog not found" });

    blog.comments = blog.comments.concat({ comment });
    await blog.save();
    const updatedBlog = await blog.populate("user", {
      username: 1,
      name: 1,
    });

    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
