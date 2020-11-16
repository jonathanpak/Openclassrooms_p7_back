const sql = require("./db.js");

// constructor
const Category = function (category) {
  this.id = category.id;
  this.parent_id = category.parent_id;
  this.category = category.category;
};

Category.getAll = (result) => {
  sql.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Category;
