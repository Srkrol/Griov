import React, { useEffect } from "react";
import { HeaderClimat } from "../components/climat/header";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { gettopladder } from "../constants/api";
import { SET_LADDER_TOP } from "../constants/store";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Top } from "../components/topladder/topladder";
import { useHistory } from "react-router-dom";

export const Topladder = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("id", id);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${gettopladder}`, form, headers)
      .then((res) => {
        dispatch({
          type: SET_LADDER_TOP,
          top: res.data.data,
        });
      })
      .catch(() => {
        history.push("/_500");
      });
  }, [true]);
  return (
    <>
      <HeaderClimat />
      <Button style={{ margin: 10 }}>
        <Link to="/ladder">
          {" "}
          <ArrowLeftOutlined />
          {"  "}назад
        </Link>
      </Button>
      <Top id={id} />
    </>
  );
};
