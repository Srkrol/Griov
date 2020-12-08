import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, message } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import "./LkBoxname.css";
import { FetchName } from "./fetchboxname";
import { SET_USER_BOX_NAME_RE } from "../../constants/store";

const LkBoxname = ({ colapse }) => {
  const user = useSelector((state) => state.user.user);
  const id = localStorage.getItem("labelid");
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (!!user && id !== "admin") {
      const box = user.box[id];
      setName(box.box_name);
    }
  }, [user]);

  if (id === "admin") {
    return null;
  }

  if (!!user) {
    const FetchBoxName = async () => {
      setBlock(true);
      const res = await FetchName(name, box.box_id);
      if (res) {
        message.info("GrBox имя сохранено");
        dispatch({
          type: SET_USER_BOX_NAME_RE,
          index: id,
          name: name,
        });
      }
      setStatus(false);
      setBlock(false);
    };

    if (colapse) {
      return null;
    }

    const box = user.box[id];

    return (
      <div>
        <h3
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            margin: 0,
          }}
        >
          {status === true ? (
            <>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: 0, fontSize: 16, marginLeft: 10 }}
                className="input"
              />
              <Button
                style={{ marginRight: 10 }}
                disabled={block}
                loading={block}
                onClick={() => FetchBoxName()}
              >
                <CheckOutlined />
              </Button>
            </>
          ) : (
            <>
              <p style={{ fontSize: 18, margin: 0, paddingLeft: 10 }}>{name}</p>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => setStatus(true)}
              >
                <EditOutlined />
              </Button>
            </>
          )}
        </h3>
        <p style={{ padding: 10, fontSize: 18 }}>Рейтинг: {box.last_rang}</p>
        <p style={{ fontSize: 18, margin: 0, paddingLeft: 10 }}>
          {box.plant_name}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default LkBoxname;
