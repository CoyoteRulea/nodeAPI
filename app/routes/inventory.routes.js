module.exports = app => {

  const inventory = require("../controllers/inventory.controller.js");
  var router = require("express").Router();
  // Create a new inventory item
  router.post("/", inventory.create);
  // Retrieve all inventory
  router.get("/", inventory.showAll);
  app.use('/api/inventory', router);
  console.log('Routes exported');
};
