import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "antd";
import { SET_ROLE_SESSION, SET_USER_DATA } from "../constants/store";
import { roleNoAuth } from "../setting/routes";

import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export const ErrorComp = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { logout } = useAuth0();

  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const Click = async () => {
    setDisable(true);
    await logout();
    dispatch({
      type: SET_ROLE_SESSION,
      roleActive: roleNoAuth.role,
    });
    dispatch({
      type: SET_USER_DATA,
      user: null,
    });
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#73d13d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {pathname === "/_500" ? (
        <h1
          style={{
            fontSize: 100,
            margin: 0,
            padding: 10,
            color: "white",
            lineHeight: "0.5",
          }}
        >
          500
        </h1>
      ) : (
        <h1
          style={{
            fontSize: 100,
            margin: 0,
            padding: 10,
            color: "white",
            lineHeight: "0.5",
          }}
        >
          404
        </h1>
      )}
      {pathname === "/_500" ? (
        <h2
          style={{
            fontSize: 20,
            textAlign: "center",
            maxWidth: 700,
            margin: 0,
            padding: 10,
            color: "white",
          }}
        >
          Извините, произошла ошибка на сервере пожалуйста повторите попытку
        </h2>
      ) : (
        <h2
          style={{
            fontSize: 20,
            textAlign: "center",
            maxWidth: 700,
            margin: 0,
            padding: 10,
            color: "white",
          }}
        >
          Извините, мы не можем найти вашу страницу
        </h2>
      )}
      <Button disabled={disable} onClick={() => Click()}>
        Вернутся на главную
      </Button>
    </div>
  );
};
