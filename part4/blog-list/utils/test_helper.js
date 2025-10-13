const Blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const lastBlogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs[0].toJSON();
};
module.exports = {
  blogsInDb,
  lastBlogInDb,
};
