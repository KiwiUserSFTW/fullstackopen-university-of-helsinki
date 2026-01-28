const _ = require("lodash");

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

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.countBy(blogs, "author");
  const [author, blogsSummary] = _.maxBy(
    Object.entries(authors),
    (entry) => entry[1]
  );

  return {
    author: author,
    blogs: blogsSummary,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorsGrouped = _.groupBy(blogs, "author");
  const authors = Object.entries(authorsGrouped).map(([auth, value]) => ({
    author: auth,
    likes: _.sumBy(value, "likes"),
  }));

  return _.maxBy(authors, "likes");
};

/* 
implementation without loadash
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let authors;
  let topAuthor;

  for (let i = 1; i < blogs.length; i++) {
    const blog = blogs[i];
    const existingAuthorIndex = authors.findIndex(
      (a) => a.author === blog.author
    );

    if (existingAuthorIndex === -1) {
      authors = [
        ...authors,
        {
          author: blog.author,
          blogs: 1,
        },
      ];
    } else {
      authors[existingAuthorIndex].blogs += 1;
    }
  }

  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];
    if (author.blogs >= topAuthor.blogs) topAuthor = author;
  }

  return topAuthor;
};
*/

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
