const sql = require('./app/models/db.js');
const bcrypt = require ('bcrypt');

//this will allow us to pull params from .env file
require("dotenv").config();

var sqlString =
    "CREATE TABLE secuser ( \
        id BIGINT UNSIGNED auto_increment NOT NULL, \
        first_name varchar(100) NULL, \
        last_name varchar(100) NULL, \
	      user_name varchar(100) NOT NULL, \
	      email varchar(100) NULL, \
	      password varchar(100) NOT NULL, \
        PRIMARY KEY (`id`) \
        ) \
        ENGINE=InnoDB \
        DEFAULT CHARSET=utf8mb4 \
        COLLATE=utf8mb4_0900_ai_ci;";

sql.query(sqlString, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table secuser");
});


var hashPassword = async function(){
    var hashPwd = await bcrypt.hash(process.env.ADMIN_PASS,10);

    sqlString = "INSERT INTO secuser (user_name, password) VALUES ('" +  process.env.ADMIN_USER + "', '" + hashPwd + "')";
    sql.query(sqlString, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
        console.log("created user admin " + hashPwd);
    });
}
hashPassword(sql);

// Create inventory 
sqlString = "CREATE TABLE `inventory` ( \
    `id` bigint unsigned NOT NULL AUTO_INCREMENT, \
    `model` varchar(100) DEFAULT NULL, \
    `brand` varchar(100) DEFAULT NULL, \
    `type` varchar(1) DEFAULT NULL, \
    `wheels` int DEFAULT NULL, \
    `power` varchar(100) DEFAULT NULL, \
    PRIMARY KEY (`id`) \
  ) \
  ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='List of vehicles';";
  sql.query(sqlString, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table inventory");
});

