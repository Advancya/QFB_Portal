import React, { useState } from "react";

import CustomHeader from "./components/header/CustomHeader";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AppBox from "./components/AppBox";
<<<<<<< HEAD
import ProductsAndOffers from "./components/ProductsAndOffers/ProductsAndOffersLanding";
import ContactUsLanding from "./components/ContactUs/ContactUsLanding";

import "./translations/i18n";
=======
import ContactUs from "./components/ContactUs";
>>>>>>> 1c964b4ff100541feb391bd67e590210088c4dc8
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
              <Login />

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
