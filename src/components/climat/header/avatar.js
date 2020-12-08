import React, { useState } from "react";
import { Avatar, Badge, Popconfirm, message } from "antd";
import { AntDesignOutlined, InstagramOutlined } from "@ant-design/icons";
import Edit from "./edit";
import { postavatar } from "./postavatar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER_IMG_RE } from "../../../constants/store";

const AvatarEdit = ({ user }) => {
  const [img, setImg] = useState(user.avatar);
  const [imgpost, setImgpost] = useState(user.avatar);
  const [status, setStatus] = useState(false);
  const ava = useSelector((state) => state.user.user.avatar);

  const dispatch = useDispatch();

  const confirm = async () => {
    if (status !== false) {
      const { res } = await postavatar(imgpost);
      if (res) {
        message.info("Аватар изменен");
        dispatch({
          type: SET_USER_IMG_RE,
          avatar: imgpost,
        });
      } else {
        message.info("произошла ошибка загрузки аватара");
      }
    }
  };

  const text = <Edit setImg={setImg} setImgpost={setImgpost} ava={ava} setStatus={setStatus} />;
  return (
    <span className="avatar-item">
      <Popconfirm
        placement="bottom"
        title={text}
        onConfirm={confirm}
        okText="Cохранить"
        cancelText="Закрыть"
      >
        <Badge
          count={<InstagramOutlined style={{ fontSize: 20 }} />}
          offset={[-20, 55]}
          style={{
            backgroundColor: "#52c41a",
            width: 30,
            height: 30,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={img}
            size={{ xs: 70, sm: 70, md: 70, lg: 70, xl: 70, xxl: 70 }}
            icon={<AntDesignOutlined />}
          />
        </Badge>
      </Popconfirm>
    </span>
  );
};

export default AvatarEdit;
