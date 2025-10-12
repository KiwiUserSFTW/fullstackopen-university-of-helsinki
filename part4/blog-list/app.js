// app
const express = require("express");
const app = express();

// db
const connectBlogDb = require("./db/connectBlogDb");
const blogsRouter = require("./controllers/blogs");

// middlewares
const { errorHandler } = require("./utils/middleware");

app.use(express.json());

connectBlogDb();

app.get("/", (request, response) => {
  response.send("hello");
});

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

module.exports = app;
