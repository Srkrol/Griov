import React from "react";
import moment from "moment";
import { DatePicker, Switch, ConfigProvider } from "antd";
import ruRU from "antd/lib/locale-provider/ru_RU";
import "moment/locale/ru";

export const DateTab = ({ index, val, every, dateredact, setDataRedact }) => {
  ///////////////////////////////////////////////////////////
  //////////// блокировка дат ///////////////////////////////
  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  };
  ///////////////////////////////////////////////////////////

  const onChange = (date) => {
    const d = date === null ? new Date() : date._d;
    const copy = [...dateredact];

    copy[index].date = d;
    setDataRedact(copy);
  };

  const onChangeSWitch = (checked) => {
    const every = checked === true ? 100 : 0;
    const copy = [...dateredact];
    copy[index].every = every;
    setDataRedact(copy);
  };

  return (
    <>
      <Switch
        onChange={onChangeSWitch}
        style={{ width: 120 }}
        checkedChildren={"Eжедневно"}
        unCheckedChildren={"Дата"}
        defaultChecked={dateredact[index].every === 100 ? true : false}
      />
      {dateredact[index].every !== 100 ? (
        <ConfigProvider locale={ruRU}>
          <DatePicker
            picker="date"
            onChange={onChange}
            style={{ width: 120 }}
            defaultValue={moment(val, "YYYY/MM/DD")}
            format={"YYYY/MM/DD"}
            onOk={onChange}
          />
        </ConfigProvider>
      ) : null}
    </>
  );
};
