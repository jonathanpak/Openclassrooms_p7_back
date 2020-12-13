const sql = require("./db.js");

// constructor
const Post = function (post) {
  this.id = post.id;
  this.authorId = post.authorId;
  this.content = post.content;
  this.dateCreated = post.dateCreated;
  this.threadId = post.threadId;
  this.usersLike = 0;
};

Post.createPost = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Post.getAllPosts = (result) => {
  sql.query("SELECT * FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Post.getPostsFromThread = (threadId, result) => {
  sql.query(
    "SELECT * FROM posts WHERE threadId =  " + threadId + " ",
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

Post.getSinglePost = (postId, result) => {
  sql.query("SELECT * FROM posts WHERE id =  " + postId + " ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Post.removePost = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted post with id: ", id);
    result(null, res);
  });
};

Post.updatePostById = (id, post, result) => {
  sql.query(
    "UPDATE posts SET content = ? WHERE id = ?",
    [post.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.getLikesFromPost = (postId, result) => {
  sql.query(
    "SELECT usersLike FROM posts WHERE id =  ? ",
    [postId],
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

Post.manageLikeOfPost = (userId, postId, result) => {
  let likesArray = [];

  sql.query(
    "SELECT usersLike FROM posts WHERE id =  ? ",
    [postId],
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
            "UPDATE posts SET usersLike ='" + likesArray + "' WHERE id = ?",
            [postId],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              console.log("User removed from post " + postId);
              result(null, res);
            }
          );
        } else {
          likesArray.push(userId);

          sql.query(
            "UPDATE posts SET usersLike ='" + likesArray + "' WHERE id = ?",
            [postId],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              console.log("User added to post " + postId);
              result(null, res);
            }
          );
        }
      }
    }
  );
};

module.exports = Post;
