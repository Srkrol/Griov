import axios from "axios";
import { uploadavatar } from "../../../constants/api";

export const postavatar = async (img, ava) => {
  const localtoken = localStorage.getItem("token");

  const form = new FormData();
  form.append("image", img);
  form.append("id", localStorage.getItem("id"));
  form.append("ava", ava);

  const headers = {
    headers: {
      Authorization: "Bearer " + localtoken,
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios
    .post(`${uploadavatar}`, form, headers)
    .then((res) => {
      return true;
    })
    .catch(() => {
      return false;
    });

    return {res}
};
