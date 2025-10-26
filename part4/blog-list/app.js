// app
const express = require("express");
const app = express();

// db
const connectBlogDb = require("./db/connectBlogDb");

// routers
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// middlewares
const { errorHandler, tokenExtractor } = require("./utils/middleware");

app.use(express.json());
app.use(tokenExtractor);
connectBlogDb();

app.get("/", (request, response) => {
  response.send("hello");
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

module.exports = app;
