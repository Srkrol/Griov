const mysql = require("mysql");
const sheduler = require("../sheduler/update");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.getdevice = (req, res) => {
  const box = req.query.boxid;
  const reqString = `SELECT device, name FROM devices WHERE box_id='${box}' AND type="onoff"`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      res.status(200).json(results);
    }
  });
};

// установка в базу микроклимат и обновление шедулера

module.exports.settobe = async (req, res) => {
  const body = req.body;

  const date = req.body.date;
  const time = req.body.time;
  const type =
    req.body.type === "sun" ? "_" + req.body.type + "1" : "_" + req.body.type;
  const value = Number(req.body.value);
  const every = Number(req.body.every);
  const boxid = Number(req.body.boxid);
  const status = Number(req.body.status);

  const sqlsearch = `
    SELECT param, value FROM tobe 
    WHERE box_id=${boxid} 
    AND param="${type}"
    AND value=${value}`;

  mysqlConnection.query(sqlsearch, function (err, ressearch, fields) {
    if (err) {
      res.status(500).json("err");
    } else {
      if (ressearch.length === 0) {
        const addmic = `
          INSERT INTO tobe 
            (daily,	box_id,	dt,	time,	param, value,	status)
          values( ${every} , ${boxid} , '${date}' , '${time}', '${type}' , ${value}, ${status})`;
        mysqlConnection.query(addmic, function (err, resss, fields) {
          if (err) {
            res.status(500).json("err");
          } else {
            sheduler.AddSchedule(body);
            res.status(200).json(true);
          }
        });
      } else {
        let sqlupdate = `
          UPDATE tobe SET 
          daily=${every}, box_id=${boxid},
          dt='${date}', time='${time}',
          value=${value}, status=${status}
          WHERE box_id=${boxid} 
          AND param="${type}"
          AND value=${value}`;
        mysqlConnection.query(sqlupdate, function (err, resss, fields) {
          if (err) {
            res.status(500).json("err");
          } else {
            sheduler.AddSchedule(body);
            res.status(200).json(true);
          }
        });
      }
    }
  });
  /**\
   
id	daily	box_id	dt	time	param	value	status	label	
   */

  /*
  const addmic = `INSERT INTO tobe (daily, box_id,	dt,	param, value, label) values( ${daily} , ${box_id} ,'${dt}','${param}', ${value} , '${label}')`;
  mysqlConnection.query(addmic, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      let gettobe = `SELECT id, daily, box_id,	dt,	param, value,label FROM tobe WHERE box_id=${box_id} AND param='${param}'`;
      mysqlConnection.query(gettobe , function (err, results, fields) {
        if (err) {
          res.status(400).json({ mes: "1" });
        } else {
          const sheduler =  require('../sheduler/update')
          sheduler.AddSchedule(results, box)

          let reqString = `SELECT * FROM tobe WHERE box_id=${box_id}`;
          mysqlConnection.query(reqString, function (err, results, fields) {
            if (err) {
              res.status(400).json({ mes: "1" });
            } else {
              res.status(200).json(results);
            }
          });
        }
      });
    }
  });
  */
};

module.exports.addtobe = (req, res) => {
  const box = req.query;

  const id = box.id;

  const daily = 100; //Number(box.daily)
  const box_id = Number(box.box_id);
  const dt = box.dt;
  const param = box.param;
  const value = Number(box.value);
  const label = box.label;

  let reqString = `UPDATE tobe SET box_id=${box_id}, daily=${daily} , dt='${dt}',param='${param}',value=${value},label='${label}' WHERE id=${id}`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: "1" });
    } else {
      let gettobe = `SELECT id, daily, box_id,	dt,	param, value,label FROM tobe WHERE box_id=${box_id} AND param='${param}'`;
      mysqlConnection.query(gettobe, function (err, results, fields) {
        if (err) {
          res.status(400).json({ mes: "1" });
        } else {
          const sheduler = require("../sheduler/update");
          sheduler.AddSchedule(results, box);
          let reqString = `SELECT * FROM tobe WHERE box_id=${box_id}`;
          mysqlConnection.query(reqString, function (err, results, fields) {
            if (err) {
              res.status(400).json({ mes: "1" });
            } else {
              res.status(200).json(results);
            }
          });
        }
      });
    }
  });
};

module.exports.deletetobe = (req, res) => {
  const box = req.query;

  const id = box.id;

  const box_id = Number(box.box_id);

  const param = box.param;

  let reqString = `DELETE FROM tobe WHERE tobe.id=${id}`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: "1" });
    } else {
      let gettobe = `SELECT id, daily, box_id,	dt,	param, value,label FROM tobe WHERE box_id=${box_id} AND param='${param}'`;
      mysqlConnection.query(gettobe, function (err, results, fields) {
        if (err) {
          res.status(400).json({ mes: "1" });
        } else {
          const sheduler = require("../sheduler/update");
          sheduler.AddSchedule(results, box);
          let reqString = `SELECT * FROM tobe WHERE box_id=${box_id}`;
          mysqlConnection.query(reqString, function (err, results, fields) {
            if (err) {
              res.status(400).json({ mes: "1" });
            } else {
              res.status(200).json(results);
            }
          });
        }
      });
    }
  });
};
