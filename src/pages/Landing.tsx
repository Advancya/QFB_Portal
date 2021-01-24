import React, { useContext, useEffect, useState } from "react";
import CustomHeader from "../components/header/CustomHeader";
import Footer from "../components/Footer";
import Login from "../components/Login";
import SubmitOTP from "../components/SubmitOTP";
import RegisterLanding from "../components/Register/RegisterLanding";
import AppBox from "../components/AppBox";
import ContactUsLanding from "../components/ContactUs/ContactUsLanding";
import ProductsAndOffersLanding from "../components/ProductsAndOffers/ProductsAndOffersLanding";
import { AuthContext, User } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";
import Constant from "../constants/defaultData";
import { useHistory } from "react-router-dom";
import { GetUserLocalData } from "../Helpers/authHelper";

const initialUserData = { username: "", password: "", otp: "" };
const Landing = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const history = useHistory();

  const [loginData, setUserDetail] = useState<User>(initialUserData);
  const [showValidateOTP, setOTPSubmissionRequired] = useState<boolean>(false);
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  useEffect(() => {

    const initialLoadMethod = async () => {

      const data = await GetUserLocalData();
      if (data !== null) {
        const role = currentContext.userRole;
        if (!!role) {
          if (role === Constant.Customer) {
            history.push(`/${currentContext.language}/Home`);
          } else if (role === Constant.RM) {
            history.push(`/${currentContext.language}/RMLanding`);
          } else if (role === Constant.Management) {
            history.push(`/${currentContext.language}/Managment`);
          }
        }
      }
    }

    initialLoadMethod();

  }, []);

  return (
    <div>
      <CustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              {showValidateOTP ? (
                <SubmitOTP userDetail={loginData} />
              ) : (
                  <Login
                    setUserCredentials={setUserDetail}
                    showOTP={setOTPSubmissionRequired}
                  />
                )}
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

export default Landing;
