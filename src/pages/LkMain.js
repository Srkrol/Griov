import React, { useEffect } from "react";
import LkContent from "../components/LkContent";

import axios from "axios";
import { adminpanel } from "../constants/api";
import { SET_DEVICE_ADMINPANEL } from "../constants/store";
import { useDispatch } from "react-redux";

import "./../Lk.css";

export const LkMain = () => {

  const dispatch = useDispatch()

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");
    const boxid = localStorage.getItem("boxid");

    const form = new FormData();
    form.append("boxid", boxid);
    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`${adminpanel}`, form, headers)
      .then((res) => {
        dispatch({
          type: SET_DEVICE_ADMINPANEL,
          data: res.data
        })
      })
      .catch((e) => {
        console.log("err");
      });
  };

  useEffect(() => {
    Fetch();
  }, [true]);

  return <LkContent></LkContent>;
};
