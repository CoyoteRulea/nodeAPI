const sql = require("./db.js");
// constructor
const Inventory = function(inventory) {
  this.model    = inventory.model;
  this.brand    = inventory.brand;
  this.type     = inventory.type;
  this.wheels   = inventory.wheels;
  this.power    = inventory.power;
};
Inventory.create = (newInventory, result) => {
  sql.query("INSERT INTO inventory SET ?", newInventory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created inventory: ", { id: res.insertId, ...newInventory });
    result(null, { id: res.insertId, ...newInventory });
  });
};
Inventory.showAll = result => {
  let query = "SELECT * FROM inventory";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
module.exports = Inventory;
