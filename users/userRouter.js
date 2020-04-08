const express = require('express');
const user = require("./userDb.js");
const router = express.Router();

router.post('/', (req, res) => {
  user.insert(req.body)
});

router.post('/:id/posts', (req, res) => {
  console.log(req.body)
  res.send(200).json({message: "yup"})
});

router.get('/', (req, res) => {
  user.get(req.query)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  });
});

router.get('/:id', (req, res) => {
  router.get('/:user_id', (req, res) => {
    user.getById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The user information could not be retrieved."
        });
      });
  });
});

router.get('/:id/posts', (req, res) => {
  user.getUserPosts(req.body.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  });});

router.delete('/:id', (req, res) => {
  user.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The user has been deleted" });
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The user could not be removed"
    });
  });
});

router.put('/:id', (req, res) => {
  user.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ 
          message: "The user with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The user information could not be modified.",
    });
  });});

//custom middleware
module.exports = function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  const timestamp = Date.now();

  console.log(`${method} to ${endpoint} at ${timestamp}`);

  next();

  // logs to the console the following information about each request: request method, request url, and a timestamp
  // - this middleware runs on every request made to the API
};

function validateUserId(req, res, next) {
  req.user_id
  next();

//   validates the user id on every request that expects a user id parameter
//   - if the `id` parameter is valid, store that user object as `req.user`
//   - if the `id` parameter does not match any user id in the database, cancel the request and
//    respond with status `400` and `{ message: "invalid user id" }`
}

function validateUser(req, res, next) {
  if(!req.body){

  } else {

  }

  console.log(`${method} to ${endpoint}`);

  next(); 

  // validates the `body` on a request to create a new user
  // - if the request `body` is missing, cancel the request and respond with status `400` 
  // and `{ message: "missing user data" }`
  // - if the request `body` is missing the required `name` field, cancel the request 
  // and respond with status `400` and `{ message: "missing required name field" }`
}

function validatePost(req, res, next) {

  next();

  // validates the `body` on a request to create a new post
  // - if the request `body` is missing, cancel the request and respond with status `400` 
  // and `{ message: "missing post data" }`
  // - if the request `body` is missing the required `text` field, cancel the 
  // request and respond with status `400` and `{ message: "missing required text field" }`
};

// module.exports = function validatePostId(req, res, next) {
 
//   next();
}

module.exports = router;
