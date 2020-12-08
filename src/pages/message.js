import React, { useEffect, useState } from "react";
import { HeaderClimat } from "../components/climat/header";
import axios from "axios";
import { usersmessage } from "../constants/api";

import { useHistory } from "react-router-dom";
import { Comments } from "../components/message/comments";

import { useDispatch, useSelector } from "react-redux";
import { SET_FETCH_COMM } from "../constants/store";

export const Message = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userscomm, setUserComm] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user !== null && isLoad === false) {
      setIsLoad(true);
      Fetch();
      const fetchcomm = window.setInterval(() => {
        Fetch();
      }, 1000 * 10);

      dispatch({
        type: SET_FETCH_COMM,
        fetchcomm: fetchcomm,
      });
    }
  }, [user]);

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("id", user.id);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${usersmessage}`, form, headers)
      .then((res) => {
        setUserComm(res.data);
      })
      .catch(() => {
        history.push("/_500");
      });
  };
  return (
    <>
      <HeaderClimat />
      <Comments userscomm={userscomm} />
    </>
  );
};
