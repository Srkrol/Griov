const express = require('express')
const  router = express.Router()
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const authConfig = require("../src/auth_config.json")
const mysql = require("mysql")

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
})

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("База подключена");
  } else {
    console.log("Ошибка подключение базы: " + err.message);
  }
})


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});


router.get("/boxinfo", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM boxinfo WHERE box_id=${varBoxId}`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/rf", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM photo WHERE box_id=${varBoxId} AND type=1 ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");

    const imgdata = Buffer.from(results[0].photo, "base64");
    res.send(imgdata);
  });
});

router.get("/cf", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM photo WHERE box_id=${varBoxId} AND type=2 ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");

    const imgdata = Buffer.from(results[0].photo, "base64");
    res.send(imgdata);
  });
});

router.get("/curtemp", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT DATE_FORMAT(dt, "%H:%m") as dttime, DATE_FORMAT(dt, "%M %d") as dtday, value FROM asis WHERE box_id=${varBoxId} AND param="atemp" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/curhumid", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT DATE_FORMAT(dt, "%H:%m") as dttime, DATE_FORMAT(dt, "%M %d") as dtday, value FROM asis WHERE box_id=${varBoxId} AND param="ahumid" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/statesun", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM actions WHERE box_id=${varBoxId} AND param="sun1" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/statecooler", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM actions WHERE box_id=${varBoxId} AND param="cooler" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/statelight", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM actions WHERE box_id=${varBoxId} AND param="light" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
});

router.get("/history", (req, res, next) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT * FROM actions WHERE box_id=${varBoxId} ORDER BY id DESC LIMIT 10`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) throw err;
    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(results));
  });
})

module.exports = router