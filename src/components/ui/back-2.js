import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

export const CBack = () => {
  const history = useHistory();
  const onBack = () => {
    history.goBack();
  };

  return (
    <>
      <div style={{ width: "100%", paddingLeft: "10%", paddingTop: 10 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => onBack()}
          style={{ marginBottom: 10 }}
        >
          назад
        </Button>
      </div>
    </>
  );
};
