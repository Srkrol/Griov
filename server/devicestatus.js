const mysql = require("mysql");

const device = require("./device/sort");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.devicestatus = (req, res) => {
  let reqString = `
        SELECT users.username, users.id, boxdevices.name, boxdevices.date, boxdevices.box_id, boxdevices.hw_type, choiseHw.permounth ,choiseHw.perhour, users.coins
        FROM users, boxdevices, boxinfo, choiseHw
        WHERE users.id=boxinfo.user_id
        AND boxinfo.box_id=boxdevices.box_id
        AND boxdevices.hw_type=choiseHw.hw_type
        AND boxdevices.name=choiseHw.name
        `;
  mysqlConnection.query(reqString, function (err, results, fields) {
    const sqlaction = `SELECT id, box_id, dt, param, value FROM actions `;
    mysqlConnection.query(sqlaction, function (err, action, fields) {
      const data = device.result(results);
      const sort = device.unique(data);

      let usermoney = [];
      let datedevice = [];

      sort.forEach((id) => {
        let num = 0;
        let name = "";
        let coins = 0;
        data.forEach((val) => {
          if (id === val.id) {
            const res = device.coinsnum(val, action);

            num = val.coins;
            name = val.username;
            coins =
              coins + Number(val.date) * val.perhour < 0
                ? 0
                : coins + (res * val.perhour - Number(val.date) * val.perhour);

            console.log(
              res * val.perhour,
              Number(val.date) * val.perhour,
              num,
              res * val.perhour - Number(val.date) * val.perhour
            );
            datedevice.push({
              type: val.hw_type,
              box: val.box_id,
              name: val.name,
              date: res,
            });
          }
        });
        console.log(num, coins);
        usermoney.push({
          id,
          name,
          num: num + coins,
        });
      });

      const sql = [];
      usermoney.forEach((val) => {
        sql.push(`('${val.id}', ${val.num})`);
      });

      const sqlstr = sql.join(",");

      const str = `
          INSERT INTO users (id, coins)
          VALUES ${sqlstr}
          ON DUPLICATE KEY UPDATE
          id=VALUES(id), coins=VALUES(coins)
      `;

      mysqlConnection.query(str, function (err, results, fields) {
        datedevice.forEach((val) => {
          Update(val);
        });
        res.status(200).json("ok");
      });
    });
  });
};

const Update = (data) => {
  const sql = `
  UPDATE boxdevices SET 
          box_id=${data.box}, hw_type="${data.type}",
          date="${data.date}"
          WHERE box_id=${data.box} 
          AND hw_type="${data.type}" `;
  mysqlConnection.query(sql, function (err, results, fields) {});
};

/**

-356 -356 5000 0
-0 0 5000 -0
-696 -694 95637 -2
-435 -435 95637 0
-1986 -1985 95637 -1
-10 -10 90426 0
-10 -10 90426 0
-0 0 90426 -0
-0 0 90426 -0
-257 -256 90426 -1
-584 -584 65000 0
-15 -15 65000 0
-2210 -2210 65000 0
-0 0 30001 -0
-26 -26 30001 0
-0 0 30001 -0
0 0 30001 0
0 0 30001 0
0 0 30001 0
0 0 30001 0
-0 0 30001 -0
-163 -163 30001 0

 */
