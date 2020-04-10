const express = require('express');
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");
const server = express();

//middleware
server.use(logger);
server.use(express.json());

//endpoints
server.use("/posts", postRouter);
server.use("/users", userRouter)

// server.get("/", (req, res) => {
//   const query = req.query;

//   console.log("query", query);

//   res.status(200).json(query);
// });





//custom middleware
function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  const timestamp = Date.now();

  console.log(`${method} to ${endpoint} at ${timestamp}`);

  next();

  // logs to the console the following information about each request: request method, request url, and a timestamp
  // - this middleware runs on every request made to the API
};

module.exports = server;
