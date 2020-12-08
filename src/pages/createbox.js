import React, { useEffect } from "react";
import axios from "axios";
import { CREATE_BOX_ADD } from "../constants/store";
import { useDispatch } from "react-redux";
import { choisehwget } from "../constants/api";
import { funksortbox } from "../components/createbox/funksortbox";

import { Boxs } from "../components/createbox/boxs";
import { useHistory } from "react-router-dom";

export const CreateBox = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .get(`${choisehwget}`, headers)
      .then((res) => {
        const result = funksortbox(res.data);
        dispatch({
          type: CREATE_BOX_ADD,
          boxs: result,
        });
      })
      .catch((e) => {
        history.push("/_500");
      });
  };

  useEffect(() => {
    Fetch();
  }, [true]);

  return <Boxs />;
};
