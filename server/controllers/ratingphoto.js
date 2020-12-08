const mysql = require("mysql");
const sheduler = require("../sheduler/rating");
const request = require("request");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.ratingphotosheduler = (req, res) => {

  const box = req.body.boxid;
  sheduler.setevent(box);

  let reqString = `SELECT * FROM photo WHERE box_id=${box} AND type=1 ORDER BY id DESC LIMIT 1`;

  setTimeout(() => {
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
  }, 14000);
};

module.exports.ratingphotoshedulerupdate = (req, res) => {

  const date = req.body.id;
  const time = req.body.id;
  const type = "_photo_light";
  const every = 100;
  const boxid = Number(req.body.box);

  const value = Number(0);
  const status = Number(req.body.sw === "true" ? 100 : 0);

  sheduler.seteventinterval(req);

  const sqlsearch = `
    SELECT param, value FROM tobe 
    WHERE box_id=${boxid} 
    AND param="${type}"
    AND value=${value}`;

  mysqlConnection.query(sqlsearch, function (err, ressearch, fields) {
    if (err) {
      res.status(500).json("err");
    } else {
      if (ressearch.length === 0) {
        const addmic = `
          INSERT INTO tobe 
            (daily,	box_id,	dt,	time,	param, value,	status)
          values( ${every} , ${boxid} ,'${date}','${time}', '${type}' , ${value}, ${status})`;
        mysqlConnection.query(addmic, function (err, resss, fields) {
          if (err) {
            res.status(500).json("err");
          } else {
            res.status(200).json(true);
          }
        });
      } else {
        let sqlupdate = `
          UPDATE tobe SET 
          daily=${every}, box_id=${boxid},
          dt='${date}', time='${time}',
          value=${value}, status=${status}
          WHERE box_id=${boxid} 
          AND param="${type}"
          AND value=${value}`;
        mysqlConnection.query(sqlupdate, function (err, resss, fields) {
          if (err) {
            res.status(500).json("err");
          } else {
            res.status(200).json(true);
          }
        });
      }
    }
  });
};
