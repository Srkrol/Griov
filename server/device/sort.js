module.exports.unique = (arr) => {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str.id)) {
      result.push({
        id: str.id,
      });
    }
  }

  let result2 = [];
  for (let str of result) {
    if (!result2.includes(str.id)) {
      result2.push(str.id);
    }
  }

  return result2;
};

module.exports.result = (results) => {
  const ressort = [];

  results.forEach((val) => {
    if (!!val.perhour !== false) {
      ressort.push(val);
    }
  });

  return ressort;
};

module.exports.coinsnum = (val, action) => {
  const hw_type = val.hw_type === "sun" ? "sun1" : val.hw_type;

  const res = datasort(action, hw_type, val.box_id);

  return res;
};

const datasort = (action, hw_type, box_id) => {
  let sum = 0;
  let breack = false;
  let value = 0;
  let status = "plus";

  let int = 0;

  let actionbox = [];

  action.forEach((a) => {
    if (a.box_id === box_id && a.param === hw_type) {
      actionbox.push(a);
    }
  });

  actionbox.forEach((a) => {
    if (a.box_id === box_id && a.param === hw_type) {
      breack = false;
      const date = new Date(a.dt).getTime();

      if (
        status === "minus" &&
        Number(a.value) === 0 &&
        value === 100 &&
        breack === false
      ) {
        int = int - date;
        sum = sum + int;
        status = "plus";
        value = 0;
        breack = true;
        int = 0;
      }

      if (
        status === "plus" &&
        Number(a.value) === 100 &&
        value === 0 &&
        breack === false
      ) {
        int = date;
        status = "minus";
        value = 100;
        breack = true;
      }
    }
  });

  let res = 0;
  if (!!actionbox[actionbox.length - 1]) {
    if (actionbox[actionbox.length - 1].value === 100) {
      const p = new Date(actionbox[actionbox.length - 1].dt).getTime();
      const now = new Date().getTime();
      res = parseInt((now - p) / (1000 * 60 * 60));
    }
  }

  return parseInt(sum / (1000 * 60 * 60) - res);
};
