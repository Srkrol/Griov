const mysql = require("mysql");
const base64 = require("base-64");
const utf8 = require("utf8");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.getuserinfo = (req, res) => {
  const id = req.body.id;

  const users = `SELECT username, avatar FROM users WHERE id='${id}'`;
  mysqlConnection.query(users, function (err, resusers, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      if (resusers.length === 0) {
        res.status(200).json({ user: false });
      } else {
        const boxs = `SELECT box_id, box_name, plant_name, last_rang FROM boxinfo WHERE user_id='${id}'`;
        mysqlConnection.query(boxs, function (err, resbox, fields) {
          if (err) {
            res.status(404).json({ mes: "1" });
          } else {
            const data = {
              user: resusers[0],
              boxs: resbox,
            };

            res.status(200).json(data);
          }
        });
      }
    }
  });
};
