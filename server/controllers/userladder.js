const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.getladderuser = (req, res) => {
  const box = req.body.box;
  const ladder = `SELECT * FROM boxinfo WHERE box_id=${box} LIMIT 1`;
  mysqlConnection.query(ladder, function (err, results, fields) {
    const userbox = results[0];
    const userid = results[0].user_id;
    const user = `SELECT * FROM users WHERE id='${userid}'`;
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      mysqlConnection.query(user, function (err, resultsuser, fields) {
        if (err) {
          res.status(404).json({ mes: "1" });
        } else {
          let reqString = `SELECT * FROM photo WHERE box_id=${box} AND type=2 ORDER BY id DESC LIMIT 1`;
          mysqlConnection.query(reqString, function (err, resultsi, fields) {
            if (err) {
              res.status(404).json({ mes: "1" });
            } else {
              const imgdata = Buffer.from(
                !!resultsi[0] ? resultsi[0].photo : "",
                "base64"
              );
              const data = {
                box_id: box,
                photo: imgdata,
                box_name: userbox.box_name,
                plant_name: userbox.plant_name,
                username: resultsuser[0].username,
                avatar: resultsuser[0].avatar,
                id: resultsuser[0].id,
              };
              res.status(200).json({ data });
            }
          });
        }
      });
    }
  });
};

module.exports.gettopladder = (req, res) => {
  const id = Number(req.body.id);
  let reqString = `
    SELECT users.username, boxinfo.box_id, boxinfo.box_name, boxinfo.plant_name, boxinfo.last_rang
    FROM Competitors, users, boxinfo 
    WHERE Competitors.comp_id=${id}
    AND users.id=Competitors.user_id
    AND Competitors.user_id=boxinfo.user_id
    AND users.id=boxinfo.user_id
    AND Competitors.box_id=boxinfo.box_id
    ORDER BY boxinfo.last_rang DESC
    `;
  mysqlConnection.query(reqString, function (err, resultscomp, fields) {
    res.status(200).json({ data: resultscomp });
  });
};

///username, box_id, box_name, plant_name, last_rang
