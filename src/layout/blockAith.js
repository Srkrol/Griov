import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loader } from "../components/loader";


export const BlockRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const usererr = useSelector((state) => state.user.user);

  const history = useHistory();



  if (user === null) {
    return null;
  }

  if (usererr === false) {
    history.push("/_500");
    return null;
  }
  return (
    <>
      {!user ? <Loader /> : null}
      {children}
    </>
  );
};
