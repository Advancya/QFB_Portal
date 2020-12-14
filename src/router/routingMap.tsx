import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "../pages/Homepage";
import Landing from "../pages/Landing";
import { ToastProvider } from 'react-toast-notifications'
import { AuthContext } from "../providers/AuthProvider";
import Admin from "../pages/Admin";
import ContactUsListing from "../pages/ContactUs/Listing";
import OfferSubscriptionsListing from "../pages/OfferSubscriptions/Listing";

const PageNotFound = () => <div>Page not found</div>;

const RoutingMap = () => {

  const auth = useContext(AuthContext);

  return (
    <ToastProvider>

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
    </ToastProvider>
  );
}

export default RoutingMap;