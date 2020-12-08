const mysql = require("mysql");
const sheduler = require("../sheduler/ratingphoto");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

// все коробки
module.exports.imagecomparison = (req, res) => {
  const userid = req.body.user;
  const role = "ADMIN";

  const sqluserisadmin = `SELECT * FROM users WHERE users.id="${userid}" AND users.role="${role}" `;

  mysqlConnection.query(sqluserisadmin, function (err, isresults, fields) {
    if (err || isresults.length === 0) {
      res.status(400).json();
    } else {
      const sqlbox = `
        SELECT users.username, boxinfo.box_id, boxinfo.box_name, boxinfo.plant_name, boxinfo.last_rang
        FROM users, boxinfo WHERE users.id=boxinfo.user_id`;
      mysqlConnection.query(sqlbox, function (err, isresultsbox, fields) {
        if (err) {
          res.status(400).json();
        } else {
          res.status(200).json(isresultsbox);
        }
      });
    }
  });
};

module.exports.imagecomparisonid = (req, res) => {
  const userid = req.body.user;
  const box = req.body.box;
  const role = "ADMIN";

  const sqluserisadmin = `SELECT * FROM users WHERE users.id="${userid}" AND users.role="${role}" `;

  mysqlConnection.query(sqluserisadmin, function (err, isresults, fields) {
    if (err || isresults.length === 0) {
      res.status(400).json();
    } else {
      const sqlboximg = `SELECT * FROM photo WHERE type=0 AND photo.box_id=${box} ORDER BY photo.id DESC LIMIT 10 `;

      mysqlConnection.query(sqlboximg, function (err, imgtypenull, fields) {
        if (err || isresults.length === 0) {
          res.status(400).json();
        } else {
          const rang = !!imgtypenull[0] ? imgtypenull[0].rang : 0;

          const maxrang = rang + 2;
          const minrang = rang - 2 < 0 ? 0 : rang - 2;

          const sqlboximg1 = `SELECT * FROM photo WHERE rang BETWEEN ${minrang} AND ${maxrang} AND type=1 ORDER BY photo.id DESC LIMIT 10 `;
          mysqlConnection.query(sqlboximg1, function (err, imgtypeone, fields) {
            if (err || isresults.length === 0) {
              res.status(400).json();
            } else {
              let imgnull = [];

              imgtypenull.forEach((img) => {
                const imgdata = Buffer.from(img.photo, "base64").toString();
                imgnull.push({
                  id: img.id,
                  box_id: img.box_id,
                  cam_id: img.cam_id,
                  date: img.date,
                  time: img.time,
                  type: img.type,
                  photo: `data:image/jpeg;base64,${imgdata}`,
                  photo_id: img.photo_id,
                  rang: img.rang,
                });
              });

              let imgone = [];

              imgtypeone.forEach((img) => {
                const imgdata = Buffer.from(img.photo, "base64").toString();
                imgone.push({
                  id: img.id,
                  box_id: img.box_id,
                  cam_id: img.cam_id,
                  date: img.date,
                  time: img.time,
                  type: img.type,
                  photo: `data:image/jpeg;base64,${imgdata}`,
                  photo_id: img.photo_id,
                  rang: img.rang,
                });
              });

              res.status(200).json({ imgnull, imgone });
            }
          });
        }
      });
    }
  });
};

module.exports.imagecomparisonsave = (req, res) => {
  const rang = Number(req.body.rating);
  const box = Number(req.body.box);

  console.log(req.body);

  UpdateImage(box, rang, 0, res);
  UpdateImage(box, rang, 1, res);
};

const UpdateImage = (box, rang, type, res) => {
  const sql = `SELECT * FROM photo WHERE type=${type} AND box_id=${box} ORDER BY id DESC LIMIT 1`;
  mysqlConnection.query(sql, function (err, imgtypeone, fields) {
    const id = imgtypeone[0].id;
    console.log(rang, box);
    let sql = `UPDATE photo SET rang=${Number(
      rang
    )} WHERE box_id=${box} AND id=${id} `;

    mysqlConnection.query(sql, function (err, img, fields) {
      if (err) {
        res.status(400).json();
      } else {
        sheduler.ratingphoto(box);
        res.status(200).json();
      }
    });
  });
};
