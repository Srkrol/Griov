import React, { Component } from "react";
import { Col, Row } from "antd";
import box from "./images/GrBox.png";
import mgmnt from "./images/Management.png";

export default class GrBox extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col flex={2}>
            {" "}
            <Row align="center" display="flex">
              <Col>
                <br /> <br />
                GrBox - изолированная система, где Вы полностью управляете
                микроклиматом <br /> <br /> Полный контроль через Интернет GrBox
                открывают дважды - для посева и для сбора урожая
              </Col>
            </Row>
            <Row>
              <Col flex={1} align-content="center">
                <img src={mgmnt} alt="Manage" />{" "}
              </Col>
              <Col flex={1} align="center">
                <br /> <br /> <br /> <br />
                Удобное управление через веб-интерфейс с компьютера или
                мобильных устройств
                <br /> <br />
                Полностью ручное управление, или лишь указание желаемых
                параметров с полным контролем системы автоматикой
              </Col>
            </Row>
          </Col>
          <Col flex={2}>
            {" "}
            <img src={box} alt="GrBox" />{" "}
          </Col>
        </Row>
      </div>
    );
  }
}
