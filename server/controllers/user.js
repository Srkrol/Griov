const mysql = require("mysql");
const request = require("request");
const { v4: uuidv4 } = require("uuid");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

const options = {
  method: "POST",
  url: "http://192.168.253.22:3000/api/v1/login",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ user: "griov", password: "HereIsMyPass!" }),
};

/**
 * id = user.sub
 * username = user.name
 * nickname = user.nickname
 * avatar = user.picture
 */

module.exports.userAuth = async (req, res) => {
  const user = req.query;

  const id = user.sub;
  const username = user.name.slice(0, 20);
  const nickname = user.nickname;
  const avatar = user.picture;
  const num = uuidv4();
  let userData = null;

  const reqString = `SELECT * FROM users WHERE id='${id}'`; // пррверка пользователл
  mysqlConnection.query(reqString, function (err, results, fields) {
    if (!!results[0] === false) {
      const adduser = `INSERT INTO users ( id, username, nickname, avatar, uid ) values( '${id}' , '${username}','${nickname}','${avatar}', '${num}')`;
      mysqlConnection.query(adduser, function (err, results, fields) {
        if (err) {
          res.status(400).json({ mes: "ошибка входа ползователя" });
        }
        if (!!results[0] === false) {
          userData = {
            id: user.sub,
            username: user.name,
            avatar: user.picture,
            uid: num,
            box: [],
            coins: 0,
            leaves: 0,
          };
          res.status(200).json(userData);
        }
      });
      // регистрация пользователь в бд
    } else {
      // достает пользователя из бд u box
      const SearchBox = `select * FROM boxinfo where user_id='${results[0].id}'`;
      mysqlConnection.query(SearchBox, function (err, resultsbox, fields) {
        if (err) {
          res.status(400).jsom({ mes: "ошибка входа ползователя" });
        }
        if (resultsbox) {
          userData = {
            id: results[0].id,
            username: results[0].username,
            nickname: results[0].nickname,
            avatar: results[0].avatar,
            box: resultsbox,
            uid: results[0].uid,
            coins: results[0].coins,
            leaves: results[0].leaves,
            role: results[0].role,
          };
          res.status(200).json(userData);
        }
      });
    }
  });
};

module.exports.getUserData = (req, res) => {
  const id = req.query.id;
  const reqString = `SELECT * FROM users WHERE id='${id}'`;
  let userData = null;

  mysqlConnection.query(reqString, function (err, results, fields) {
    if (err) {
      res.status(400).jsom({ mes: "ошибка входа ползователя" });
    }

    const SearchBox = `select * FROM boxinfo where user_id='${results[0].id}'`;
    mysqlConnection.query(SearchBox, function (err, resultsbox, fields) {
      if (err) {
        res.status(400).jsom({ mes: "ошибка входа ползователя" });
      }
      if (resultsbox) {
        userData = {
          id: results[0].id,
          username: results[0].username,
          nickname: results[0].nickname,
          avatar: results[0].avatar,
          uid: results[0].uid,
          box: resultsbox,
          coins: results[0].coins,
          leaves: results[0].leaves,
          role: results[0].role,
        };
        res.status(200).json(userData);
      }
    });
  });
};

module.exports.checkadmin = (req, res) => {
  const id = req.body.id;
  console.log(id);
  res.status(200).json((data = true));
};
