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
    console.log("ONE");

    const blogsAtEnd = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log(blogs, "BLOGS");
    assert.strictEqual(blogsAtEnd.body.length, blogs.length);
  });
  after(async () => {
    await mongoose.connection.close();
  });
});
