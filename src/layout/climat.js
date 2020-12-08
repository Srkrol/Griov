import React from "react";
import { BlockRoute } from "./blockAith";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { roleAuth, routeSetting } from "../setting/routes";
import Fade from "react-reveal/Fade";
export const Climat = ({ children }) => {
  const role = useSelector((state) => state.role.roleActive);
  const history = useHistory();

  if (roleAuth.role !== role) {
    history.push(routeSetting[0].link);
    return null;
  }

  return (
    <Fade>
      <BlockRoute>{children}</BlockRoute>
    </Fade>
  );
};
