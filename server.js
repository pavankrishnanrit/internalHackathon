const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

const db = require("./db");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const {
    regno,
    sname,
    email,
    mobile,
    gender,
    dob,
  } = req.body;
  db.query(
    "INSERT INTO students(regno,sname,email,mobile,gender,dob) VALUES(?, ?, ?, ?, ?, ?)",
    [
      regno,
      sname,
      email,
      mobile,
      gender,
      dob,
      
    ],
    (error, result) => {
      if (!error) {
        res.redirect("details/" + result.insertId);
      } else {
        console.log(error);
      }
    }
  );
});

app.get("/details/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM students where id=?", [id], (error, result) => {
    if (!error) {
      res.render("details", { result: result[0] });
    } else {
      console.log(error);
    }
  });
});

app.listen(8000, (req, res) => {
  console.log(`Server is running on 8080`);
});
