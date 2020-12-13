const Thread = require("../models/thread.model.js");

// Retrieve all Categories from the database.
exports.findAllThreads = (req, res) => {
  Thread.getAllThreads((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving threads.",
      });
    else res.send(data);
  });
};

exports.findThreadFromCategory = (req, res) => {
  Thread.getThreadsFromCategory(req.params.categoryId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving threads.",
      });
    else res.send(data);
  });
};

exports.createThread = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Thread
  const thread = new Thread({
    id: req.body.id,
    authorId: req.body.authorId,
    title: req.body.title,
    content: req.body.content,
    dateCreated: req.body.dateCreated,
    categoryId: req.body.categoryId,
  });

  // Save Thread in the database
  Thread.createThread(thread, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Thread.",
      });
    else res.send(data);
  });
};

exports.findSingleThread = (req, res) => {
  Thread.getSingleThread(req.params.threadId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the thread.",
      });
    else res.send(data);
  });
};

exports.deleteThread = (req, res) => {
  Thread.removeThread(req.params.threadId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found thread with id ${req.params.threadId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete thread with id " + req.params.threadId,
        });
      }
    } else res.send({ message: `Thread was deleted successfully!` });
  });
};

exports.updateThread = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Thread.updateThreadById(req.params.threadId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Thread with id ${req.params.threadId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Thread with id " + req.params.threadId,
        });
      }
    } else res.send(data);
  });
};

exports.getThreadLikes = (req, res) => {
  Thread.getLikesFromThread(req.params.threadId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the thread likes.",
      });
    else res.send(data);
  });
};

exports.manageThreadLike = (req, res) => {
  Thread.manageLikeOfThread(req.userId, req.params.threadId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found thread with id ${req.params.threadId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating thread with id " + req.params.threadId,
        });
      }
    } else res.send(data);
  });
};
