import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Image, Skeleton } from "antd";
import { AntDesignOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { rf } from "../../constants/api";
import axios from "axios";
import { AddComment } from "./addcoments";
import { Comments } from "./comments";
import { useHistory } from "react-router-dom";

export const LadderUser = ({ id, from }) => {
  const userladder = useSelector((state) => state.ladderuser.user);
  const user = useSelector((state) => state.user.user);
  const [img, setImg] = useState("");
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (userladder !== null) {
      const localtoken = localStorage.getItem("token");
      const varBoxId = userladder.box_id;

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };
      const params = new URLSearchParams({
        boxid: varBoxId,
        ladder: Number(id) === 0 ? 0 : 100,
      }).toString();

      axios
        .get(`${rf}?${params}`, headers)
        .then((response) => {
          setImg(response.data);
        })
        .catch((e) => {
          // history.push("/_500");
        });
    }
  }, [userladder]);

  if (userladder === null) {
    return null;
  }

  if (user === null) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Button
                onClick={() => onBack()}
                style={{ width: 100, marginBottom: 10 }}
              >
                {" "}
                <ArrowLeftOutlined />
                {"  "}назад
              </Button>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Avatar
                  src={userladder.avatar}
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  icon={<AntDesignOutlined />}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={
                      user.id === userladder.id
                        ? "/userclimat"
                        : `/userinfo/${userladder.id}`
                    }
                    style={{ margin: 0, paddingLeft: 10 }}
                  >
                    {userladder.username}
                  </Link>
                  <p style={{ margin: 0, paddingLeft: 10 }}>
                    {userladder.box_name} | {userladder.plant_name}
                  </p>
                </div>
              </div>
            </div>
          }
          bordered={false}
          style={{ width: "90%" }}
        >
          <Image
            src={
              img === "" ? <Skeleton.Image /> : `data:image/jpeg;base64,${img}`
            }
          />
        </Card>
      </div>
      <AddComment user={userladder} id={userladder.box_id} usermain={user} />
      <Comments box={userladder.box_id} />
    </div>
  );
};
