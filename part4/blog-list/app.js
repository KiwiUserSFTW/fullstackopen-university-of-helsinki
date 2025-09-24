// app
const express = require("express");
const app = express();

// db
const connectBlogDb = require("./db/connectBlogDb");
const blogsRouter = require("./controllers/blogs");

app.use(express.json());

connectBlogDb();

app.get("/", (request, response) => {
  response.send("hello");
});

app.use("/api/blogs", blogsRouter);

module.exports = app;
