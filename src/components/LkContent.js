import React from "react";
import "../Lk.css";
import { Divider } from "antd";

import LkRatedPhoto from "./adminpanel/LkRatedPhoto/LkRatedPhoto";
import LkCurrentPhoto from "./adminpanel/LkCurrentPhoto/LkCurrentPhoto";

import { History } from "./adminpanel/history/history";
import { Microclimate } from "./adminpanel/microclimate/microclimate";

import { useSelector } from "react-redux";
import LkManual from "./adminpanel/manual/lkmanual";
import { Passive } from "./adminpanel/passive/passive";
import { Interval } from "./adminpanel/LkCurrentValues/curvalues";
import { Device } from "./adminpanel/device/device";

const LkContent = () => {
  const device = useSelector((state) => state.device.dev);

  let onoff = null;
  let passive = null;
  let interval = null;
  let cam = null;

  device.forEach((val) => {
    if (val.variant === "onoff") {
      onoff = val;
    }
    if (val.variant === "passive") {
      passive = val;
    }
    if (val.variant === "interval") {
      interval = val;
    }
    if (val.variant === "cam") {
      cam = val;
    }
  });

  return (
    <div className="lkcontent">
      <div className="lkcontent_conteiner">
        <div style={{width: '100%'}}>
          <h1>Микроклимат</h1>
          <Microclimate dev={onoff.device} />
        </div>

        <div style={{ margin: 10 }}>
          <h1>Текущее состояние</h1>
          <LkCurrentPhoto cam={cam} />
          <Interval interval={interval} />
          <Passive passive={passive} />
          <div>
            <h1>Ручное управление</h1>
            {onoff.device.map((val, index) => {
              return <LkManual key={index} dev={val} />;
            })}
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <LkRatedPhoto />
        </div>
        <div style={{ margin: 10 }}>
          <Divider orientation="left">История событий</Divider>
          <History />
        </div>
        <div style={{ margin: 10 }}>
          <Divider orientation="left">Оборудование</Divider>
          <Device device={device} />
        </div>
      </div>
    </div>
  );
};

export default LkContent;
