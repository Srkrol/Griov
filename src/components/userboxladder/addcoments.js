import React, { useState } from "react";
import { Typography, Avatar, Input, Button } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Tooltip } from "antd";
import { addcomment } from "../../constants/api";
import { SET_COMMENT_BOX } from "../../constants/store";
import { useHistory } from "react-router-dom";
import { isText } from '../../action/text'
const { Title } = Typography;
const { TextArea } = Input;

export const AddComment = ({ user, id, usermain }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("comm", comment);
    form.append("boxid", id);
    form.append("userid", localStorage.getItem("id"));
    form.append("date", new Date());

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${addcomment}`, form, headers)
      .then((res) => {
        const data = [];

        const sort = res.data.data.sort((a, b) => {
          return new Date(b.dt).getTime() - new Date(a.dt).getTime();
        });

        sort.forEach((val) => {
          data.push({
            author: <Link to="/ladder">{val.username}</Link>,
            content: <p>{val.comment}</p>,
            datetime: (
              <Tooltip title={moment(val.dt).format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment(val.dt).format("YYYY-MM-DD HH:mm:ss")}</span>
              </Tooltip>
            ),
          });
        });
        dispatch({
          type: SET_COMMENT_BOX,
          comment: data,
        });
        setComment("");
      })
      .catch(() => {
        history.push("/_500");
      });
  };
  const onClick = () => {
    const is = isText(
      comment,
      3,
      5000,
      "Текст должен быть больше или равно трем символам",
      "Текст должен быть неболее пяти тысячи символов"
    );
    if(is) {
      console.log(is)
      Fetch()
    }
  }
  return (
    <div
      style={{
        width: "100%",
        padding: 10,
        maxWidth: 1000,
      }}
    >
      <div style={{ width: 700, maxWidth: "100%" }}>
        <Title level={5}>Оставить коментарий</Title>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Avatar
            size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 64, xxl: 64 }}
            icon={<AntDesignOutlined />}
            src={usermain.avatar}
            style={{ border: "1px solid #f0f0f0" }}
          />
          <div
            style={{
              height: 30,
              paddingLeft: 10,
              fontSize: 17,
            }}
          >
            {usermain.username}
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
          }}
        >
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Оставте комментарий"
            style={{ width: "100%" }}
            rows={3}
            showCount
            maxLength={5000}
          />
        </div>
        <Button onClick={() => onClick()}>Оставить комментарий</Button>
      </div>
    </div>
  );
};
