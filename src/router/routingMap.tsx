import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "../pages/Homepage";
import Landing from "../pages/Landing";
import { ToastProvider } from 'react-toast-notifications'
import * as helper from '../Helpers/helper';

const PageNotFound = () => <div>Page not found</div>;

const RoutingMap = () => {

  const language = helper.getLanguage();

  return (
    <ToastProvider>

      <Switch>
        <Route exact path="/">
          {language === "en" ?
            <Redirect to="/en" /> : <Redirect to="/ar" />}
        </Route>
        <Route exact={true} path={["/en", "/ar", "/en/", "/ar/"]}>
          <Landing />
        </Route>

        <Route path={["/en/Home", "/ar/Home"]}>
          <HomePage />
        </Route>

        <Route component={PageNotFound} />
      </Switch>
    </ToastProvider>
  );
}

export default RoutingMap;