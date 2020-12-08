import React, { useState } from "react";
import { Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { settobe } from "../../../../constants/api";

export const Save = ({ index, dateredact, setDataRedact }) => {
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const FetchSave = () => {
    setBlock(true);
    const localtoken = localStorage.getItem("token");
    const boxid = localStorage.getItem("boxid");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    const data = dateredact[index];
    const form = new FormData();
    form.append("date", new Date(data.date));
    form.append("time", new Date(data.time));
    form.append("type", data.param);
    form.append("value", data.value);
    form.append("every", data.every);
    form.append("boxid", boxid);
    form.append("status", data.status);

    axios
      .post(settobe, form, headers)
      .then((res) => {
        setBlock(false);
        message.success("Настройки изменены");
      })
      .catch(() => {
        setBlock(false);
        history.push("/_500");
      });
  };
  return (
    <Button disabled={block} onClick={() => FetchSave()}>
      сохранить
      <EditOutlined />
    </Button>
  );
};
