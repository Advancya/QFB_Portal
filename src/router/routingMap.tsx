import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "../pages/Homepage";
import Landing from "../pages/Landing";
import { AuthContext } from "../providers/AuthProvider";
import Admin from "../pages/Admin/Admin";
import ContactUsListing from "../pages/Admin/ContactUsListing";
import OfferSubscriptionsListing from "../pages/Admin/OfferSubscriptionsListing";

const PageNotFound = () => <div>Page not found</div>;

const RoutingMap = () => {

  const auth = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path="/">
        {auth.language === "en" ?
          <Redirect to="/en" /> : <Redirect to="/ar" />}
      </Route>
      <Route exact={true} path={["/en", "/ar", "/en/", "/ar/"]}>
        <Landing />
      </Route>
      <Route path={["/en/ContactUs", "/ar/ContactUs"]}>
        <ContactUsListing />
      </Route>
      <Route path={["/en/OfferSubscriptions", "/ar/OfferSubscriptions"]}>
        <OfferSubscriptionsListing />
      </Route>
      <Route path={["/en/Home", "/ar/Home"]}>
        <HomePage />
      </Route>
      <Route path={["/en/Admin", "/ar/Admin"]}>
        <Admin />
      </Route>
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default RoutingMap;