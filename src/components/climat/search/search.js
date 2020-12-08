import React, { useState } from "react";
import { Input, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { searchuser } from "../../../constants/api";
import { UserComp } from "../../message/user";
import { useSelector } from "react-redux";

export const SearchComp = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.user);

  const Search = (e) => {
    setText(e);
    if (e.length >= 3) {
      const localtoken = localStorage.getItem("token");

      const form = new FormData();
      form.append("text", e);

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${searchuser}`, form, headers)
        .then((res) => {
          console.log(res);
          let data = [];

          res.data.forEach((val) => {
            if (val.id !== user.id) {
              data.push({
                data: val,
                num: false,
              });
            }
          });
          setData(data);
        })
        .catch(() => {});
    }
  };
  console.log(data);
  return (
    <Popover
      style={{ width: 400, background: "white" }}
      placement="bottom"
      content={
        <div
          style={{
            width: "380px",
            fontSize: "17px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {text.length < 3 || data.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                width: "100%",
                margin: 0,
                color: "#595959",
              }}
            >
              Ничего не найдено
            </p>
          ) : (
            data.map((val, index) => {
              return <UserComp key={index} val={val} />;
            })
          )}
        </div>
      }
      trigger="hover"
    >
      <Input
        placeholder="Поиск"
        prefix={<SearchOutlined className="site-form-item-icon" />}
        style={{ margin: 10, width: 300, marginRight: 100 }}
        value={text}
        onChange={(e) => Search(e.target.value)}
      />
    </Popover>
  );
};
