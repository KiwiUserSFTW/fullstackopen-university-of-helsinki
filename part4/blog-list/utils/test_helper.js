const Blog = require("../models/blog");
const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
module.exports = {
  blogsInDb,
  usersInDb,
  lastBlogInDb,
  notExistingId,
};
