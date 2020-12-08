import React, { useState, useEffect } from "react";
import "./LkManual.css";
import { Switch, message, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { manualswift, manualswitchsheduler } from "../../../constants/api";
import {
  SET_CURENT_PHOTO_ADMINPANEL,
  SET_DEVICE_ADMINPANEL_HISTORY,
} from "../../../constants/store";

const Manual = ({ dev }) => {
  const histoty = useHistory();
  const dispatch = useDispatch();
  const [block, setBlock] = useState(false);

  const [state, setState] = useState({
    status: null,
  });
  /// статус свитча
  const FetchManualSwift = () => {
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    const form = new FormData();
    form.append("boxid", localStorage.getItem("boxid"));
    form.append("type", dev.hw_type);

    axios
      .post(`${manualswift}`, form, headers)
      .then((res) => {
        setState({
          status: res.data,
        });
      })
      .catch((e) => {
        histoty.push("/_500");
      });
  };

  useEffect(() => {
    FetchManualSwift();
  }, [true]);

  // смена статуса и шедулер
  const FetchCooler = async (status) => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("box", localStorage.getItem("boxid"));
    form.append("status", status);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(`${manualswitchsheduler}`, form, headers);

    return res;
  };

  const onChange = async (checked) => {
    setBlock(true);
    const name = dev.hw_type === "sun" ? dev.hw_type + "1" : dev.hw_type;
    if (checked) {
      let action = `_${name}ON`;
      const res = await FetchCooler(action);
      message.info(`${dev.label} вкл.`);
      setBlock(false);
      dispatch({
        type: SET_CURENT_PHOTO_ADMINPANEL,
        photo: res.data,
      });
      dispatch({
        type: SET_DEVICE_ADMINPANEL_HISTORY,
        lkhistory: false,
      });
    } else {
      let action = `_${name}OFF`;
      const res = await FetchCooler(action);
      setBlock(false);
      message.info(`${dev.label} выкл.`);
      dispatch({
        type: SET_CURENT_PHOTO_ADMINPANEL,
        photo: res.data,
      });
      dispatch({
        type: SET_DEVICE_ADMINPANEL_HISTORY,
        lkhistory: false,
      });
    }
  };
  return (
    <div className="lkswitch">
      {state.status === null ? null : (
        <Switch defaultChecked={state.status} onChange={onChange} />
      )}
      <div />
      <h2>
        {dev.label}
        {": "}
        {dev.name}
        {"  "} {block ? <Spin /> : null}
      </h2>
    </div>
  );
};

export default Manual;
