import React from "react";

import CustomHeader from "./components/header/CustomHeader";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AppBox from "./components/AppBox";
import ProductsAndOffers from "./components/ProductsAndOffers";
import ContactUs from "./components/ContactUs";

import './translations/i18n';

function App() {
  return (
    <div>
      <CustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <Login />

              <div className="col-lg-4 col-container flex-column">
                <Register />
                <AppBox />
              </div>
              <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                <ProductsAndOffers />

                <ContactUs />
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
