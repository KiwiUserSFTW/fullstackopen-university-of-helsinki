const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    sum += blog.likes;
    return sum;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let favoriteBlog = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    const blog = blogs[i];
    if (blog.likes >= favoriteBlog.likes) favoriteBlog = blog;
  }

  console.log(blogs);
  return favoriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
