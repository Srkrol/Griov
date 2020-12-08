const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.galleryget = (req, res) => {
  const id = req.body.id;

  const sql = `
        SELECT photo.photo, photo.id,  ROW_NUMBER() OVER(ORDER BY photo.id) num
        FROM boxinfo, photo
        WHERE boxinfo.user_id="${id}"
        AND type=1
        AND photo.box_id=boxinfo.box_id
        ORDER BY num DESC  LIMIT 8
    `;

  mysqlConnection.query(sql, function (err, results, fields) {
    if (err) {
      res.status(400).json("err");
    } else {
      let arr = [];

      results.forEach((val) => {
        const imgdata = Buffer.from(val.photo, "base64").toString();
        arr.push({
          photo: `data:image/jpeg;base64,${imgdata}`,
          num: val.num,
        });
      });
      console.log(results);
      res
        .status(200)
        .json({ arr, count: !!results[0] ? results[0].num - 8 : false });
    }
  });
};

module.exports.gallerygetcount = (req, res) => {
  const id = req.body.id;
  const count = req.body.count;

  const min = count * 8;

  const sql = `
        SELECT photo.photo, ROW_NUMBER() OVER(ORDER BY photo.id) num, photo.id
        FROM boxinfo, photo
        WHERE boxinfo.user_id="${id}"
        AND type=1
        AND photo.box_id=boxinfo.box_id
        ORDER BY num DESC LIMIT ${min}, ${8}
    `;

  mysqlConnection.query(sql, function (err, results, fields) {
    let arr = [];
    console.log(results);
    results.forEach((val) => {
      const imgdata = Buffer.from(val.photo, "base64").toString();
      arr.push({
        photo: `data:image/jpeg;base64,${imgdata}`,
        num: val.num,
      });
    });
    res.status(200).json(arr);
  });
};
