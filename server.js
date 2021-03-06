const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// ADD ROUTES HERE
require("./app/routes/thread.routes.js")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
