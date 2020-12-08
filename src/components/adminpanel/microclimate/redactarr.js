export const redactarr = (val, index, tobe) => {
  const type =
    val.hw_type === "sun" ? "_" + val.hw_type + "1" : "_" + val.hw_type;

  let result = [];

  let res1 = null;
  let res2 = null;

  tobe.forEach((res) => {
    if (res.param === type && Number(res.value) === 100) {
      res1 = {
        date: new Date(res.dt),
        time: new Date(res.time),
        label: val.label,
        every: res.daily,
        value: res.value,
        index: index,
        param: val.hw_type,
        status: res.status,
      };
    }

    if (res.param === type && Number(res.value) === 0) {
      res2 = {
        date: new Date(res.dt),
        time: new Date(res.time),
        label: val.label,
        every: res.daily,
        value: res.value,
        index: index + 1,
        param: val.hw_type,
        status: res.status,
      };
    }
  });

  if (res1 === null) {
    res1 = {
      date: new Date(),
      time: new Date(),
      label: val.label,
      every: 0,
      value: 100,
      index: index,
      param: val.hw_type,
      status: 0,
    };
  }
  if (res2 === null) {
    res2 = {
      date: new Date(),
      time: new Date(),
      label: val.label,
      every: 0,
      value: 0,
      index: index + 1,
      param: val.hw_type,
      status: 0,
    };
  }

  result.push(res1);
  result.push(res2);

  return { on: res1, off: res2 };
};

/***
 * 
 * 
 *   if (tobe.length === 0) {
    const arr = {
      date: new Date(),
      time: new Date(),
      label: val.label,
      every: 0,
      value: 100,
      index: index,
      param: val.hw_type,
      status: 0,
    };

    const arr2 = {
      date: new Date(),
      time: new Date(),
      label: val.label,
      every: 0,
      value: 0,
      index: index + 1,
      param: val.hw_type,
      status: 0,
    };
    result.push(arr);
    result.push(arr2);
  }
 */
