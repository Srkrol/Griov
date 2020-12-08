const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.searchuser = (req, res) => {
  const text = req.body.text.toLowerCase();

  const sql = `SELECT id, username, avatar FROM users`;
  mysqlConnection.query(sql, function (err, results, fields) {
    let result = [];
    results.forEach((value) => {
      const name = value.username.toLowerCase();
      console.log(name.indexOf(text));

      if (name.indexOf(text) !== -1) {
        result.push(value);
      }
    });
    res.status(200).json(result);
  });
};
