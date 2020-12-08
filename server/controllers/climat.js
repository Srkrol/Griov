const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.allphoto = (req, res) => {
  const reqString = `SELECT * FROM plants`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      const type = `SELECT * FROM boxtype`;
      mysqlConnection.query(type, function (err, results2, fields) {
        if (err) {
          res.status(404).json({ mes: "1" });
        } else {
          const data = {
            plants: results,
            type: results2,
          };

          res.status(200).json(data);
        }
      });
    }
  });
};
///////////
module.exports.addUserBox = (req, res) => {
  const plants = req.query.plants;
  const boxtype = req.query.boxtype;
  const userId = req.query.userId;
  const date = req.query.date;
  const inv_code = req.query.inv_code;

  console.log(inv_code)

  const reqString = `SELECT * FROM boxrequest WHERE plant='${plants}' AND user_id='${userId}' AND ready=0`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (results.length === 0) {
      const adduser = `INSERT INTO boxrequest (user_id,	box_type,	plant, startdate, inv_code	) values( '${userId}' , '${boxtype}','${plants}','${date}', '${inv_code}')`;
      mysqlConnection.query(adduser, function (err, results, fields) {
        if (err) {
          res.status(400).json({ mes: 1 });
        } else {
          const getboxreq = `SELECT * FROM boxrequest WHERE user_id='${userId}' AND ready=0`;
          mysqlConnection.query(getboxreq, function (err, results, fields) {
            if (err) {
              res.status(400).json({ mes: 1 });
            } else {
              console.log(2, results);
              res.status(200).json(results);
            }
          });
        }
      });
    } else {
      res.status(200).json({ mes: false });
    }
  });
};

/**

 */

module.exports.boxrequest = (req, res) => {
  const id = req.query.boxid;
  const reqString = `SELECT * FROM boxrequest WHERE user_id='${id}' AND ready=0`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: 1 });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.choisehw = (req, res) => {
  const id = req.query.type;

  const reqString = `SELECT * FROM choiseHw WHERE hw_type='${id}'`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: 1 });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.choisehwget = (req, res) => {
  const reqString = `SELECT * FROM choiseHw`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: 1 });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports.choisehwplantget = (req, res) => {
  const reqString = `SELECT * FROM choisePlant`;
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).json({ mes: 1 });
    } else {
      res.status(200).json(results);
    }
  });
};
