import React, { useState } from "react";
import "./gallery.less";
import { Button } from "antd";
import axios from "axios";
import { gallerygetcount } from "../../constants/api";

export const ButtonLoad = ({
  image,
  setImg,
  id,
  count,
  setCount,
  setStatus,
}) => {
  const [block, setBlock] = useState(false);

  const Fetch = () => {
    setBlock(true);
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("count", count);
    form.append("id", id);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${gallerygetcount}`, form, headers)
      .then((res) => {
        const copy = [...image];

        res.data.forEach((val) => {
          copy.push(val);
        });
        setImg(copy);
        if (
          res.data.length < 8 ||
          Number(res.data[res.data.length - 1].num) === 1
        ) {
          setStatus(false);
        }
        setCount(count + 1);
        setBlock(false);
      })
      .catch(() => {
        setBlock(false);
      });
  };

  return (
    <Button
      disabled={block}
      loading={block}
      onClick={() => Fetch()}
      style={{
        margin: 10,
      }}
    >
      Загрузить еще
    </Button>
  );
};
