// Aim
// 1. Delete Message
// 2. Edit Message
// 3. Search username
// 4. User Count
// 5. Strictness on login signup
// 6. Improve login singup page
// 7. Access Denied page
// 8. Back Option
// 9. no data loss on refresh
// 10. logout

// Setting Express
const express = require("express");
const app = express();

// Requiring Path
const path = require("path");

// Require MySQL
const mysql = require('mysql2');

// Require uuid
const { v4: uuidv4 } = require('uuid');

// Port Number
const port = 6777;

// SQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chat',
  password: '1122'
});

// Setting EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Setting Static Pages
app.use(express.static(path.join(__dirname, "public")));

// Setting other types of Requests
app.use(express.urlencoded({extended : true}));

// Log In
app.post("/login", (req, res) => {
  let {user, pass} = req.body;
  let q1 = "SELECT * FROM users WHERE id = ? AND pass = ?;";
  connection.query(q1, [user, pass], (err, result) => {
    if (result.length > 0) {
      let q2 = "SELECT id FROM users;";
      connection.query(q2, (err, result) => {
        let frd = [];
        for(let i=0; i<result.length; i++) {
          frd.push(result[i].id);
        }
        res.render("friendlist.ejs", {user, frd});
      });
    } else {
      res.send("failed");
    }
  });
});

// Sign Up
app.post("/signup", (req, res) => {
  let {user, email, pass} = req.body;
  let q1 = "SELECT * FROM users WHERE id = ?";
  connection.query(q1, [user], (err, result) => {
    if (result.length > 0) {
      res.send("taken")
    } else {
      let q2 = "INSERT INTO users (uuid, id, email, pass) VALUES (?);";
      connection.query(q2, [[uuidv4().replace(/-/g, "_"), user, email, pass]], (err, res) => {});
      res.send("success");
    }
  });
});

// Send Room UUID
app.post("/msg", (req, res) => {
  let {user1, user2} = req.body;
  let usr = [user1, user2];
  usr.sort();
  let q1 = "SELECT * FROM msguuid WHERE id1 = ? AND id2 = ?";
  connection.query(q1, usr, (err, result) => {
    if (result.length > 0) {
      res.send(result[0].uuid);
    } else {
      let q2 = "INSERT INTO msguuid (uuid, id1, id2, session_id) VALUES (?);";
      connection.query(q2, [[uuidv4().replace(/-/g, "_"), usr[0], usr[1], uuidv4().replace(/-/g, "_")]], (err, result2) => {});
      connection.query(q1, usr, (err, result3) => {
        res.send(result3[0].uuid);
      });
    }
  });
});

// Get Session ID
app.put("/msg", (req, res) => {
  let {id} = req.body;
  let q3 = `SELECT session_id FROM msguuid WHERE uuid = '${id}'`;
  connection.query(q3, (err, result2) => {
    let session = result2[0].session_id;
    res.send(session);
  });
});

// Room Access Request
app.post("/msg/:id", (req, res) => {
  let { id } = req.params;
  let {user1, user2} = req.body;
  // Creating Message Room Table
  let q2 = `CREATE TABLE IF NOT EXISTS ${id} (
    uuid CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    id1 VARCHAR(100) NOT NULL,
    id2 VARCHAR(100) NOT NULL,
    msg BLOB(65535),
    created DATETIME
    );`;
    // id1 : send, id2 : receive
  connection.query(q2, (err, res) => {});
  let q1 = `SELECT * FROM ${id} ORDER BY created ASC;`;
  let q3 = `SELECT session_id FROM msguuid WHERE uuid = '${id}'`;
  connection.query(q1, (err1, result) => {
    connection.query(q3, (err, result2) => {
      let session = result2[0].session_id;
      res.render("msg.ejs", {result, user1, user2, session});
    });
  });
});

// Update Room
app.patch("/msg/:id", (req, res) => {
  let { id } = req.params;
  let {user1, user2} = req.body;
  // Creating Message Room Table
  let q2 = `CREATE TABLE IF NOT EXISTS ${id} (
    uuid CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    id1 VARCHAR(100) NOT NULL,
    id2 VARCHAR(100) NOT NULL,
    msg BLOB(65535),
    created DATETIME
    );`;
    // id1 : send, id2 : receive
  connection.query(q2, (err, res) => {});
  let q1 = `SELECT * FROM ${id} ORDER BY created ASC;`;
  let q3 = `SELECT session_id FROM msguuid WHERE uuid = '${id}'`;
  connection.query(q1, (err1, result) => {
    connection.query(q3, (err, result2) => {
      if(err) console.log(err);
      let session = result2[0].session_id;
      res.render("body-msg.ejs", {result, user1, user2, session});
    });
  });
});

// Sending Message
app.put("/msg/:id", (req, res) => {
  let { id } = req.params;
  let {user1, user2, msg} = req.body;
  // id1 : send, id2 : receive
  const now = new Date();
  const time = now.toISOString().slice(0, 19).replace("T", " ");
  let q1 = `INSERT INTO ${id} (uuid, id1, id2, msg, created) VALUES (?);`;
  connection.query(q1, [[uuidv4().replace(/-/g, "_"), user1, user2, msg, time]], (err, result2) => {});
  let q2 = `UPDATE msguuid SET session_id = '${uuidv4().replace(/-/g, "_")}' WHERE uuid = '${id}'`;
  connection.query(q2, (err, result3) => {});
  res.send("success");
});

// Listening on Port for Request
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Creating Users table
  let q1 = `CREATE TABLE IF NOT EXISTS users (
    uuid CHAR(36) PRIMARY KEY NOT NULL,
    id VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
    );`;
  connection.query(q1, (err, res) => {});

  // Creating Message Room UUID Table
  let q2 = `CREATE TABLE IF NOT EXISTS msguuid (
    uuid CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    id1 VARCHAR(100) NOT NULL,
    id2 VARCHAR(100) NOT NULL,
    session_id CHAR(36) NOT NULL UNIQUE
    );`;
  connection.query(q2, (err, res) => {});
});