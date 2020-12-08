import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import history from "./utils/history";

import { COMETCHAT_CONSTANTS } from "./constants/chat";
import { CometChat } from "@cometchat-pro/chat";

const appID = COMETCHAT_CONSTANTS.APP_ID;
const region = COMETCHAT_CONSTANTS.REGION;

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

CometChat.init(appID, appSetting).then(
  () => {
    if (CometChat.setSource) {
      CometChat.setSource("ui-kit", "web", "reactjs");
    }
    console.log("Чат подключен успешно !!!");
  },
  (error) => {
    console.log("Ошибка подключение чата:", error);
  }
);

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      audience={config.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
