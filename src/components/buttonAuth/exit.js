import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { SET_ROLE_SESSION, SET_USER_DATA } from "../../constants/store";
import { roleNoAuth } from "../../setting/routes";

export const ExitAuth = () => {
  const { logout } = useAuth0();
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

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
    //localStorage.clear()
  };
  return (
    <Button
      loading={disable}
      disabled={disable}
      onClick={() => Click()}
      style={{
        background: "white",
        borderRadius: "5px",
        minHeight: "35px",
        minWidth: "110px",
        fontSize: "16px",
        width: 100,
      }}
    >
      Выход
    </Button>
  );
};
