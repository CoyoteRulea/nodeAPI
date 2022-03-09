const inventory = require("../controllers/inventory.controller.js");
const secUser = require("../controllers/secUser.controller.js");

module.exports = app => {
  var router = require("express").Router();
  // Create a new User
  router.post("/create", secUser.create);
  router.get("/authenticate", secUser.authenticate);
  router.get("/inventory", inventory.showAll);
  router.post("/inventory", inventory.create);

  // Only for TEST purposes, remove at PROD env
  router.get("/admintoken", secUser.getTokens);
  router.get("/validatetoken", secUser.validateToken);

  app.use('/api/users', router);
};
  