module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  const categories = require("../controllers/category.controller.js");
  const threads = require("../controllers/thread.controller.js");
  const posts = require("../controllers/post.controller.js");

  // Retrieve all categories
  app.get("/categories", categories.findAll);

  // Retrieve all threads
  app.get("/threads", threads.findAllThreads);

  // Retrieve thread from a single category by categoryId
  app.get("/threads/:categoryId", threads.findThreadFromCategory);

  // Create a new Thread
  app.post("/threads", threads.createThread);

  // Retrieve single thread
  app.get("/threads/single/:threadId", threads.findSingleThread);

  // Delete a Thread with threadId
  app.delete("/threads/single/:threadId", threads.deleteThread);

  // Update a Thread with threadId
  app.put("/threads/single/:threadId", threads.updateThread);

  // Create a new Post
  app.post("/posts", posts.createPost);

  // Retrieve all posts
  app.get("/posts", posts.findAllPosts);

  // Retrieve a single post by id
  app.get("/posts/:postId", posts.findSinglePost);

  // Retrieve posts from a single thread by threadId
  app.get("/threads/:threadId/posts", posts.findPostsFromThread);

  // Delete a Thread with threadId
  app.delete("/posts/:postId", posts.deletePost);

  // Update a Thread with threadId
  app.put("/posts/:postId", posts.updatePost);

  // Create a new Customer
  app.post("/customers", customers.create);

  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
};
