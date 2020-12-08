import React, { Component } from "react";
import { ButtonAuth } from "../components/buttonAuth";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import "../Lk.css";

const LkHeader = () => {
  const history = useHistory();
  const RedirectAdminpanel = () => {
    history.goBack();
  };

  return (
    <div className="lkheader">
      <Button onClick={() => RedirectAdminpanel()}>Вернутся на главную</Button>
      <ButtonAuth />
    </div>
  );
};

export default LkHeader;
