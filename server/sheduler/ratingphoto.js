const request = require("request");

module.exports.ratingphoto = (box) => {
  const url =
    "http://192.168.253.18:3012/api/app/run_event/v1?api_key=8d83df2994a7640fe80cf9f4159edcc5&title=";

  const options = {
    method: "POST",
    url: url + box + "_photo_rang",
  };

  request(options, function (error, response) {});
};
