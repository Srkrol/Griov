import React from "react";
import "../App.less";
import "../style/ladder.less";
import "../style/userboxladder.less";

import "../font/font.css";

import { Provider } from "react-redux";
import initializeStore from "../store/init";

import { RoutesApp } from "./routes";

import Authorization from "./session/auth";

const App = () => {
  return (
    <>
      <Provider store={initializeStore}>
        <Authorization>
          <RoutesApp />
        </Authorization>
      </Provider>
    </>
  );
};

export default App;
