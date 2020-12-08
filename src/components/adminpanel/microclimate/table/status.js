import React from "react";
import { Switch } from "antd";

export const Status = ({ index, dateredact, setDataRedact }) => {
  const onChangeSWitch = (checked) => {
    const status = checked === true ? 100 : 0;
    const copy = [...dateredact];
    copy[index].status = status;
    setDataRedact(copy);
  };
  return (
    <Switch
      onChange={onChangeSWitch}
      style={{ width: 120 }}
      checkedChildren={"активно"}
      unCheckedChildren={""}
      defaultChecked={dateredact[index].status === 100 ? true : false}
    />
  );
};
