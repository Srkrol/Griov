import axios from "axios";
import { notification } from "antd";
import { registerladder } from "../../constants/api";
import { SET_LADDER_COMP } from "../../constants/store";
import { Ladder } from "../../pages/ladder";

export const Register = (user, event, dispatch) => {
  const localtoken = localStorage.getItem("token");

  const box = event.box;
  
  let status = true;
  box.map((box) => {
    console.log(box, event.boxselect)
    if (Number(box) ===  Number(event.boxselect)) {
      status = false;
    }
  });

  const ladbox = event.boxselect;
  
  if (status) {
    const form = new FormData();
    form.append("id", event.comp.id);
    form.append("userid", user.user.id);
    form.append("boxid", ladbox);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${registerladder}`, form, headers)
      .then((res) => {
        notification.open({
          message: "GrBox зарегистрирован",
        });
       
        dispatch({
          type: SET_LADDER_COMP,
          event: res.data.data,
          select: ladbox
        });
      })
      .catch(() => {});
  } else {
    notification.open({
      message: "Этот GrBox уже зарегистрирован",
    });
  }
};
