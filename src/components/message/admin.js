import React, { useEffect, useState } from "react";
import { Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { messagesupport } from "../../constants/api";

export const UserAdmin = ({ userid, userscomm }) => {
  const [admin, setAdmin] = useState({
    username: "",
    avatar: "",
    id: "",
  });

  useEffect(() => {
    Fetch();
  }, [true]);

  useEffect(() => {
    if (userscomm.length !== 0) {
      userscomm.map((val) => {
        if (val.id === admin.id) {
          setAdmin(true);
        }
      });
    }
  }, [userscomm, admin]);

  const Fetch = async () => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("userid", userid);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios
      .post(`${messagesupport}`, form, headers)
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        //history.push("/_500");
      });
    setAdmin(res);
  };
  return admin === true ? null : (
    <Link
      to={`/chat/${userid}/${admin.id}`}
      style={{
        width: 200,
        paddingBottom: 0,
        margin: 10,
        padding: 10,
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        maxHeight: 100,
      }}
    >
      <Avatar
        style={{ margin: 0, marginRight: 10 }}
        src={admin.avatar}
        size={64}
        icon={<UserOutlined />}
      />
      <p style={{ color: "#595959" }}>{admin.username.slice(0, 25)}</p>
    </Link>
  );
};
