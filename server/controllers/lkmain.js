const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.rf = (req, res) => {
  const ladder = !!req.query.ladder ? Number(req.query.ladder) : 0;
  let varBoxId = req.query.boxid;
  let type = 1;
  if (ladder === 100) {
    type = 3;
  }

  let reqString = `SELECT * FROM photo WHERE box_id=${varBoxId} AND type=${type} ORDER BY id DESC LIMIT 1`;
  /// SELECT * FROM photo WHERE box_id=${box} AND type=3 ORDER BY id DESC LIMIT 1
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      if (!!results[0] === true && results[0].length !== 0) {
        const imgdata = Buffer.from(results[0].photo, "base64");
        res.send(imgdata);
      } else {
        res.send("");
      }
    }
  });
};

module.exports.curtemp = (req, res) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT DATE_FORMAT(dt, "%H:%m") as dttime, DATE_FORMAT(dt, "%M %d") as dtday, value FROM asis WHERE box_id=${varBoxId} AND param="atemp" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.curhumid = (req, res) => {
  let varBoxId = req.query.boxid;
  let reqString = `SELECT DATE_FORMAT(dt, "%H:%m") as dttime, DATE_FORMAT(dt, "%M %d") as dtday, value FROM asis WHERE box_id=${varBoxId} AND param="ahumid" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.history = (req, res) => {
  let varBoxId = req.query.boxid;

  let reqString = `SELECT * FROM actions WHERE box_id=${varBoxId} ORDER BY id DESC LIMIT 10`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.gettobe = (req, res) => {
  const box_id = req.query.box_id;
  let reqString = `SELECT * FROM tobe WHERE box_id=${box_id}`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
};
