import React, { useState } from "react";
import { PageHeader, Input, message, Button } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { isText } from "../../action/text";
import AvatarEdit from "./header/avatar";

import { ButtonAuth } from "../buttonAuth";
import { SET_USER_NAME_RE } from "../../constants/store";
import { uploadname } from "../../constants/api";
import { ContentHeader } from "./header/content";
import { useHistory } from "react-router-dom";
import { Money } from "./money";
import { SearchComp } from "./search/search";

import axios from "axios";

const { Search } = Input;

export const HeaderClimat = () => {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState(false);
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  if (user === null) {
    return null;
  }

  const redactUSer = (val) => {
    dispatch({
      type: SET_USER_NAME_RE,
      val: val,
    });
  };

  const Fetch = async () => {
    setState(!state);

    if (state) {
      const is = isText(
        user.username,
        3,
        20,
        "Имя должно быть больше или равно трем символам",
        "Имя должно быть неболее двадцати символов"
      );
      if (is) {
        setBlock(true);
        const localtoken = localStorage.getItem("token");

        const form = new FormData();
        form.append("id", localStorage.getItem("id"));
        form.append("username", user.username);

        const headers = {
          headers: {
            Authorization: "Bearer " + localtoken,
            "Content-Type": "multipart/form-data",
          },
        };

        await axios
          .post(`${uploadname}`, form, headers)
          .then((res) => {
            message.info("Имя изменено");
          })
          .catch(() => {
            message.info("произошла ошибка сохранение имени");
            history.push("/_500");
          });
        setBlock(false);
      } else {
        setState(true);
      }
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        style={{ borderBottom: "1px solid #f0f0f0" }}
        title={<AvatarEdit user={user} />}
        subTitle={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                position: "relative",
                width: 200,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {state ? (
                <>
                  <Input
                    style={{ width: 180 }}
                    value={user.username}
                    placeholder="Basic usage"
                    onChange={(e) => redactUSer(e.target.value)}
                  />
                  <Button
                    disabled={block}
                    loading={block}
                    onClick={() => Fetch()}
                  >
                    <CheckOutlined />
                  </Button>
                </>
              ) : (
                <>
                  {user.username}
                  <Button onClick={() => Fetch()}>
                    <EditOutlined />
                  </Button>
                </>
              )}
            </p>
          </div>
        }
        extra={
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SearchComp />
            <div
              style={{
                width: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonAuth />
              <Money user={user} />
            </div>
          </div>
        }
      >
        <ContentHeader />
      </PageHeader>
    </>
  );
};
