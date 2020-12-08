import React from "react";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const Back = ({ url }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(url)}
      style={{
        position: "fixed",
        width: 60,
        height: 50,
        top: 11,
        left: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #595959",
        borderRadius: 5,
        cursor: "pointer",
        zIndex: 10,
        background: "#73d13d",
      }}
    >
      <DoubleLeftOutlined style={{ fontSize: 40, color: "#595959" }} />
    </div>
  );
};
