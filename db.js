const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "pavan1982",
  database: "register",
});

db.connect((err) => {
	if (!err) {
		console.log("Connected");
	} else {
		console.log("NOt connected");
		// console.log(err);
	}
});

module.exports = db;
