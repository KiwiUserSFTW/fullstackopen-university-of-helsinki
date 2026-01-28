const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { blogs, oneBlog } = require("./mockdata/blogsmockdata");

describe("favorite blog", () => {
  test("When list is empty, funtion return null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("When list exist one blog, return that", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    assert.deepStrictEqual(result, oneBlog[0]);
  });
  test("When the list has more than one blog, return one with more likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, blogs[2]);
  });
});
