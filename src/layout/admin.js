import React, { useState, useEffect } from "react";

import LkHeader from "../components/LkHeader";
import LkSidebar from "../components/LkSidebar";
import { useHistory } from "react-router-dom";
import { BlockRoute } from "./blockAith";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";
import { roleAuth, routeSetting } from "../setting/routes";

export const Admin = ({ children }) => {
  const role = useSelector((state) => state.role.roleActive);
  const history = useHistory();
  const id = localStorage.getItem("boxid");

  const width = useSelector((state) => state.device.width);

  const [w, setSw] = useState(false);

  useEffect(() => {
    if (width > 100) {
      setTimeout(() => {
        setSw(width);
      }, 200);
    } else {
      setSw(width);
    }
  }, [width]);

  if (!!id === false) {
    history.push(routeSetting[1].link);
  }

  if (roleAuth.role !== role || !!id === false) {
    history.push(routeSetting[0].link);
    return null;
  }

  return (
    <Fade>
      <BlockRoute>
        <div className="lkmain" style={{ gridTemplateColumns: w }}>
          <LkSidebar />
          <LkHeader />
          {children}
        </div>
      </BlockRoute>
    </Fade>
  );
};
