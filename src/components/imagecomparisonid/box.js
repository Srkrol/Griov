import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Image, Input, Button, message } from "antd";
import axios from "axios";
import { imagecomparisonsave } from "../../constants/api";

export const Box = ({ boximglast, className }) => {
  const { name, plant, user } = useParams();
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const Fetch = () => {
    setIsLoad(true);
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    const form = new FormData();
    form.append("id", boximglast.id);
    form.append("box", boximglast.box_id);
    form.append("rating", rating);

    axios
      .post(`${imagecomparisonsave}`, form, headers)
      .then((res) => {
        setIsLoad(false);
        message.success("рейтинг изменен");
        history.goBack();
      })
      .catch((e) => {
        setIsLoad(false);
        message.error("ошибка");
      });
  };

  return (
    <div className={className} style={{ justifyContent: "flex-start" }}>
      {boximglast !== null ? (
        <>
          <Image width={400} src={boximglast.photo} />
          <div style={{ paddingLeft: 20 }}>
            <div>GrBox: {boximglast.box_id}</div>
            <div>Id: {boximglast.id}</div>
            <div>Имя коробки: {name}</div>
            <div>Рейтинг коробки сейчас: {boximglast.rang}</div>
            <div>Растение: {plant}</div>
            <div>Принадлежит: {user}</div>
            <div style={{ display: "flex", paddingTop: 20 }}>
              <Input
                onChange={(e) => setRating(e.target.value)}
                placeholder="установить рейтинг"
                type={"number"}
              />
              <Button
                type="primary"
                onClick={() => Fetch()}
                disabled={isLoad}
                loading={isLoad}
              >
                сохранить
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
