import React, { useContext, useState } from "react";
import CustomHeader from "../components/header/CustomHeader";
import Footer from "../components/Footer";
import Login from "../components/Login";
import SubmitOTP from "../components/SubmitOTP";
import Register from "../components/Register";
import AppBox from "../components/AppBox";
import ProductsAndOffers from "../components/ProductsAndOffers/ProductsAndOffersLanding";
import ContactUsLanding from "../components/ContactUs/ContactUsLanding";
import ProductsAndOffersLanding from "../components/ProductsAndOffers/ProductsAndOffersLanding";
import { useHistory } from "react-router-dom";
import { AuthContext, User } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";

const initialUserData = { username: "", password: "", otp: "" };
function Landing() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  const [
    showproductsAndOffersDetails,
    setshowproductsAndOffersDetails,
  ] = useState(false);
  const [showContactUslanding, setshowContactUslanding] = useState(false);

  const handleShowproductsAndOffersDetails = () => {
    setshowproductsAndOffersDetails(true);
  };
  const handleShowcontactUsLanding = () => {
    setshowContactUslanding(true);
  };
  const [loginData, setUserDetail] = useState<User>(initialUserData);
  const [showValidateOTP, setOTPSubmissionRequired] = useState<boolean>(false);
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  return (
    <div>
      <CustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              {showValidateOTP ?
                <SubmitOTP userDetail={loginData} />
                : <Login setUserCredentials={setUserDetail} showOTP={setOTPSubmissionRequired} />}
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
