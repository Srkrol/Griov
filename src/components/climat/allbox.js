import React from "react";
import { Card, Typography, Popover, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { RatioAllBox } from "./ratioallbox";

const { Title, Text } = Typography;
const { Meta } = Card;

export const Box = ({ box, index, active, setActive, boxsindex }) => {
  const content = (
    <div style={{ width: "300px", fontSize: "17px" }}>
      <p>{box.desc_long}</p>
    </div>
  );
  const onActive = () => {
    setActive(index);
  };

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
        bordered={true}
        style={{
          width: 280,
          background:  box.available !== 0? '#d9f7be' : '#d9d9d9' ,
          marginLeft: "10px",
          marginRight: "10px",
          position: "relative",
        }}
      >
        {box.available === 0 ? (
          <div
            style={{
              position: "absolute",
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
            height: 200,
            fontFamily: "'El Messiri', sans-serif",
            overflowX: "hidden",
            whiteSpace: "pre",
          }}
          onClick={() => onActive()}
        >
          {box.desc_short}
        </p>
        <RatioAllBox
          box={box}
          boxsindex={boxsindex}
          index={index}
        />
        <p>Количество: {box.available}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
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
                        box.available !== 0 ? "#95de64" : "#f5f5f5",
                    }}
                  >
                    Описание
                  </Button>
                </Popover>
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!!box.perhour ? (
              <Text
                style={{
                  marginTop: "13px",
                  marginLeft: "10px",
                  fontFamily: "'El Messiri', sans-serif",
                }}
              >
                {box.perhour}
                <img
                  style={{ width: 30, height: 30 }}
                  alt="/3.jpg"
                  src="/3.jpg"
                />
                /в час
              </Text>
            ) : null}
            <Text
              style={{
                marginTop: "13px",
                marginLeft: "10px",
                fontFamily: "'El Messiri', sans-serif",
              }}
            >
              {box.permounth}
              <img
                style={{ width: 30, height: 30 }}
                alt="/3.jpg"
                src="/3.jpg"
              />
              /месяц
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
