const sql = require("./db.js");
const jwt = require("jsonwebtoken")
const bcrypt = require ('bcrypt');
const { CLIENT_LONG_PASSWORD } = require("mysql/lib/protocol/constants/client");

const SecUser = function(secuser) {
  this.user_name  = secuser.user_name;
  this.first_name = secuser.first_name;
  this.last_name  = secuser.last_name;
  this.email      = secuser.email;
  this.password   = secuser.password;
};
SecUser.create = async (newSecUser, result) => {
  newSecUser.password = await bcrypt.hash(newSecUser.password, 10);
  sql.query("INSERT INTO secuser SET ?", newSecUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newSecUser });
    result(null, { id: res.insertId, ...newSecUser });
  });
};

SecUser.authenticate = async (user_name, password, result) => {
  let query = `SELECT * FROM secuser WHERE user_name = '${user_name}'`;

  sql.query(query, async (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    var encryptPassword = await bcrypt.compare(password, res[0]['password']);
    if (!encryptPassword) {
      result(null, new Error('User or password error.'));
      return;
    }

    const accessToken = generateAccessToken ({user: user_name});
    const refreshToken = generateRefreshToken ({user: user_name});
    result(null, JSON.parse(`{"accessToken" : "${accessToken}", "refreshToken" : "${refreshToken}"}`));
  });

};

SecUser.getTokens = (result) => {
  result(null, refreshTokens);
}

SecUser.validateToken = (token) => {
  var matches = refreshTokens.filter( (c) => c == token).length;
  if (!matches) return false;

  return true;
}

// accessTokens
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}
  // refreshTokens
let refreshTokens = []
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"});
  refreshTokens.push(refreshToken);
  return refreshToken
}

module.exports = SecUser;