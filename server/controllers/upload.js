const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.uploadavatar = (req, res) => {
  const image = req.body.image;

  const id = req.body.id;
  console.log(image, id)
  let reqString = `UPDATE users SET avatar='${image}' WHERE id='${id}'`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ url: `'/'` });
    } else {
      res.status(200).json({ url: true });
    }
  });
};

module.exports.uploadname = (req, res) => {
  const id = req.body.id;
  const username = req.body.username;

  let reqString = `UPDATE users SET username='${username}' WHERE id='${id}'`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ url: `'/'` });
    } else {
      res.status(200).json({ url: true });
    }
  });
};
