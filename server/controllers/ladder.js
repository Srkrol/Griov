const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

module.exports.getladder = (req, res) => {
  const Competitions = `SELECT * FROM Competitions`;
  mysqlConnection.query(Competitions, function (err, resultscomp, fields) {
    const ladder = `SELECT comp_id, username, boxinfo.box_id, box_name, last_rang FROM Competitors, boxinfo, users WHERE Competitors.box_id = boxinfo.box_id AND Competitors.user_id = users.id`;
    mysqlConnection.query(ladder, function (err, results, fields) {
      if (err) {
        res.status(404).json({ mes: "1" });
      } else {
        let data = []; // масив для отправки 

        resultscomp.forEach((comp) => {

          let box = []
          let ladder = []; // сотировка участников по ладерам
          results.forEach((lad) => {
            if (comp.id === lad.comp_id) {
              ladder.push(lad);
              box.push(lad.box_id)
            }
          });

          const topsort = ladder.sort((a, b) => { // сортировка по рейтингу
            return b.last_rang - a.last_rang;
          });

          let top = []; // топ участников
          topsort.map((val, index) => {
            if (index < 3) {
              top.push(val);
            }
          });

          data.push({ comp, top, box, boxselect: 0});
        });
    
        res.status(200).json({ data });
      }
    });
  });
};

module.exports.registerladder = (req, res) => {
  const id = Number(req.body.id);
  const boxid = Number(req.body.boxid);
  const userid = req.body.userid;

  const ladder = `INSERT INTO Competitors (comp_id, box_id, user_id) values(${id} , ${boxid}, '${userid}')`;
  mysqlConnection.query(ladder, function (err, results, fields) {
    const Competitions = `SELECT * FROM Competitions`;
    mysqlConnection.query(Competitions, function (err, resultscomp, fields) {
      const ladder = `SELECT comp_id, username, boxinfo.box_id, box_name, last_rang FROM Competitors, boxinfo, users WHERE Competitors.box_id = boxinfo.box_id AND Competitors.user_id = users.id`;
      mysqlConnection.query(ladder, function (err, results, fields) {
        if (err) {
          res.status(404).json({ mes: "1" });
        } else {
          let data = []; // масив для отправки 

        resultscomp.forEach((comp) => {

          let box = []
          let ladder = []; // сотировка участников по ладерам
          results.forEach((lad) => {
            if (comp.id === lad.comp_id) {
              ladder.push(lad);
              box.push(lad.box_id)
            }
          });

          const topsort = ladder.sort((a, b) => { // сортировка по рейтингу
            return b.last_rang - a.last_rang;
          });

          let top = []; // топ участников
          topsort.map((val, index) => {
            if (index < 3) {
              top.push(val);
            }
          });

          data.push({ comp, top, box, boxselect: boxid });
        });

        res.status(200).json({ data });
        }
      });
    });
  });
};

/**
 *  id: 'google-oauth2|113688276084499180533',
    comp_id: 1,
    box_id: 41,
    user_id: 'google-oauth2|113688276084499180533',
    box_name: 'Коробка мечты',
    plant_name: 'Укроп',
    seed_date: 2020-08-02T21:00:00.000Z,
    stamp_logo: 1,
    stamp_time: 1,
    last_rang: 27.43,
    username: 'dsfdsfsdfs',
    nickname: 'georgiy.kirillov',
    pic_url: null,
    avatar: '
 */
