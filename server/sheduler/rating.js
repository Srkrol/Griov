const request = require("request");

module.exports.setevent = (box) => {
  const event = box + "_photo_light";
  const url =
    "http://192.168.253.18:3012/api/app/run_event/v1?api_key=8d83df2994a7640fe80cf9f4159edcc5&title=";

  const options = {
    method: "POST",
    url: url + event,
  };

  request(options, function (error, response) {});

  return true;
};

module.exports.seteventinterval = (req) => {
  const date = req.body.id;
  const sw = req.body.sw;
  const box = req.body.box;

  const event = box + "_photo_light";

  const optionsid = {
    method: "POST",
    url: "http://192.168.253.18:3012/api/app/get_event/v1",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: event,
      api_key: "8d83df2994a7640fe80cf9f4159edcc5",
    }),
  };

  request(optionsid, function (error, resid) {
    const data = JSON.parse(resid.body);
    const id = data.event.id;

    const dates = new Date(date);
    const times = new Date(date);

    const year = dates.getFullYear();
    const mounth = dates.getMonth() + 1;
    const day = dates.getDate();

    const hours = times.getHours();
    const minutes = times.getMinutes();

    let timing = null;
    console.log(hours);
    if (sw === "true") {
      timing = {
        hours: [hours],
        minutes: [minutes],
      };
    } else {
      timing = {
        years: [3000],
        months: [mounth],
        days: [day],
        hours: [hours],
        minutes: [minutes],
      };
    }

    const optionsupdate = {
      method: "POST",
      url: "http://192.168.253.18:3012/api/app/update_event/v1",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: id,
        title: event,
        enabled: 1,
        api_key: "8d83df2994a7640fe80cf9f4159edcc5",
        timing: timing,
      }),
    };
    request(optionsupdate, function (error, response) {});
  });
};
