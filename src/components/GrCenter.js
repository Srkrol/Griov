import React, { Component } from "react";
import "./GrCenter.css";
import laps from "./images/TM_TimeLaps03-09.mp4";

export default class GrCenter extends Component {
  render() {
    return (
      <div className="homeblock">
        <div>
          <br />
          <b>
            <font color="#f200ff">Gr</font>
          </b>
          <font color="#00b828">center</font> - оборудованные помещения для
          работы{" "}
          <b>
            <font color="#f200ff">Gr</font>
          </b>
          <font color="#00b828">box</font> с контролем и управлением из личного
          кабинета
          <br /> <br />
          <video src={laps} width="40%" height="40%" />
        </div>
        <div>
          <img
            src="http://griov.com/images/boxs.png"
            width="50%"
            height="50%"
          />
        </div>
        <div>
          <div className="magentaText">
            Прямо сейчас ты в 4 шагах от урожая:
          </div>
          <div>
            {" "}
            <font color="#00b828">1.</font> Зарегистрируйся и получи свой{" "}
            <b>
              <font color="#f200ff">Gr</font>
            </b>
            <font color="#00b828">box</font> и ежемесячные 100 пиастров <br />
            <font color="#00b828">2.</font> Выбери улучшения и закажи посев
            семян <br />
            <font color="#00b828">3.</font> Управляй режимом роста <br />
            <font color="#00b828">4.</font>{" "}
            <font color="#f200ff">Приедь и сам собери свой урожай!</font>
          </div>
        </div>
      </div>
    );
  }
}
