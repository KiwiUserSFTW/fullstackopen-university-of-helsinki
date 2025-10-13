// test
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

// helper
const helper = require("../utils/test_helper");

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
  describe("getting correct data", () => {
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
  });
  describe("adding new blog", () => {
    test("post add new blog", async () => {
      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 1,
      };

      await api.post("/api/blogs").send(newBlog).expect(201);

      const blogsFromDb = await helper.blogsInDb();
      const createdBlog = blogsFromDb.find((b) => b.title === newBlog.title);

      assert.strictEqual(blogsFromDb.length, blogs.length + 1);
      assert.ok(createdBlog);
    });
    test("default likes 0 if property missing", async () => {
      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };

      await api.post("/api/blogs").send(newBlog).expect(201);

      const blogsFromDb = await helper.blogsInDb();
      const createdBlog = blogsFromDb.find((b) => b.title === newBlog.title);

      assert.strictEqual(createdBlog.likes, 0);
    });
    test("response status 400 if title or url missing", async () => {
      const invalidBlogs = [
        {
          // wihout url
          title: "testBlog",
          author: "Edsger W. Dijkstra",
          likes: 1,
        },
        {
          // without title
          author: "Edsger W. Dijkstra",
          url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
          likes: 1,
        },
      ];

      for (let blog of invalidBlogs) {
        await api.post("/api/blogs").send(blog).expect(400);
      }
    });
  });
  describe("deleting blogs", () => {
    test("blogs length reduced by 1", async () => {
      const blogForDeleting = await helper.lastBlogInDb();
      await api.delete(`/api/blogs/${blogForDeleting.id}`).expect(204);
      const blogsFromDb = await helper.blogsInDb();
      assert.strictEqual(blogsFromDb.length, blogs.length - 1);
    });
    test("blog not exist after deleting", async () => {
      const blogForDeleting = await helper.lastBlogInDb();
      await api.delete(`/api/blogs/${blogForDeleting.id}`).expect(204);

      const blogsFromDb = await helper.blogsInDb();
      const deletedBlog = blogsFromDb.find((b) => b.id === blogForDeleting.id);

      assert.ok(!deletedBlog);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
