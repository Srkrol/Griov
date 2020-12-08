const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

/**
 * 
 * `SELECT users.username, users.avatar, users.id
               FROM users 
               WHERE users.id IN (SELECT DISTINCT user_id FROM comm_personal WHERE comm_personal.to_user = '${id}')
               OR users.id IN (SELECT DISTINCT to_user FROM comm_personal WHERE comm_personal.user_id = '${id}')
                `} req 
 *  
 */

module.exports.usersmessage = (req, res) => {
  const id = req.body.id;
  const sql = `
  SELECT users.username, users.id
  FROM users
  `;
  mysqlConnection.query(sql, function (err, result, fields) {
    let resultuserid = "";

    result.forEach((val) => {
      resultuserid =
        resultuserid +
        "'" +
        val.id +
        id +
        "'" +
        "=chat_messages.socketid" +
        " OR " +
        "'" +
        id +
        val.id +
        "'" +
        "=chat_messages.socketid" +
        " OR ";
    });
    // arr.
    const val = resultuserid.slice(0, -3);
    const sqlgetuser = `
      SELECT users.username, users.id, users.avatar FROM users, chat_messages
      WHERE chat_messages.user_id=users.id AND( 
        ${val}  )
    `;
    mysqlConnection.query(sqlgetuser, function (err, result, fields) {
      function unique(arr) {
        let result = [];
        let resdata = [];

        for (let str of arr) {
          if (!result.includes(str.username)) {
            result.push(str.username);
            resdata.push(str);
          }
        }
        return resdata;
      }

      const ress = unique(result);
      let num = [];

      ress.forEach((val) => {
        if (val.id !== id) {
          let num2 = 0;
          result.forEach((val2) => {
            if (val.id === val2.id && val.id !== id) {
              num2 = num2 + 1;
            }
          });
          num.push({
            data: val,
            num: num2,
          });
        }
      });
      console.log(num);
      res.status(200).json(num);
    });
  });
};

module.exports.messagesaveuserinfo = (req, res) => {
  const to = req.body.to;
  const from = req.body.from;
  const date = req.body.date;
  const message = req.body.message;

  const sql = `INSERT INTO chat_messages ( dt, user_id,	to_user,	comment	)
  values( '${date}' , '${from}', '${to}' ,'${message}')`;
  mysqlConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.status(200).json("err");
    } else {
      res.status(200).json(true);
    }
  });
};

module.exports.messagesupport = (req, res) => {
  const userid = req.body.userid;
  const admin = "auth0|5fabfe8560aa2c006bdae551";
  if (userid === admin) {
    res.status(200).json(true);
  } else {
    const sql = `SELECT username, avatar, id FROM users WHERE id="${admin}"`;
    mysqlConnection.query(sql, function (err, result, fields) {
      if (err) {
        res.status(400).json("err");
      } else {
        res.status(200).json(result[0]);
      }
    });
  }
};
