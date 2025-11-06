const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { blogs, oneBlog } = require("./mockdata/blogsmockdata");

describe("most blogs", () => {
  test("When list is empty, funtion return null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("When list exist one blog, return that author", () => {
    const result = listHelper.mostBlogs(oneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("When the list has more than one blog, return author with more blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
