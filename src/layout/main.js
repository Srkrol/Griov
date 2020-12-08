import React from "react";
import { BlockRoute } from "./blockNoAuth";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "../components/loader";
import Fade from "react-reveal/Fade";
export const Main = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <Fade>
      <BlockRoute />
      {children}
    </Fade>
  );
};

/**
 *     {
      isLoading?
        <Loader />
      :
       null
    }
 */
