import React from "react";
import { useSelector } from "react-redux";
import { Content } from "./content";
import "./boxs.less";

import { Back } from '../ui/back'
import { Plants } from './plants/plants'
import { AddButton } from './add'

export const Boxs = () => {
  const boxs = useSelector((state) => state.createbox.boxs);
  return (
    <div className="create-box-conteiner-page">
      <Back url={'/userclimat'}/>
      <Plants />
      {boxs.map((val, index) => {
        return (
          <div key={index} className="create-box-conteiner-box">
            <h2 className="header">{val.box[0].label}</h2>
            <div className="content">
              <Content box={val.box} act={val.active} index={index} />
            </div>
          </div>
        );
      })}
      <AddButton />
    </div>
  );
};
