import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Error404 } from "../../pages/_404";
import { Error500 } from "../../pages/_500";

import { routeSetting } from "../../setting/routes";

import { GlobalLayout } from "../global";

export const RoutesApp = () => {
  return (
    <Router>
      <GlobalLayout>
        <Switch>
          {routeSetting.map((val, index) => {
            return (
              <Route key={index} path={val.link} exact>
                <val.layout>
                  <val.component />
                </val.layout>
              </Route>
            );
          })}
          <Route path="/_404" exact>
            <Error404 />
          </Route>
          <Route path="/_500" exact>
            <Error500 />
          </Route>
          <Redirect to={routeSetting[0].link} />
        </Switch>
      </GlobalLayout>
    </Router>
  );
};
