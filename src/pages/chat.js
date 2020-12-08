import React, { useState, useEffect } from "react";
import { HeaderClimat } from "../components/climat/header";
import { useParams, useHistory } from "react-router-dom";
import ChatMessage from "../chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { CBack } from "../components/ui/back-2";
import { Comments } from "../components/message/comments";
import { SET_FETCH_COMM } from "../constants/store";
import { usersmessage } from "../constants/api";
import axios from "axios";

export const Chat = () => {
  const { to, from } = useParams();
  const user = useSelector((state) => state.user.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const [userscomm, setUserComm] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

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
      <CBack />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", display: "flex", maxWidth: 1140 }}>
          <Comments userscomm={userscomm} />
          <ChatMessage socketid={from} to={to} userid={user.id} />
        </div>
      </div>
    </>
  );
};
