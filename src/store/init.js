import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { role } from "./reducer/app/role";
import { user } from "./reducer/app/user";
import { infobox } from "./reducer/app/infobox";
import { tabs } from "./reducer/app/tabs";
import { addevent } from "./reducer/app/addevent";
import { createbox } from "./reducer/app/createbox";
import { ladder } from "./reducer/app/ladder";
import { ladderuser } from "./reducer/app/ladderuser";
import { comm } from "./reducer/app/comment";
import { app } from "./reducer/app/app";
import { device } from "./reducer/app/adminpanel";
import { chat } from "./reducer/app/chat";

const rootReducer = combineReducers({
  role,
  user,
  infobox,
  tabs,
  addevent,
  createbox,
  ladder,
  ladderuser,
  comm,
  app,
  device,
  chat,
});

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
