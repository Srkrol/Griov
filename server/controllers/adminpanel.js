const mysql = require("mysql");
const sheruler = require("../sheduler/measure");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.adminpanel = (req, res) => {
  const box_id = req.body.boxid;

  const sql = `SELECT choiseHw.label, boxdevices.hw_type, boxdevices.name, boxdevices.label, boxdevices.variant, choiseHw.desc_long
         FROM choiseHw, boxdevices
         WHERE boxdevices.box_id="${box_id}"
         AND choiseHw.hw_type=boxdevices.hw_type
         AND choiseHw.name=boxdevices.name
        `;

  mysqlConnection.query(sql, function (err, data, fields) {
    if (err) {
      res.status(500).json("err");
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports.manualswift = (req, res) => {
  const box_id = Number(req.body.boxid);
  const type = req.body.type === "sun" ? req.body.type + 1 : req.body.type;
  const sql = `
    SELECT * FROM actions 
    WHERE box_id=${box_id} 
    AND param="${type}" ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(sql, function (err, results, fields) {
    if (err) {
      res.status(500).json("err");
    } else {
      if (!!results[0]) {
        const data = results[0].value === 100 ? true : false;
        res.status(200).json(data);
      } else {
        res.status(200).json((data = false));
      }
    }
  });
};

module.exports.cf = (req, res) => {
  let varBoxId = req.body.boxid;
  let reqString = `SELECT * FROM photo WHERE box_id=${varBoxId} AND type=2 ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      if (!!results[0]) {
        const imgdata = Buffer.from(
          !!results[0] ? results[0].photo : "",
          "base64"
        );
        res.send(imgdata);
      } else {
        const imgdata = "";
        res.send(imgdata);
      }
    }
  });
};

module.exports.measuresheduler = (req, res) => {
  const boxid = Number(req.body.boxid);
  const int = req.body.int;
  sheruler.AddSchedule(boxid, int);
};
