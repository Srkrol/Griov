const mysql = require("mysql");
const base64 = require("base-64");
const utf8 = require("utf8");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  charset: "utf8mb4",

  //multipleStatements: true,
});

module.exports.socket = (socet) => {
  const sort = (a1, b1) => {
    let arr = [a1, b1];
    arr.sort();
    const result = arr[0] + arr[1];
    return result;
  };

  socet.on("message", (data) => {
    const ressocketid = sort(data.socketid, data.to);

    if (data.status === "SET") {
      const sqlset = `INSERT INTO chat_messages ( socketid, user_id,	comment	) values('${ressocketid}', '${data.userid}' , '${data.mes.data.text}' )`;

      mysqlConnection.query(sqlset, function (err, results, fields) {
        const sqlget = `
          SELECT users.username, users.id, chat_messages.comment
          FROM users, chat_messages
          WHERE chat_messages.user_id=users.id
          AND chat_messages.socketid='${ressocketid}'
          ORDER BY chat_messages.id DESC LIMIT 50`;
        mysqlConnection.query(sqlget, function (err, results, fields) {
          socet.emit(ressocketid, results);
          socet.broadcast.emit(ressocketid, results);
        });
      });
    }
    if (data.status === "GET") {
      const sqlget = `
          SELECT users.username, users.id, chat_messages.comment
          FROM users, chat_messages
          WHERE chat_messages.user_id=users.id
          AND chat_messages.socketid='${ressocketid}'
          ORDER BY chat_messages.id DESC LIMIT 50`;
      mysqlConnection.query(sqlget, function (err, results, fields) {
        socet.emit(ressocketid, results);
      });
    }
  });

  socet.on("disconect", () => {
    console.log("disconet");
  });
};
