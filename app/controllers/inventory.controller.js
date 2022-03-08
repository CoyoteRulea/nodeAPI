const Inventory = require("../models/inventory.model.js");
// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a inventory
  const inventory = new Inventory({
    model   : req.body.model,
    brand   : req.body.brand,
    type    : req.body.type,
    wheels  : req.body.wheels,
    power   : req.body.power
  });
  // Save Inventory in the database
  Inventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the inventory."
      });
    else res.send(data);
  });
};

// Retrieve all Inventory items from the database
exports.showAll = (req, res) => {
    Inventory.showAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving inventory."
        });
      else {
          res.send(data);
      }
    });  
};
