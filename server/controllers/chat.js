const { json } = require("body-parser");
const request = require("request");

module.exports.chatlogin = (req, res) => {
  const uid = req.body.uid;

  const options = {
    method: "POST",
    url: "http://192.168.253.22:3000/api/v1/login",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ user: "Griov", password: "HereIsMyPass!" }),
  };

  request(options, function (error, response) {
    const data = JSON.parse(response.body);
    res.status(200).json(data.data);
  });
};

module.exports.chatiframe = (req, res) => {
  const uid = req.body.uid;
};
