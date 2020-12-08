import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { getuserinfo } from "../constants/api";

import { HeaderClimat } from "../components/climat/header";
import { User } from "../components/userinfo/user";
import { Boxs } from "../components/userinfo/boxs";

export const UserInfo = () => {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    user: null,
    boxs: [],
  });

  useEffect(() => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("id", id);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${getuserinfo}`, form, headers)
      .then((res) => {
        if (res.data.user === false) {
          history.push("/_404");
        } else {
          setState({
            user: res.data.user,
            boxs: res.data.boxs,
          });
        }
      })
      .catch(() => {
        history.push("/_500");
      });
  }, [true]);

  return (
    <>
      <HeaderClimat />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: 10,
        }}
      >
        <User user={state.user} id={id}/>
        <Boxs boxs={state.boxs} />
      </div>
    </>
  );
};
