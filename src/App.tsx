import React, { useState } from "react";

import CustomHeader from "./components/header/CustomHeader";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AppBox from "./components/AppBox";
import ProductsAndOffers from "./components/ProductsAndOffers/ProductsAndOffersLanding";
import ContactUsLanding from "./components/ContactUs/ContactUsLanding";

import "./translations/i18n";
import ProductsAndOffersLanding from "./components/ProductsAndOffers/ProductsAndOffersLanding";

function App() {
  const [
    showproductsAndOffersDetails,
    setshowproductsAndOffersDetails,
  ] = useState(false);
  const [showContactUslanding, setshowContactUslanding] = useState(false);

  const handleCloseproductsAndOffersDetails = () =>
    setshowproductsAndOffersDetails(false);
  const handleShowproductsAndOffersDetails = () => {
    setshowproductsAndOffersDetails(true);

    //inboxListingProps.hideproductsAndOffersListingModal;
  };
  const handleShowcontactUsLanding = () => {
    setshowContactUslanding(true);

    //inboxListingProps.hideproductsAndOffersListingModal;
  };
  const handleBackproductsAndOffersDetails = () => {
    setshowproductsAndOffersDetails(false);
  };

  return (
    <div>
      <CustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <Login setUserCredentials={() => {}} showOTP={() => {}} />
              <div className="col-lg-4 col-container flex-column">
                <Register />
                <AppBox />
              </div>
              <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                <ProductsAndOffersLanding
                  showProductsAndOffersDetailsModal={
                    handleShowproductsAndOffersDetails
                  }
                />
                <ContactUsLanding
                  showContactUsDetailsModal={handleShowcontactUsLanding}
                />
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
