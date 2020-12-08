import React from "react";
import { Card, Typography, Popover, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Meta } = Card;

export const Box = ({ box, index, active, setActive }) => {
  const onActive = () => {
    setActive(index);
  };

  const content = (
    <div style={{ width: "300px", fontSize: "17px" }}>
      <p>{box.desc_long}</p>
    </div>
  );

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        hoverable
        bordered
        title={
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            onClick={() => onActive()}
          >
            <Title level={4}>{box.name}</Title>
            {active === index ? (
              <CheckOutlined style={{ fontSize: 30 }} />
            ) : null}
          </div>
        }
        bordered={false}
        style={{
          width: 280,
          background:  box.available !== 0? '#52c41a' : '#fafafa' ,
          marginLeft: "10px",
          marginRight: "10px",
          position: "relative",
        }}
      >
        {box.available === 0 ? (
          <div
            style={{
              position: "absolute",
              background: "rgba(82, 196, 26, 0.2)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                height: 100,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <img
                style={{
                  width: 100,
                  height: 100,
                }}
                alt="/2.png"
                src="/2.png"
              />
            </div>
          </div>
        ) : null}
        <p
          style={{
            width: "100%",
            height: 150,
            fontFamily: "'El Messiri', sans-serif",
            overflowY: "hidden",
          }}
          onClick={() => onActive()}
        >
          {box.desc_short}
        </p>
        <p>Кaтегория: {box.category}</p>
        <p>Количество: {box.available}</p>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Meta
            style={{ marginTop: "10px" }}
            title={
              <Popover
                style={{ width: 300, background: "white" }}
                placement="topLeft"
                content={content}
                trigger="click"
              >
                <Button
                  style={{
                    background:
                      box.available === 0 ? "rgba(82, 196, 26, 0.04)" : "",
                  }}
                >
                  Описание
                </Button>
              </Popover>
            }
          />
          <Text
            style={{
              marginTop: "13px",
              marginLeft: "10px",
              fontFamily: "'El Messiri', sans-serif",
            }}
          >
            {box.perseed}
            <img style={{ width: 30, height: 30 }} alt="/3.jpg" src="/3.jpg" />
            за посев
          </Text>
        </div>
      </Card>
    </div>
  );
};
