// test
const { test, describe, beforeEach, after, afterEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

// helper
const helper = require("../../utils/test_helper");

// component
const app = require("../../app");

// models
const User = require("../../models/user");

// api
const { default: mongoose } = require("mongoose");

// tools
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("users api", () => {
  describe("creating user without initial data", () => {
    describe("status code 400 if", () => {
      beforeEach(async () => {
        await User.deleteMany({});
      });
      test("password less then 3 characters", async () => {
        const newUser = {
          name: "jhon",
          username: "Jhonsonuk",
          password: "gr",
        };

        const response = await api
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/);

        assert.deepStrictEqual(
          response.body.error,
          "password should be at least 3 symbols"
        );
      });
      test("username less then 3 characters", async () => {
        const newUser = {
          name: "jhon",
          username: "Jh",
          password: "greatbritan",
        };

        await api
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
      test("no password", async () => {
        const newUser = {
          name: "jhon",
          username: "Jhonsonuk",
        };
        await api
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
      // amount in db hasn't been increased
      afterEach(async () => {
        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, 0);
      });
    });
  });
  describe("creating user with initial data", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const roundSalt = 5;
      const passwordHash = await bcrypt.hash("sekret", roundSalt);
      const user = new User({ username: "Jhonsonuk", passwordHash });

      await user.save();
    });
    test("pass with correct data", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "jhon",
        username: "Jhonson",
        password: "greatbritan",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    });
    test("doesnt' save with uncorrect data", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "jhon",
        password: "greatbritan",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test("fails with repeat username", async () => {
      const newUser = {
        name: "jhon",
        username: "Jhonsonuk",
        password: "greatbritan",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert(response.body.error.includes("expected `username` to be unique"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
