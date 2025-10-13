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
