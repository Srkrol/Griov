import React from "react";
import { Link } from "react-router-dom";
import { List, Typography, Button, Popover } from "antd";
import { Base64 } from "js-base64";

export const Device = ({ device }) => {
  let res = [];
  device.forEach((arr) => {
    arr.device.forEach((el) => {
      res.push(el);
    });
  });

  const box = Base64.encode(localStorage.getItem("boxid"));
  console.log(res);
  return (
    <>
      <List
        bordered
        style={{
          width: 250,
        }}
        dataSource={res}
        renderItem={(item) => (
          <List.Item style={{ display: "flex" }}>
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
      <Link to={`orderdevice/${box}`}>
        <Button style={{ marginTop: 10 }}>сменить оборудование</Button>
      </Link>
    </>
  );
};
