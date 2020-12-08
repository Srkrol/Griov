import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  message,
  Input,
  DatePicker,
  Select,
  ConfigProvider,
  Popover,

} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adduserbox, choisehwplantget } from "../../../constants/api";
import {
  SET_USER_BOX_LOAD,
  CREATE_BOX_ADD_PLANTS,
} from "../../../constants/store";
import { useHistory } from "react-router-dom";
import locale from "antd/es/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import "./add.less";

const { Option } = Select;

export const ButtonAdd = ({ box }) => {
  const dispatch = useDispatch();
  const [block, setBlock] = useState(false);

  const [input, setInput] = useState("");
  const [date, setDate] = useState(null);
  const [plant, setPlant] = useState(null);

  const history = useHistory();

  const plants = useSelector((state) => state.createbox.plants);

  const Fetch = () => {
    if (plant === null) {
      message.info('Выберите растение')
    } else {
      setBlock(true);
      const localtoken = localStorage.getItem("token");

      const params = new URLSearchParams({
        plants: plant,
        boxtype: box.desc_short,
        userId: localStorage.getItem("id"),
        date: date,
        inv_code: input,
      }).toString();

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${adduserbox}?${params}`, "", headers)
        .then((res) => {
          console.log(res.data.mes);
          if (res.data.mes === false) {
            message.info("Этот GrBox уже зарегестрирован");
            setBlock(false);
          } else {
            dispatch({
              type: SET_USER_BOX_LOAD,
              box: res.data,
            });
            setBlock(false);
            history.push("/userclimat");
          }
        })
        .catch(() => {
          history.push("/_500");
        });
    }
  };

  const FetchPlants = () => {
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .get(`${choisehwplantget}`, headers)
      .then((res) => {
        dispatch({
          type: CREATE_BOX_ADD_PLANTS,
          plants: res.data,
        });
      })
      .catch((e) => {
        history.push("/_500");
      });
  };
  useEffect(() => {
    FetchPlants();
  }, [true]);

  const addbox = () => {
    Fetch();
  };

  function onOk(value) {
    setDate(moment(value).format("MMMM Do YYYY, h:mm"));
  }

  function handleChange(value) {
    setPlant(value);
  }
  return (
    <>
      <div className="order_form_conteiner_add">
        <div className="conteiner1">
          <Input
            style={{ width: "100%", marginBottom: 15 }}
            placeholder="Введите инвайт код (необезательно)"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {plants.length === 0 ? null : (
            <>
              <p style={{ lineHeight: "0.5", fontSize: 13 }}>
                <i>Выберите растение</i>
              </p>
              <Select
                style={{ width: "100%", marginBottom: 15 }}
                onChange={handleChange}
              >
                {plants.map((val, index) => {
                  return (
                    <Option key={index} value={val.desc_short}>
                      <Popover
                        style={{ width: 300, background: "white" }}
                        placement="topLeft"
                        content={val.desc_long}
                        trigger="hover"
                      >
                        {val.desc_short}
                      </Popover>
                    </Option>
                  );
                })}
              </Select>
            </>
          )}

          <p style={{ lineHeight: "0.5", fontSize: 13 }}>
            <i>
              При не выборе даты коробка будет установлена в ближайшее время
            </i>
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ConfigProvider locale={locale}>
              <DatePicker
                style={{ width: 170 }}
                showTime
                onOk={onOk}
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
            </ConfigProvider>
            <Button disabled={block} onClick={() => addbox()} type="primary">
              Заказать
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
