export const AddSchedule = async (tab) => {
  const url = "http://192.168.253.18:3012/api/app/update_event/v1";

  const switchvalue = tab.value ? "ON" : "OFF";
  const title = tab.box_id + tab.param + switchvalue;

  const years = new Date(tab.dt).getFullYear();
  const mounts = new Date(tab.dt).getMonth();
  const day = new Date(tab.dt).getDate();
  const hours = new Date(tab.dt).getHours();
  const minutes = new Date(tab.dt).getMinutes();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: title,
    api_key: "8d83df2994a7640fe80cf9f4159edcc5",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // достаем id
  const res = await fetch(
    "http://192.168.253.18:3012/api/app/get_event/v1",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.event.id;
    })
    .catch((error) => {
      "err";
    });

  let data = null;

  if (tab.daily === 100) {
    console.log("e");
    data = {
      id: res,
      api_key: "8d83df2994a7640fe80cf9f4159edcc5",
      timezone: "Europe/Moscow",
      timing: {
        hours: [hours],
        minutes: [minutes],
      },
    };
  } else {
    data = {
      id: res,
      api_key: "8d83df2994a7640fe80cf9f4159edcc5",
      timezone: "Europe/Moscow",
      timing: {
        years: [years],
        months: [mounts + 1],
        days: [day],
        hours: [hours],
        minutes: [minutes],
      },
    };
  }

  // обновляем

  const dataupdate = JSON.stringify(data);

  const requestOptionsupdate = {
    method: "POST",
    headers: myHeaders,
    body: dataupdate,
    redirect: "follow",
  };

  const status = await fetch(
    "http://192.168.253.18:3012/api/app/update_event/v1",
    requestOptionsupdate
  )
    .then((response) => response.json())
    .then((result) => {
      return true;
    })
    .catch((error) => {
      return false;
    });

  return { status };
};
