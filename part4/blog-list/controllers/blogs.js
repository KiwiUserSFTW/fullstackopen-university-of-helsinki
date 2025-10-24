const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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
    const { userId, ...newBlogFields } = request.body;

    const user = (await User.findById(userId)) || (await User.findOne({}));

    if (!user) {
      response.status(400).json({ error: "user not exist" });
    }

    const blog = new Blog({ ...newBlogFields, user: user._id });

    user.blogs = [...user.blogs, blog._id];
    user.save();

    response.status(201).json(await blog.save());
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
blogsRouter.delete("/:id", async (request, response, next) => {
  const deletedObjId = request.params.id;
  try {
    await Blog.findByIdAndDelete(deletedObjId);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = blogsRouter;
