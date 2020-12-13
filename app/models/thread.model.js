const sql = require("./db.js");

// constructor
const Thread = function (thread) {
  this.id = thread.id;
  this.authorId = thread.authorId;
  this.title = thread.title;
  this.content = thread.content;
  this.dateCreated = thread.dateCreated;
  this.categoryId = thread.categoryId;
  this.usersLike = 0;
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

    if (res.length == 0) {
      // not found thread with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted thread with id: ", id);
    result(null, res);
  });
};

Thread.addLikeToThread = (id, thread, result) => {
  sql.query("UPDATE threads ");
};

Thread.updateThreadById = (id, thread, result) => {
  sql.query(
    "UPDATE threads SET title = ?, content = ? WHERE id = ?",
    [thread.title, thread.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length == 0) {
        // not found Thread with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated thread: ", { id: id, ...thread });
      result(null, { id: id, ...thread });
    }
  );
};

Thread.getLikesFromThread = (threadId, result) => {
  sql.query(
    "SELECT usersLike FROM threads WHERE id =  ? ",
    [threadId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length == 0) {
        // not found Thread with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );
};

Thread.manageLikeOfThread = (userId, threadId, result) => {
  let likesArray = [];

  sql.query(
    "SELECT usersLike FROM threads WHERE id =  ? ",
    [threadId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length == 0) {
        // not found Thread with the id
        result({ kind: "not_found" }, null);
        return;
      }

      if (res) {
        likesArray = res[0].usersLike.split(",").map(Number);

        if (likesArray.includes(userId)) {
          const index = likesArray.indexOf(userId);
          likesArray.splice(index, 1);

          sql.query(
            "UPDATE threads SET usersLike ='" + likesArray + "' WHERE id = ?",
            [threadId],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              console.log("User removed from thread " + threadId);
              result(null, res);
            }
          );
        } else {
          likesArray.push(userId);

          sql.query(
            "UPDATE threads SET usersLike ='" + likesArray + "' WHERE id = ?",
            [threadId],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              console.log("User added to thread " + threadId);
              result(null, res);
            }
          );
        }
      }
    }
  );
};

module.exports = Thread;
