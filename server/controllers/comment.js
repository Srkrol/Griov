const mysql = require("mysql");
const base64 = require('base-64')
const utf8 = require('utf8')

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.addcomment = (req, res) => {
  const body = req.body;
  const comm = body.comm;
  const boxid = Number(body.boxid);
  const date = body.date;
  const useridhash = body.userid;

  const addcomment = `INSERT INTO comm_box ( dt, user_id,	box_id,	comment	) values( '${date}' , '${useridhash}', ${boxid} ,'${comm}')`;
  mysqlConnection.query(addcomment, function (err, resultscomm, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      const getuser = `SELECT id, username from users`;
      mysqlConnection.query(getuser, function (err, userid, fields) {
        if (err) {
          res.status(404).json({ mes: "1" });
        } else {
          const getuser = `SELECT dt, comment, user_id FROM comm_box WHERE box_id=${boxid}`;
          mysqlConnection.query(getuser, function (
            err,
            resultsusercomm,
            fields
          ) {
            let data = [];

            userid.forEach((user) => {
              resultsusercomm.forEach((comm) => {
                if (user.id === comm.user_id) {

                  const bytes = utf8.encode(user.id)
                  const encoded = base64.encode(bytes)

                  data.push({
                    dt: comm.dt,
                    username: user.username,
                    comment: comm.comment,
                    user_id: encoded,
                  });
                }
              });
            });

            res.status(200).json({ data });
          });
        }
      });
    }
  });
};

module.exports.getcommentbox = async (req, res) => {
  const box = Number(req.body.box);
  const getuser = `SELECT id, username from users`;
  mysqlConnection.query(getuser, function (err, userid, fields) {
    if (err) {
      res.status(404).json({ mes: "1" });
    } else {
      const getuser = `SELECT dt, comment, user_id FROM comm_box WHERE box_id=${box}`;
      mysqlConnection.query(getuser, function (err, resultsusercomm, fields) {
        let data = [];

        userid.forEach((user) => {
          resultsusercomm.forEach((comm) => {
            if (user.id === comm.user_id) {

              const bytes = utf8.encode(user.id)
              const encoded = base64.encode(bytes)

              data.push({
                dt: comm.dt,
                username: user.username,
                comment: comm.comment,
                user_id: encoded,
              });
            }
          });
        });

        res.status(200).json({ data });
      });
    }
  });
};
/**
 *  comm: 'sdfsdfsdfsdfsdfsd',
  boxid: '42',
  userid: 'google-oauth2|113688276084499180533',
  date: 
 */
