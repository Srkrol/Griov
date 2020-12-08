import { message } from "antd";

export const isText = (tеxt, min, max, errmin, errmax) => {
  let resutl = true;
  const s = tеxt.split(' ').join('')

  if (s.length < min) {
    resutl = false;
    message.error(errmin);
  }

  if (tеxt.length >= max) {
    resutl = false;
    message.error(errmax);
  }

  return resutl;
};
