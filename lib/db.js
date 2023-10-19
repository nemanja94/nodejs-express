var mysql = require("mysql");

//local mysql db connection
var pool = mysql.createPool({
  host: "192.168.124.24",
  user: "root",
  password: "root",
  database: "skylead_test",
  port: 3306,
  multipleStatements: true,
});

module.exports = pool;
