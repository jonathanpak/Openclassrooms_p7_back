const Post = require("../models/post.model.js");

exports.createPost = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Post
  const post = new Post({
    id: req.body.id,
    authorId: req.body.authorId,
    content: req.body.content,
    dateCreated: req.body.dateCreated,
    threadId: req.body.threadId,
  });

  // Save Post in the database
  Post.createPost(post, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post.",
      });
    else res.send(data);
  });
};

// Retrieve all Categories from the database.
exports.findAllPosts = (req, res) => {
  Post.getAllPosts((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    else res.send(data);
  });
};

exports.findPostsFromThread = (req, res) => {
  Post.getPostsFromThread(req.params.threadId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    else res.send(data);
  });
};

exports.findSinglePost = (req, res) => {
  Post.getSinglePost(req.params.postId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the post.",
      });
    else res.send(data);
  });
};

exports.deletePost = (req, res) => {
  Post.removePost(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete post with id " + req.params.postId,
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};

exports.updatePost = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Post.updatePostById(req.params.postId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating post with id " + req.params.postId,
        });
      }
    } else res.send(data);
  });
};
