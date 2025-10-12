// test
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

// component
const app = require("../app");

// models
const Blog = require("../models/blog");

// mockdata
const { blogs } = require("./mockdata/blogsmockdata");

// api
const { default: mongoose } = require("mongoose");

const api = supertest(app);

// db preset
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe("api", () => {
  test("get return correct data", async () => {
    const blogsAtEnd = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(blogsAtEnd.body.length, blogs.length);
  });
  test("blog obj have id instead of _id", async () => {
    const blogsResponse = await api.get("/api/blogs").expect(200);
    const blogs = blogsResponse.body;

    blogs.forEach((blog) => {
      assert.ok("id" in blog);
      assert.ok(!("_id" in blog));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
