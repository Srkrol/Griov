import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { roleNoAuth, routeSetting } from "../setting/routes";

export const BlockRoute = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.role.roleActive);
  const history = useHistory();
  
  if (user === null) {
    return null;
  }
  if (roleNoAuth.role !== role) {
    history.push(routeSetting[1].link);
  }

  return <></>;
};
