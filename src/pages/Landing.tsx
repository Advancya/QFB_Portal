import React, { useContext, useState } from "react";
import CustomHeader from "../components/header/CustomHeader";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Register from "../components/Register";
import AppBox from "../components/AppBox";
import ProductsAndOffers from "../components/ProductsAndOffers/ProductsAndOffersLanding";
import ContactUsLanding from "../components/ContactUs/ContactUsLanding";
import ProductsAndOffersLanding from "../components/ProductsAndOffers/ProductsAndOffersLanding";
import { useHistory } from "react-router-dom";
import { AuthContext, User } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";

function Landing() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

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
  };
  const handleBackproductsAndOffersDetails = () => {
    setshowproductsAndOffersDetails(false);
  };
  auth.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  auth.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
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

export default Landing;
