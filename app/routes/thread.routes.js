const { authJwt } = require("../middleware");

module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");
  const threads = require("../controllers/thread.controller.js");
  const posts = require("../controllers/post.controller.js");

  // Retrieve all categories
  app.get("/categories", [authJwt.verifyToken], categories.findAll);

  // Retrieve all threads
  app.get("/threads", [authJwt.verifyToken], threads.findAllThreads);

  // Retrieve thread from a single category by categoryId
  app.get(
    "/threads/:categoryId",
    [authJwt.verifyToken],
    threads.findThreadFromCategory
  );

  // Create a new Thread
  app.post("/threads", [authJwt.verifyToken], threads.createThread);

  // Retrieve single thread
  app.get(
    "/threads/single/:threadId",
    [authJwt.verifyToken],
    threads.findSingleThread
  );

  // Delete a Thread with threadId
  app.delete(
    "/threads/single/:threadId",
    [authJwt.verifyToken],
    threads.deleteThread
  );

  // Update a Thread with threadId
  app.put(
    "/threads/single/:threadId",
    [authJwt.verifyToken],
    threads.updateThread
  );

  // Create a new Post
  app.post("/posts", [authJwt.verifyToken], posts.createPost);

  // Retrieve all posts
  app.get("/posts", [authJwt.verifyToken], posts.findAllPosts);

  // Retrieve a single post by id
  app.get("/posts/:postId", [authJwt.verifyToken], posts.findSinglePost);

  // Retrieve posts from a single thread by threadId
  app.get(
    "/threads/:threadId/posts",
    [authJwt.verifyToken],
    posts.findPostsFromThread
  );

  // Delete a Post with postdId
  app.delete("/posts/:postId", [authJwt.verifyToken], posts.deletePost);

  // Update a Post with postId
  app.put("/posts/:postId", [authJwt.verifyToken], posts.updatePost);

  // Retrieve likes from post by id
  app.get("/posts/likes/:postId", posts.getPostLikes);

  // Add Likes to a Post
  app.put("/posts/likes/:postId", [authJwt.verifyToken], posts.manageLike);

  // Retrieve likes from thread by id
  app.get("/threads/likes/:threadId", threads.getThreadLikes);

  // Add Likes to a thread
  app.put(
    "/threads/likes/:threadId",
    [authJwt.verifyToken],
    threads.manageThreadLike
  );
};
