import React, { useState } from "react";
import { Menu, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "../Lk.css";
import LkBoxname from "./LkBoxname/LkBoxname";
import { LkUser } from "./LkUser";
import { SET_ADMIN_PANEL_WIDTH } from "../constants/store";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const LkSidebar = () => {
  const [collapsed, setcollapsed] = useState(true);
  const dispatch = useDispatch();

  const width = useSelector((state) => state.device.width);

  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
    dispatch({
      type: SET_ADMIN_PANEL_WIDTH,
      width: collapsed ? 250 : 80,
    });
  };

  return (
    <div
      style={{
        width: width,
        position: "fixed",
        zIndex: 40,
        top: 0,
        left: 0,
        bottom: 0,
        transition: "0.2s",
      }}
    >
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        style={{ minHeight: "100vh", background: "#40a9ff" }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16, background: "red" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <LkUser colapse={collapsed} />
        <LkBoxname colapse={collapsed} />
      </Menu>
    </div>
  );
};

export default LkSidebar;
