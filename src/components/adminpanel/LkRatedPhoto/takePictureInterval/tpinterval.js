import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Divider, Switch, DatePicker, ConfigProvider, Button } from "antd";
import ruRU from "antd/lib/locale-provider/ru_RU";
import moment from "moment";
import { sortarr } from "./sort";

import { Fetch } from "./fetch";

export const TpInterval = () => {
  const [date, setDate] = useState(new Date());
  const [switchs, setSwitchs] = useState(false);
  const [status, setStatus] = useState(true);
  const [block, setBlock] = useState(false);

  const tabs = useSelector((state) => state.tabs.table);

  const onOk = (value) => {
    const d = value === null ? new Date() : new Date(value._d);
    setDate(d);
  };

  const onSwitch = (value) => {
    setSwitchs(value);
  };

  const FetchData = async () => {
    setBlock(true);
    await Fetch(date, switchs);

    setBlock(false);
  };

  useEffect(() => {
    if (tabs.length !== 0) {
      const res = sortarr(tabs);
      if (res !== null) {
        setStatus(false);
        setDate(new Date(res.time));
        setSwitchs(res.status === 100 ? true : false);
        setTimeout(() => {
          setStatus(true);
        }, [300]);
      }
    }
  }, [tabs]);

  if (status === false) {
    return null;
  }

  return (
    <>
      <Divider orientation="left">Авто рeйтинговая фотография</Divider>
      <ConfigProvider locale={ruRU}>
        {true ? (
          <DatePicker
            picker="time"
            style={{ width: 190, marginRight: 10 }}
            defaultValue={moment(date)}
            showTime
            onOk={onOk}
            format={"HH:mm"}
          />
        ) : (
          <DatePicker
            style={{ width: 190, marginRight: 10 }}
            defaultValue={moment(date)}
            showTime
            onOk={onOk}
          />
        )}
      </ConfigProvider>
      <Switch
        onChange={onSwitch}
        style={{ width: 120 }}
        checkedChildren="активно"
        unCheckedChildren=""
        defaultChecked={switchs}
      />
      <Button
        disabled={block}
        loading={block}
        style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
        onClick={() => FetchData()}
      >
        Сохранить
      </Button>
    </>
  );
};
