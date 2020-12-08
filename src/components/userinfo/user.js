import React from "react";
import { Avatar, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import { AntDesignOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { Achievement } from "./achievemenе";

export const User = ({ user, id }) => {
  const history = useHistory();
  const userid = useSelector((state) => state.user.user);

  if (user === null) {
    return <h1>Load</h1>;
  }

  if (user === false) {
    return <h1>пользователь не найден</h1>;
  }
  console.log(user);
  return (
    <div
      style={{
        width: "100%",
        minHeight: 300,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Avatar
            src={user.avatar}
            size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 80, xxl: 80 }}
            icon={<AntDesignOutlined />}
            style={{
              margin: 10,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          />
          <p
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "90px",
              fontSize: 20,
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {user.username}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "90px",
            margin: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90px",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Button onClick={() => history.goBack()}>
              <DoubleLeftOutlined style={{ color: "#595959" }} /> Назад
            </Button>
            <Button>
              <Link to={`/chat/${id}/${userid.id}`}>Написать сообщение</Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          padding: 10,
        }}
      >
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
        <Achievement />
      </div>
    </div>
  );
};
