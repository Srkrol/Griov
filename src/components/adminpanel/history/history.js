import React, { useEffect, useState } from "react";
import { List, Divider } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { history } from "../../../constants/api";
import { SET_DEVICE_ADMINPANEL_HISTORY } from "../../../constants/store";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

export const History = () => {
  const dispatch = useDispatch();
  const historyroute = useHistory();

  const historystatus = useSelector((state) => state.device.lkhistory);

  const [state, setState] = useState({
    history: [],
    active: null,
  });
  const Fetch = () => {
    const localtoken = localStorage.getItem("token");
    const boxid = localStorage.getItem("boxid");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get(`${history}?boxid=${boxid}`, headers)
      .then((res) => {
        setState({
          history: res.data,
          active: res.data[0],
        });
        dispatch({
          type: SET_DEVICE_ADMINPANEL_HISTORY,
          lkhistory: true,
        });
      })
      .catch(() => {
        historyroute.push("/_500");
      });
  };

  useEffect(() => {
    if (historystatus === false) {
      Fetch();
    }
  }, [historystatus]);

  return (
    <>
      <List
        bordered
        style={{
          width: 350,
        }}
        dataSource={state.history}
        renderItem={(item) => (
          <List.Item>
            {moment(item.dt).format("YYYY-MM-DD HH:mm")} {item.param}{" "}
            {item.value === 0 ? "Выкл" : "Вкл"}
          </List.Item>
        )}
      />
    </>
  );
};
