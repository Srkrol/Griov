import { boxnameredact } from "../../constants/api";
import axios from "axios";
import { isText } from "../../action/text";

export const FetchName = async (name, box) => {
  const is = isText(
    name,
    2,
    26,
    "Имя должно быть больше или равно двум символам",
    "Имя должно быть неболее двадцати пяти символов"
  );

  let res = null;
  if (is) {
    const localtoken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    const form = new FormData();
    form.append("box", box);
    form.append("name", name);

    await axios
      .post(boxnameredact, form, headers)
      .then(() => {
        res = true;
      })
      .catch(() => {
        res = false;
      });
  }

  return res;
};
