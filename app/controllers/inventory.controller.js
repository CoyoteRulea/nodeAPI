const { eventNames } = require("../models/db.js");
const Inventory = require("../models/inventory.model.js");
const SecUser = require("../models/secUser.model.js");
// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var proxyHost = req.headers["x-forwarded-host"];
  var host = proxyHost ? proxyHost : req.headers.host;
  // Check if token is valid
  if (host.split(':')[1] == process.env.TOKEN_SERVER_PORT && !SecUser.validateToken(req.body.token)) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }
  console.log('www');
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
    var proxyHost = req.headers["x-forwarded-host"];
    var host = proxyHost ? proxyHost : req.headers.host;
    // Check if token is valid
    if (host.split(':')[1] == process.env.TOKEN_SERVER_PORT && !SecUser.validateToken(req.body.token)) {
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }
    
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
