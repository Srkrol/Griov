import React, { useEffect, useState } from "react";
import { Card, Image, Button, Input, message } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { rf } from "../../../constants/api";
import { SET_USER_BOX_NAME_RE } from "../../../constants/store";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FetchName } from "./fetchboxname";
import "./box.less";

export const Box = ({ box, ind }) => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  ////////////// запрос
  const Fetch = () => {
    const localtoken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get(`${rf}?boxid=${box.box_id}`, headers)
      .then((data) => {
        setImage(data.data);
      })
      .catch((e) => {
        setImage("");
      });
  };

  useEffect(() => {
    Fetch(name);
  }, [true]);

  ////////////// переход в админку
  const history = useHistory();
  const RedirectAdminpanel = () => {
    localStorage.setItem("boxid", box.box_id);
    localStorage.setItem("labelid", ind);
    history.push("/adminpanel");
  };

  ////////////// сохранение имени коробки
  const FetchBoxName = async () => {
    setBlock(true);
    const res = await FetchName(name, box.box_id);
    if (res) {
      message.info("GrBox имя сохранено");
      dispatch({
        type: SET_USER_BOX_NAME_RE,
        index: ind,
        name: name,
      });
    }
    setStatus(false);
    setBlock(false);
  };

  useEffect(() => {
    setName(box.box_name);
  }, [box]);

  if (user === null) {
    return <p>Загрузка</p>;
  }

  return (
    <Card
      title={
        <div>
          <div className="boxname_conteiner_redact">
            {status === true ? (
              <>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: 0, fontSize: 16 }}
                  className="input"
                />
                <Button
                  disabled={block}
                  loading={block}
                  onClick={() => FetchBoxName()}
                >
                  <CheckOutlined />
                </Button>
              </>
            ) : (
              <>
                {name}
                <Button onClick={() => setStatus(true)}>
                  <EditOutlined />
                </Button>
              </>
            )}
          </div>
          <div className="boxplant_conteiner_climat">
            <p>{box.plant_name}</p>
          </div>
        </div>
      }
      style={{
        width: 310,
        marginTop: "10px",
        marginRight: "10px",
        background: "white",
        border: "1px solid #f0f0f0",
      }}
      footer={"dsadasdasd"}
    >
      <Image
        width={"100%"}
        height={"auto"}
        src={image ? `data:image/jpeg;base64,${image}` : ""}
      />
      <div
        style={{
          borderTop: "1px solid #bfbfbf",
          marginTop: "10px",
          paddingTop: "10px",
        }}
      >
        <Link to={"/userboxladder/0/" + box.box_id}>
          <Button style={{ marginRight: 5 }}>Комментарии</Button>
        </Link>
        <Button onClick={() => RedirectAdminpanel()}>Админ панель</Button>
      </div>
    </Card>
  );
};
