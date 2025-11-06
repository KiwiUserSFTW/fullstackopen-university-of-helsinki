const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

const userInDb = async () => {
  return await User.findOne();
};

const getUserWithToken = async () => {
  const password = "Curcuma";
  const newUser = {
    name: "Fish",
    username: "Fish nicy",
    password: await bcrypt.hash(password, 10),
  };

  const getUser = async (newUser) => {
    const user = new User(newUser);
    return await user.save();
  };

  const user = await getUser(newUser);

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return {
    user: user,
    token: jwt.sign(userForToken, process.env.SECRET),
  };
};

const getBlogWithUser = async () => {
  const { user, token } = await getUserWithToken();

  const newBlog = {
    title: "Shells",
    author: "Waves",
    url: "ocean.com",
    likes: 0,
    user: user._id,
  };

  const blog = new Blog(newBlog);
  const savedBlog = await blog.save();

  // save blog to user
  user.blogs.push(newBlog._id);
  await user.save();

  return {
    user: user,
    blog: savedBlog,
    token: token,
  };
};

module.exports = {
  blogsInDb,
  usersInDb,
  lastBlogInDb,
  notExistingId,
  userInDb,
  getUserWithToken,
  getBlogWithUser,
};
