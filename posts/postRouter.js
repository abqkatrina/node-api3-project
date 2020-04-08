const express = require('express');
const post = require("./postDb.js");
const router = express.Router();

// from post, get all posts
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

// from user, get all users
// router.get('/users', (req, res) => {
//   user.get(req.query)
//     .then(user => {
//       res.status(200).json(user);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         error: "The user information could not be retrieved."
//       });
//     });
// });

//from user, get post by user id
// router.get('/:user_id', (req, res) => {
//   user.getUserPosts(req.body.id)
//     .then(post => {
//       res.status(200).json(post);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         error: "The user information could not be retrieved."
//       });
//     });
// });

//from post, get one post by id
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

//from user, get one user by id
// router.get('/users/:user_id', (req, res) => {
//   user.getById(req.params.id)
//     .then(user => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: "The user with the specified ID does not exist." });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         error: "The user information could not be retrieved."
//       });
//     });
// });

// from post, create post
router.post('/', (req, res) => {
  post.insert(post)
});

//from user, create user
// router.post('/users', (req, res) => {
//   user.insert(user)
// });

//from post, delete post by id
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
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  });
});

//from user, delete user by id
// router.delete('/users/:id', (req, res) => {
//   user.remove(req.params.id)
//   .then(count => {
//     if (count > 0) {
//       res.status(200).json({ message: "The user has been deleted" });
//     } else {
//       res.status(404).json({ message: "The user with the specified ID does not exist." });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       error: "The user could not be removed"
//     });
//   });
// });

// from post, update post by id
router.put('/:id', (req, res) => {
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
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

// from user, update user by id
// router.put('/users/:user_id', (req, res) => {
//   user.update(req.params.id, req.body)
//     .then(user => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ 
//             message: "The user with the specified ID does not exist." });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         error: "The user information could not be modified.",
//       });
//     });
// });

// custom middleware

// module.exports = function logger(req, res, next) {
//   const method = req.method;
//   const endpoint = req.originalUrl;
//   const timestamp = Date.now();

//   console.log(`${method} to ${endpoint} at ${timestamp}`);

//   next();

//   // logs to the console the following information about each request: request method, request url, and a timestamp
//   // - this middleware runs on every request made to the API
// };

module.exports = function validateUserId(req, res, next){
  req.user_id
  next();

//   validates the user id on every request that expects a user id parameter
//   - if the `id` parameter is valid, store that user object as `req.user`
//   - if the `id` parameter does not match any user id in the database, cancel the request and
//    respond with status `400` and `{ message: "invalid user id" }`
};

module.exports = function validateUser(req, res, next){
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
};

module.exports = function validatePost(req, res, next){
 

  next();

  // validates the `body` on a request to create a new post
  // - if the request `body` is missing, cancel the request and respond with status `400` 
  // and `{ message: "missing post data" }`
  // - if the request `body` is missing the required `text` field, cancel the 
  // request and respond with status `400` and `{ message: "missing required text field" }`
};

// module.exports = function validatePostId(req, res, next) {
 
//   next();

// };


module.exports = router;
