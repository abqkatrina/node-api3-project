const express = require('express');
const postRouter = require("./posts/postRouter.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  const query = req.query;

  console.log("query", query);

  res.status(200).json(query);
});


server.use("/posts", postRouter);



//custom middleware in router


module.exports = server;
