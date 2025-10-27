// test
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

// helper
const helper = require("../../utils/test_helper");

// component
const app = require("../../app");

// models
const Blog = require("../../models/blog");
const User = require("../../models/user");

// mockdata
const { blogs } = require("../mockdata/blogsmockdata");

// api
const { default: mongoose } = require("mongoose");

const api = supertest(app);

// db preset
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Blog.insertMany(blogs);
});

describe("blogs api", () => {
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
      const { token } = await helper.getUserWithToken();

      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 1,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

      const blogsFromDb = await helper.blogsInDb();
      const createdBlog = blogsFromDb.find((b) => b.title === newBlog.title);

      assert.strictEqual(blogsFromDb.length, blogs.length + 1);
      assert.ok(createdBlog);
    });
    test("created blog saved to user", async () => {
      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };

      const { user, token } = await helper.getUserWithToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const savedUser = await User.findById(user._id);
      assert.strictEqual(savedUser.blogs.length, 1);
    });
    test("default likes 0 if property missing", async () => {
      const { token } = await helper.getUserWithToken();

      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

      const blogsFromDb = await helper.blogsInDb();
      const createdBlog = blogsFromDb.find((b) => b.title === newBlog.title);

      assert.strictEqual(createdBlog.likes, 0);
    });
    test("response status 400 if title or url missing", async () => {
      const { token } = await helper.getUserWithToken();

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
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(blog)
          .expect(400);
      }
    });
    test("fail without token", async () => {
      const newBlog = {
        title: "testBlog",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 1,
      };

      const response = await api.post("/api/blogs").send(newBlog).expect(401);

      assert.strictEqual(response.body.error, "unauthorized");
    });
  });
  describe("deleting blogs", () => {
    test("blogs length reduced by 1", async () => {
      const { blog, token } = await helper.getBlogWithUser(); // users increased by 1

      await api
        .delete(`/api/blogs/${blog.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      const blogsFromDb = await helper.blogsInDb();
      assert.strictEqual(blogsFromDb.length, blogs.length);
    });
    test("blog not exist after deleting", async () => {
      const { blog, token } = await helper.getBlogWithUser(); // users increased by 1

      await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(204)
        .set("Authorization", `Bearer ${token}`);

      const blogsFromDb = await helper.blogsInDb();
      const deletedBlog = blogsFromDb.find((b) => b.id === blog.id);

      assert.ok(!deletedBlog);
    });
    test("fail with invalid token", async () => {
      await User.deleteMany({});
      const { blog } = await helper.getBlogWithUser(); // users increased by 1

      const response = await api
        .delete(`/api/blogs/${blog._id}`)
        .set("Authorization", "Bearer invalidToken")
        .expect(401)
        .expect("Content-Type", /application\/json/);

      const blogsFromDb = await helper.blogsInDb();
      assert.strictEqual(blogsFromDb.length, blogs.length + 1);
      assert.strict(response.body.error, "invalid token");
    });
  });
  describe("changing blogs", () => {
    test("blogs changes saved in db", async () => {
      const blogForChanging = await helper.lastBlogInDb();
      const blogWithChanges = {
        ...blogForChanging,
        likes: 10,
        title: "Type peaces",
      };

      const returnedBlog = await api
        .put(`/api/blogs/${blogForChanging.id}`)
        .send(blogWithChanges)
        .expect(200);

      assert.deepStrictEqual(blogWithChanges, returnedBlog.body);
    });
    test("respone 404 for not existing id", async () => {
      const blogForChanging = await helper.lastBlogInDb();
      const blogWithChanges = {
        ...blogForChanging,
        likes: 10,
        title: "Type peaces",
      };
      const notExistingId = await helper.notExistingId();

      const response = await api
        .put(`/api/blogs/${notExistingId}`)
        .send(blogWithChanges)
        .expect(404);

      assert.deepStrictEqual(response.body.error, "blog not found");
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
