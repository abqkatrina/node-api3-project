const express = require('express');
const user = require("./userDb.js");
const router = express.Router();



// router.post('/:id/posts', validateUserId, (req, res) => {
//   console.log(req.body)
//   res.send(200).json({message: "yup"})
// });


//works
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

//works
router.get('/:id', validateUserId, (req, res) => {
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

//works
router.get('/:id/posts', validateUserId, (req, res) => {
  user.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  });});

router.post('/', validateUser, (req, res) => {
  user.insert(req.body)
});

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUser, (req, res) => {
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

function validateUserId(req, res, next) {
  user.getById(req.params.id)
  .then(user => {
    if(!user) {
      res.status(404).json({ message: "invalid user id"})
    } else {
      next();
    }
  })
//   validates the user id on every request that expects a user id parameter
//   - if the `id` parameter is valid, store that user object as `req.user`
//   - if the `id` parameter does not match any user id in the database, cancel the request and
//    respond with status `400` and `{ message: "invalid user id" }`
}

function validateUser(req, res, next) {
  if(!req.body){   // validates the `body` on a request to create a new user
    res.send(400).json({ message: "missing user data"}) // - if the request `body` is missing, cancel the request and respond with status `400` 
  // and `{ message: "missing user data" }`
  } else if(!req.body.name){   // - if the request `body` is missing the required `name` field, cancel the request 
  // and respond with status `400` and `{ message: "missing required name field" }`
    res.send(400).json({ message: "missing required name field"})
  } else {
  console.log(`${method} to ${endpoint}`);
  next(); 
  }
}

module.exports = router;
