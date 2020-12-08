import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { host } from "../constants/api";
import {
  SET_FETCH_COMM,
  SET_DEVICE_ADMINPANEL_DEFAULT,
} from "../constants/store";
import { useDispatch, useSelector } from "react-redux";

const socket = io(host, ["websocket", "polling"]);

export const GlobalLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname.slice(0, 5);
  const urlladder = location.pathname.slice(0, 11);

  const fetchcomm = useSelector((state) => state.app.fetchcomm);

  useEffect(() => {
    if (url !== "/chat" || urlladder !== "/chatladder") {
      socket.disconnect();
    }
    if (location.pathname !== "/message") {
      clearInterval(fetchcomm);
      dispatch({
        type: SET_FETCH_COMM,
        fetchcomm: null,
      });
    }
    if (url !== "/adminpanel") {
      dispatch({
        type: SET_DEVICE_ADMINPANEL_DEFAULT,
      });
    }
  }, [url]);

  return <>{children}</>;
};
