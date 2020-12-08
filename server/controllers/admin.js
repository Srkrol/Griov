const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.admindata = (req, res) => {
  const user_id = req.body.user;
  const role = "ADMIN";

  const sqluserisadmin = `SELECT * FROM users WHERE users.id="${user_id}" AND users.role="${role}" `;

  mysqlConnection.query(sqluserisadmin, function (err, isresults, fields) {
    if (err || isresults.length === 0) {
      res.status(400).json();
    } else {
      const getbox = `
        SELECT boxinfo.box_id, boxinfo.box_name, boxinfo.plant_name, users.username
        FROM boxinfo, users WHERE boxinfo.user_id=users.id`;
      mysqlConnection.query(getbox, function (err, box, fields) {
        if (err) {
          res.status(400).json();
        } else {
          console.log(box);
          res.status(200).json({ box });
        }
      });
    }
  });
};
