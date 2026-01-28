// test
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

// component
const app = require("../../app");

// models
const User = require("../../models/user");

// api
const { default: mongoose } = require("mongoose");

// tools
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("login api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("salami", 10);
    const user = new User({
      username: "Duck",
      passwordHash: passwordHash,
    });
    await user.save();
  });
  test("pass with correct credentials", async () => {
    const userCred = {
      username: "Duck",
      password: "salami",
    };
    const response = await api
      .post("/api/login")
      .send(userCred)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert(response.body.token);
  });
  test("fail with uncorrect credentials", async () => {
    const userCred = {
      username: "Duck",
      password: "mozarella",
    };
    const response = await api
      .post("/api/login")
      .send(userCred)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert(!response.body.token);
  });
});

after(async () => {
  await mongoose.connection.close();
});
