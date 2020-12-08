import React, { useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { host } from "../../constants/api";
const socket = io(host, ["websocket", "polling"]);

export const UserComp = ({ val }) => {
  const user = useSelector((state) => state.user.user);

  const num = localStorage.getItem(val.data.id);
  const sum = val.num - num;

  let res = sum < 0 ? 0 : sum;

  const username = val.data.username.slice(0, 20);

  if (val.num === false) {
    res = 0;
  }

  return (
    <Link
      to={`/chat/${user.id}/${val.data.id}`}
      onClick={() => socket.disconnect()}
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
        src={val.data.avatar}
        size={64}
        icon={<UserOutlined />}
      />
      <p style={{ color: "#595959" }}>{username} </p>
      {res === 0 ? null : (
        <div
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: -20,
            right: -20,
            borderRadius: 100,
            fontSize: 20,
            zIndex: 10,
            background: "#52c41a",
          }}
        >
          <p style={{ margin: 0, color: "#595959" }}>{res}</p>
        </div>
      )}
    </Link>
  );
};
