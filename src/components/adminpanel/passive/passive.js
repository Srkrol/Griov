import React from "react";
import { List, Typography, Divider, Popover } from "antd";

export const Passive = ({ passive }) => {
  return (
    <>
      <Divider orientation="left">Пасивное упарвление</Divider>
      <List
        bordered
        style={{
          width: 250,
        }}
        dataSource={passive.device}
        renderItem={(item) => (
          <List.Item style={{display: 'flex'}}>
            {item.label}:{" "}
            <Typography.Text mark>
              <Popover
                style={{ width: 300, background: "white" }}
                placement="topLeft"
                content={
                  <div style={{ width: "300px", fontSize: "17px" }}>
                    <p>{item.desc_long}</p>
                  </div>
                }
                trigger="hover"
              >
                [{item.name}]
              </Popover>
            </Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
};
