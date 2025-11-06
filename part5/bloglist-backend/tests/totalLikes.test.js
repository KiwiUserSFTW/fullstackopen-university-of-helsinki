const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { oneBlog, blogs } = require("./mockdata/blogsmockdata");

describe("total likes", () => {
  test("When list is empty, funtion return zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(oneBlog);
    assert.strictEqual(result, 5);
  });
  test("When the list has more than one blog, return the sum of the likes of all blogs", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});
