const Blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const lastBlogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs[0].toJSON();
};

const notExistingId = async () => {
  const blog = new Blog({
    title: "aaaaaaaaaa",
    author: "aaaaaaaaa",
    url: "aaaaaaaaa",
    likes: 5,
  });
  await blog.save();

  await Blog.findByIdAndDelete(blog.id);

  return blog.id;
};
module.exports = {
  blogsInDb,
  lastBlogInDb,
  notExistingId,
};
