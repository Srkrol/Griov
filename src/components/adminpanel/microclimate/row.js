import React from "react";

import { DateTab } from "./table/date";
import { TimeTab } from "./table/time";
import { ValueTag } from "./table/value";
import { Save } from "./table/save";
import { Status } from "./table/status";

export const rowtable = (
  val,
  index,
  every,
  value,
  dateredact,
  setDataRedact
) => {
  return {
    key: index,
    date: (
      <DateTab
        index={index}
        val={val.date}
        every={every}
        dateredact={dateredact}
        setDataRedact={setDataRedact}
      />
    ),
    time: (
      <TimeTab
        index={index}
        val={val.time}
        dateredact={dateredact}
        setDataRedact={setDataRedact}
      />
    ),
    param: val.label,
    value: (
      <ValueTag
        int={value}
        dateredact={dateredact}
        setDataRedact={setDataRedact}
      />
    ),
    save: (
      <Save
        index={index}
        dateredact={dateredact}
        setDataRedact={setDataRedact}
      />
    ),
    status: (
      <Status
        status={val.status}
        index={index}
        dateredact={dateredact}
        setDataRedact={setDataRedact}
      />
    ),
  };
};
