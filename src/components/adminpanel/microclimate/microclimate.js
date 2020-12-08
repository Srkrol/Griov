import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { gettobe } from "../../../constants/api";
import { SET_TAB_GET } from "../../../constants/store";
import { Table, Button } from "antd";

import { rowtable } from "./row";
import { redactarr } from "./redactarr";

const columns = [
  {
    title: "дата",
    dataIndex: "date",
    key: "date",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "время",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "параметр",
    dataIndex: "param",
    key: "param",
  },
  {
    title: "значение",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "",
    dataIndex: "save",
    key: "save",
  },
];

export const Microclimate = ({ dev }) => {
  const dispatch = useDispatch();

  const tabs = useSelector((state) => state.tabs.table);

  let [table, setTable] = useState([]);
  let [dateredact, setDataRedact] = useState([]);

  useEffect(() => {
    if (dev.length !== 0) {
      const localtoken = localStorage.getItem("token");
      const box_id = localStorage.getItem("boxid");

      let config = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .get(`${gettobe}?box_id=${box_id}`, config)
        .then((res) => {
          dispatch({
            type: SET_TAB_GET,
            table: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dev]);

  useEffect(() => {
    let arr = [];
    dateredact.map((val) => {
      const res = rowtable(
        val,
        val.index,
        val.every,
        val.value,
        dateredact,
        setDataRedact
      );
      arr.push(res);
    });

    setTable(arr);
  }, [dateredact]);

  useEffect(() => {
    let arrredact = [];

    let index = 0;
    dev.forEach((val) => {
      if (val.hw_type !== "light") {
        const { on, off } = redactarr(val, index, tabs);

        arrredact.push(on);
        arrredact.push(off);
        index = index + 2;
      }
    });
    setDataRedact(arrredact);
  }, [tabs]);

  return (
    <>
      <Table columns={columns} dataSource={table}  style={{maxWidth: 750}}  />
    </>
  );
};

/**
 * 
 *   const dispatch = useDispatch()
  const localtoken = localStorage.getItem("token");
  const box_id = localStorage.getItem("boxid");
  
  let config = {
    headers: {
      Authorization: "Bearer " + localtoken,
      "Content-Type": "multipart/form-data",
    },
  };

  const Fetch = () => {
    axios
      .get(`${gettobe}?box_id=${box_id}`, config)
      .then((res) => {
        dispatch({
          type: SET_TAB_GET,
          table: res.data
        })
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    Fetch();
  }, [true]);
 */
