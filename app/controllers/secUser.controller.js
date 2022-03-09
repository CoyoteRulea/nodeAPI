const SecUser = require("../models/secUser.model.js");
// Create a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Check if token is valid
  if (!SecUser.validateToken(req.body.token)) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  // Create SecUserClass
  const secuser = new SecUser({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email,
    user_name   : req.body.user_name,
    password    : req.body.password,
    token       : req.body.token
   });
  // Save user in the database
  SecUser.create(secuser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the inventory."
      });
    else res.send(data);
  });
};

exports.authenticate = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save user in the database
  SecUser.authenticate(req.body.user_name, req.body.password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while user request."
      });
    else res.send(data);
  });
};

// Only for test purposes, delete or comment at PROD.
exports.getTokens = (req, res) => {
  SecUser.getTokens((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while user request."
      });
    else res.send(data);
  });
};

// Only for test purposes, delete or comment at PROD.
exports.validateToken = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Check if token is valid
  if (!SecUser.validateToken(req.body.token)) {
    res.status(401).send({
      message: "Unauthorized"
    });
    return;
  }

  res.status(200).send({
    message: "OK!"
  });
}
