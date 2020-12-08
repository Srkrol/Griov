import React, { useEffect, useState } from "react";
import LkCurHumid from "./LkCurHumid";
import LkCurTemp from "./LkCurTemp";
import { Divider } from "antd";

import { measuresheduler }  from '../../../constants/api'
import axios from 'axios'

export const Interval = ({ interval }) => {
  let [int, setInt] = useState(null);

  useEffect(() => {
    if (!!interval.device[0]) {
      const name = interval.device[0].name;

      switch (name) {
        case "M1":
          setInt(5);
          break;
        case "M2":
          setInt(5);
          break;
        case "M3":
          setInt(5);
          break;
        case "M4":
          setInt(5);
          break;
        default:
          setInt(5);
      }
    }
  }, [interval]);

  useEffect(() => {
    if (int !== null) {
        const localtoken = localStorage.getItem("token");

        const form = new FormData();
        form.append("boxid", localStorage.getItem('boxid'));
        form.append("int", int);

        const headers = {
          headers: {
            Authorization: "Bearer " + localtoken,
            "Content-Type": "multipart/form-data",
          },
        };
    
        axios
          .post(`${measuresheduler}`, form, headers)
          .then((res) => {
            
          })
          .catch(() => {
  
          });
    }
  }, [int]);

  return (
    <>
      {int === null ? null : (
        <>
          <Divider orientation="left">Обновление раз в {int} часов</Divider>
          <LkCurHumid />
          <LkCurTemp />
        </>
      )}
    </>
  );
};
