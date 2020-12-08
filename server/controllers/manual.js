const mysql = require("mysql");
const request = require("request");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

const url =
  "http://192.168.253.18:3012/api/app/run_event/v1?api_key=8d83df2994a7640fe80cf9f4159edcc5&title=";

module.exports.switch = (req, res) => {
  const box = req.body.box;
  const status = req.body.status;

  let fetchstring = `${url}${box}${status}`;
  const options = {
    method: "POST",
    url: fetchstring,
  };


  request(options, function (error, response) {
    let reqString = `SELECT * FROM photo WHERE box_id=${box} AND type=2 ORDER BY id DESC LIMIT 1`;

    setTimeout(() => {
      mysqlConnection.query(reqString, function (err, results, fields) {
        if (err) {
          res.status(404).json({ mes: "1" });
        } else {
          const imgdata = Buffer.from(results[0].photo, "base64");
          res.send(imgdata);
        }
      });
    }, 15000)
  });
};
