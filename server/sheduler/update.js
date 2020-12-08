const request = require("request");

module.exports.AddSchedule = async (body) => {
  const date = body.date;
  const time = body.time;
  const type = body.type === "sun" ? "_" + body.type + "1" : "_" + body.type;
  const value = body.value === "100" ? "ON" : "OFF";
  const every = body.every === "100" ? true : false;
  const boxid = body.boxid;
  const status = body.status === "100" ? true : false;

  const title = boxid + type + value;

  const optionsid = {
    method: "POST",
    url: "http://192.168.253.18:3012/api/app/get_event/v1",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      api_key: "8d83df2994a7640fe80cf9f4159edcc5",
    }),
  };

  request(optionsid, function (error, resid) {
    const data = JSON.parse(resid.body);
    const id = data.event.id;

    const dates = new Date(date);
    const times = new Date(time);

    const year = dates.getFullYear();
    const mounth = dates.getMonth() + 1;
    const day = dates.getDate();

    const hours = times.getHours();
    const minutes = times.getMinutes();

    let timing = null;

    if (every === true) {
      timing = {
        hours: [hours],
        minutes: [minutes],
      };
    } else {
      timing = {
        years: [year],
        months: [mounth],
        days: [day],
        hours: [hours],
        minutes: [minutes],
      };
    }

    if (status === false) {
      timing = {
        years: [3000],
        months: [1],
        days: [1],
        hours: [0],
        minutes: [0],
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
        title: title,
        enabled: 1,
        api_key: "8d83df2994a7640fe80cf9f4159edcc5",
        timing: timing,
      }),
    };
    request(optionsupdate, function (error, response) {
      console.log("обновленно");
    });
  });
};
