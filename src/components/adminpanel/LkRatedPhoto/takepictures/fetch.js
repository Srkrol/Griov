import axios from "axios";
import { ratingphotosheduler } from "../../../../constants/api";

export const Fetch = async (boxid) => {
  const localtoken = localStorage.getItem("token");

  const form = new FormData();
  form.append("boxid", boxid);

  const headers = {
    headers: {
      Authorization: "Bearer " + localtoken,
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios
    .post(`${ratingphotosheduler}`, form, headers)
    .then((res) => {
      return res.data
    })
    .catch(() => {
      return false
    });

    return res
};
