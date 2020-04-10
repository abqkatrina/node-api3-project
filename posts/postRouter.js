const express = require('express');
const post = require("./postDb.js");
const user = require("../users/userDb")
const router = express.Router();

// from post, get all posts  WORKS
router.get('/', (req, res) => {
  post.get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});


// //from post, get one post by id WORKS
router.get('/:id', (req, res) => {
  post.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// from post, create post WORKS
router.post('/', validatePost, (req, res) => {
  post.insert(req.body)
  .then(post => {
    res.send(200).json({message:"post added"})
  })
  .catch(err =>{
    res.send(500).json({ message: "couldn't add post"})
  })
});

//from post, delete post by id WORKS
router.delete('/:id', (req, res) => {
  post.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The post has been deleted" });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  });
});

// from post, update post by id WORKS
router.put('/:id', validatePost, (req, res) => {
  post.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ 
            message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});


// custom middleware

// module.exports = function logger(req, res, next) {
//   const method = req.method;
//   const endpoint = req.originalUrl;
//   const timestamp = Date.now();

//   console.log(`${method} to ${endpoint} at ${timestamp}`);

//   next();

//   // logs to the console the following information about each request: request method, request url, and a timestamp
//   // - this middleware runs on every request made to the API (at server.js)
// };


function validatePost(req, res, next){
 if(!req.body){
   res.send(400).json({ message: 'missing post data'})
 } else if(!req.body.text){
   res.send(400).json({ message: ' missing required text field'})
 } else {
  next();
 }
  // validates the `body` on a request to create a new post
  // - if the request `body` is missing, cancel the request and respond with status `400` 
  // and `{ message: "missing post data" }`
  // - if the request `body` is missing the required `text` field, cancel the 
  // request and respond with status `400` and `{ message: "missing required text field" }`
};


module.exports = router;
