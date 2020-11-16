const sql = require("./db.js");

// constructor
const Thread = function (thread) {
  this.id = thread.id;
  this.authorId = thread.authorId;
  this.title = thread.title;
  this.content = thread.content;
  this.dateCreated = thread.dateCreated;
  this.categoryId = thread.categoryId;
};

Thread.createThread = (newThread, result) => {
  sql.query("INSERT INTO threads SET ?", newThread, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created thread: ", { id: res.insertId, ...newThread });
    result(null, { id: res.insertId, ...newThread });
  });
};

Thread.getAllThreads = (result) => {
  sql.query("SELECT * FROM threads", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Thread.getThreadsFromCategory = (categoryId, result) => {
  sql.query(
    "SELECT * FROM threads WHERE categoryId =  " + categoryId + " ",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Thread.getSingleThread = (threadId, result) => {
  sql.query(
    "SELECT * FROM threads WHERE id =  " + threadId + " ",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Thread.removeThread = (id, result) => {
  sql.query("DELETE FROM threads WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found thread with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted thread with id: ", id);
    result(null, res);
  });
};

module.exports = Thread;
