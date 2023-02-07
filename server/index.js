const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "sagar",
  password: "hello",
  database: "gym-management",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("refresh page on port 3001!");
});

app.get("/", (req, res) => {
  res.send("this is backed server page!!");
});

app.get("/api/getAllMembers", (req, res) => {
  const sqlSelect1 = "SELECT * FROM members";
  db.query(sqlSelect1, (err, result) => {
    res.send(result);
  });
});

app.put("/api/updateMemberID", (req, res) => {
  const mid = req.body.MemberID;
  const name = req.body.Name;
  const address = req.body.Address;
  const phone = req.body.Phone;
  const email = req.body.Email;
  const sqlUpdate =
    "UPDATE members SET Name=?, Address=?, Phone=?, Email=? WHERE MemberID=?";
  console.log(mid);
  db.query(sqlUpdate, [name, address, phone, email, mid], (err, result) => {
    console.log(err, result);
  });
});

app.get("/api/getEnrollments", (req, res) => {
  const sqlSelect2 =
    "Select M.MemberID, Name, ClassName, Active From classes C, members M, enrollments E WHERE c.ClassID=e.ClassID AND e.MemberID=m.MemberID ORDER BY M.MemberID;";
  db.query(sqlSelect2, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getAllTrainers", (req, res) => {
  const sqlSelect2 = "SELECT * FROM trainers";
  db.query(sqlSelect2, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getPayments", (req, res) => {
  const sqlSelect2 =
    "SELECT Name, PaymentDate, Amount FROM members, payments WHERE members.MemberID=payments.MemberID;";
  db.query(sqlSelect2, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/deleteMemberID/:memid", (req, res) => {
  const memID = req.params.memid;
  const sqlDlt = "DELETE FROM members WHERE MemberID=?";
  db.query(sqlDlt, memID, (err, result) => {
    console.log(err);
  });
});

app.post("/api/addMember", (req, res) => {
  const mid = req.body.MemberID;
  const name = req.body.Name;
  const address = req.body.Address;
  const phone = req.body.Phone;
  const email = req.body.Email;
  const sqlInsert =
    "INSERT INTO members(MemberID, Name, Address, Phone, email) VALUES (?, ?, ?, ?, ?);";
  db.query(sqlInsert, [mid, name, address, phone, email], (err, result) => {
    console.log("data insert!", err);
  });
});

app.get("/api/getLatestMemberID", (req, res) => {
  const sqlSelect2 = "SELECT Max(MemberID) AS MemberID from members;";
  db.query(sqlSelect2, (err, result) => {
    res.send(result);
  });
});
