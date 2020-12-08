import axios from "axios";
import { ratingphotoshedulerupdate } from "../../../../constants/api";
import { message } from "antd";

export const Fetch = async (date, sw) => {
  const localtoken = localStorage.getItem("token");

  const form = new FormData();

  const d = new Date(date);
  form.append("id", d);
  form.append("sw", sw);
  form.append("box", localStorage.getItem("boxid"));

  const headers = {
    headers: {
      Authorization: "Bearer " + localtoken,
      "Content-Type": "multipart/form-data",
    },
  };

  await axios
    .post(`${ratingphotoshedulerupdate}`, form, headers)
    .then((res) => {
      message.success("Настройки изменены");
    })
    .catch(() => {
      message.error("Настройки не изменены");
    });

  return true;
};
