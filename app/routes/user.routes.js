const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.get("/api/test/all", userController.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  // Delete User with userId
  app.delete(
    "/api/auth/delete/:userId",
    [authJwt.verifyToken],
    authController.delete
  );

  // Update User with userId
  app.put(
    "/api/auth/update/:userId",
    [authJwt.verifyToken],
    authController.update
  );

  // Retrieve single user by userId
  app.get(
    "/api/user/:userId",
    [authJwt.verifyToken],
    authController.findSingleUserById
  );

  // Retrieve currently loggedIn user
  app.get("/api/user/", [authJwt.verifyToken], userController.getUserId);
};
