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
    const blogsResponse = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(blogsResponse.body.length, blogs.length);
  });
  test("blog obj have id instead of _id", async () => {
    const blogsResponse = await api.get("/api/blogs").expect(200);
    const blogs = blogsResponse.body;

    blogs.forEach((blog) => {
      assert.ok("id" in blog);
      assert.ok(!("_id" in blog));
    });
  });
  test("post add new blog", async () => {
    const newBlog = {
      title: "testBlog",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsResponse = await api.get("/api/blogs").expect(200);
    const blogsBody = blogsResponse.body;
    const createdBlog = blogsBody.find((b) => b.title === newBlog.title);

    assert.strictEqual(blogsBody.length, blogs.length + 1);
    assert.ok(createdBlog);
  });
});

after(async () => {
  await mongoose.connection.close();
});
