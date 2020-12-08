import React from "react";
import { Menu } from "antd";

import { ButtonAuth } from './buttonAuth'

const Header = () => {
  
    return (
      <Menu mode="horizontal" theme="light">
        <Menu.Item>
          <b>
            {" "}
            <font color="#f200ff">Gr</font>
          </b>
          <font color="#00b828">box</font> and Grcenter
        </Menu.Item>
        <Menu.Item>Autonom GrBox</Menu.Item>
        <Menu.Item>
          <ButtonAuth />
        </Menu.Item>
      </Menu>
    )
}

export default Header
