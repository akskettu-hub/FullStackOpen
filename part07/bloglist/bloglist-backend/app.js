const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const { info, error } = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

info("Connecting to MongoDB", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("Connected to MongoDB");
  })
  .catch((error) => {
    error("Error connecting to MongoDB", error);
  });

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor)

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
