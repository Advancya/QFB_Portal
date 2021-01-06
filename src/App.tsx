import React, { useState } from "react";

import CustomHeader from "./components/header/CustomHeader";
import Footer from "./components/Footer";
import Login from "./components/Login";
import RegisterLanding from "./components/Register/RegisterLanding";
import AppBox from "./components/AppBox";
import ContactUsLanding from "./components/ContactUs/ContactUsLanding";
import "./translations/i18n";
import ProductsAndOffersLanding from "./components/ProductsAndOffers/ProductsAndOffersLanding";

function App() {
  
  return (
    <div>
      <CustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <Login setUserCredentials={() => {}} showOTP={() => {}} />
              <div className="col-lg-4 col-container flex-column">
                <RegisterLanding />
                <AppBox />
              </div>
              <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                <ProductsAndOffersLanding />
                <ContactUsLanding />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
