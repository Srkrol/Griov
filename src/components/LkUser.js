import React, { useState } from "react";
import AvatarEdit from "./climat/header/avatar";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, message, Button } from "antd";
import axios from "axios";
import { SET_USER_NAME_RE } from "../constants/store";
import { uploadname } from "../constants/api";
import { useHistory } from "react-router-dom";

export const LkUser = ({ colapse }) => {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState(false);
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  if (user === null) {
    return null;
  }

  const redactUSer = (val) => {
    dispatch({
      type: SET_USER_NAME_RE,
      val: val,
    });
  };

  const Fetch = async () => {
    setState(!state);
    if (state) {
      setBlock(true);
      const localtoken = localStorage.getItem("token");

      const form = new FormData();
      form.append("id", localStorage.getItem("id"));
      form.append("username", user.username);

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios
        .post(`${uploadname}`, form, headers)
        .then((res) => {
          message.info("Имя изменено");
        })
        .catch(() => {
          message.info("произошла ошибка сохранение имени");
        });

      setBlock(false);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: 100,
        padding: 10,
      }}
    >
      <AvatarEdit user={user} />
      <p
        style={{
          fontSize: "18px",
          position: "relative",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {colapse === false ? (
          state ? (
            <>
              <Input
                style={{ width: 180 }}
                value={user.username}
                placeholder="Basic usage"
                onChange={(e) => redactUSer(e.target.value)}
              />
              <Button disabled={block} loading={block} onClick={() => Fetch()}>
                <CheckOutlined />
              </Button>
            </>
          ) : (
            <>
              {user.username}
              <Button style={{ marginLeft: 10 }} onClick={() => Fetch()}>
                <EditOutlined />
              </Button>
            </>
          )
        ) : null}
      </p>
    </div>
  );
};
