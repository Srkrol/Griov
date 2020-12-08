import React from "react";
import { Card, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

export const Random = () => {
  const history = useHistory();
  const LinkPush = () => {
    history.push("/createbox");
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        onClick={() => LinkPush()}  
        hoverable
        bordered
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>Cоздать свой GrBox</Title>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          background: "white",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
          <img style={{ width: 200, height: 200, marginTop: 50  }} alt="/1.png" src="/1.png" />
        </div>
      </Card>
    </div>
  );
};
