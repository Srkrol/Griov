const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./route");
const socket = require("./socket/socket");

var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server, {
  serveClient: false,
  origins: "*:*",
  transports: ["polling"],
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

const mysqlConnection = mysql.createConnection({
  host: "192.168.253.10",
  user: "tst",
  password: "tst",
  database: "gr_box",
  //multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("База подключена");
  } else {
    console.log("Ошибка подключение базы: " + err.message);
  }
});

app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use("/api", router);

app.use(express.static("public"));

io.on("connect", socket.socket);

server.listen(4000, () => {
  console.log("сервер запущен");
});
