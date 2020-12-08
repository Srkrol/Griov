import React from "react";
import moment from "moment";
import { DatePicker, ConfigProvider } from "antd";
import ruRU from "antd/lib/locale-provider/ru_RU";
import "moment/locale/ru";

export const TimeTab = ({ val, index, dateredact, setDataRedact }) => {
  const onChange = (date) => {
    const d = date === null ? new Date() : date._d;
    const copy = [...dateredact];
    copy[index].time = d;
    setDataRedact(copy);
  };

  return (
    <ConfigProvider locale={ruRU}>
      <DatePicker
        picker="time"
        onChange={onChange}
        style={{ width: 80 }}
        defaultValue={moment(val, "HH:mm")}
        format={"HH:mm"}
      />
    </ConfigProvider>
  );
};
