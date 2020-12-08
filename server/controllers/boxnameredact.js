const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.boxnameredact = (req, res) => {
  const name = req.body.name;
  const box = req.body.box;

  let sql = `UPDATE boxinfo SET box_name='${name}' WHERE box_id='${box}'`;
  mysqlConnection.query(sql, function (err, results, fields) {
    if (err) {
      res.status(400).json();
    } else {
      res.status(200).json();
    }
  });
};
