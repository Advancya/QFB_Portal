import React, { useContext, useEffect, useState } from "react";
import AdminCustomHeader from "../../components/header/AdminCustomHeader";
import Footer from "../../components/Footer";
import { AuthContext, User } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import ForgotPasswordStep1 from "../../components/ForgotPassword/ForgotPasswordStep1";
import ForgotPasswordStep2 from "../../components/ForgotPassword/ForgotPasswordStep2";
import ForgotPasswordStep3 from "../../components/ForgotPassword/ForgotPasswordStep3";
import ForgotPasswordStep4 from "../../components/ForgotPassword/ForgotPasswordStep4";

const ResetPassword = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const history = useHistory();

  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");


  const [customerId, setCIF] = useState("");
  const [showForgotPasswordStep1, setShowForgotPasswordStep1] = useState(false);

  const handleCloseForgotPasswordStep1 = () => {
    setShowForgotPasswordStep1(false);
    history.push(`/${currentContext.language}`);
  };
  const handleShowForgotPasswordStep1 = () => {
    setShowForgotPasswordStep1(true);
  };

  const [showForgotPasswordStep2, setShowForgotPasswordStep2] = useState(false);
  const [showForgotPasswordStep3, setShowForgotPasswordStep3] = useState(false);
  const [showForgotPasswordStep4, setShowForgotPasswordStep4] = useState(false);

  const handleCloseForgotPasswordStep2 = () => {
    setShowForgotPasswordStep2(false);
    history.push(`/${currentContext.language}`);
  }

  const handleShowForgotPasswordStep2 = (cif: string) => {
    handleCloseForgotPasswordStep1();
    setShowForgotPasswordStep2(true);
    setCIF(cif);
  };

  const handleBackForgotPasswordStep1 = () => {
    setShowForgotPasswordStep2(false);
    setShowForgotPasswordStep1(true);
  };
  const handleCloseForgotPasswordStep3 = () => {
    setShowForgotPasswordStep3(false);
    history.push(`/${currentContext.language}`);
  }

  const handleShowForgotPasswordStep3 = () => {
    handleCloseForgotPasswordStep2();
    setShowForgotPasswordStep3(true);
    //registerStep1Props.hideForgotPasswordStep1Modal;
  };
  const handleBackForgotPasswordStep2 = () => {
    setShowForgotPasswordStep3(false);

    setShowForgotPasswordStep2(true);
  };
  const handleCloseForgotPasswordStep4 = () => {
    setShowForgotPasswordStep4(false);
    history.push(`/${currentContext.language}`);
  };

  const handleShowForgotPasswordStep4 = () => {
    handleCloseForgotPasswordStep3();
    setShowForgotPasswordStep4(true);
    //registerStep1Props.hideForgotPasswordStep1Modal;
  };
  const handleBackForgotPasswordStep3 = () => {
    setShowForgotPasswordStep4(false);

    setShowForgotPasswordStep3(true);
  };

  useEffect(() => {

    const initialLoadMethod = async () => {
      handleShowForgotPasswordStep1();
    }

    initialLoadMethod();

  }, []);

  return (
    <div>
      <AdminCustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <ForgotPasswordStep1
                showForgotPasswordStep1Modal={showForgotPasswordStep1}
                hideForgotPasswordStep1Modal={handleCloseForgotPasswordStep1}
                showForgotPasswordStep2Modal={handleShowForgotPasswordStep2}
              />
              {customerId && !!customerId &&
                <React.Fragment>
                  <ForgotPasswordStep2
                    showForgotPasswordStep2Modal={showForgotPasswordStep2}
                    hideForgotPasswordStep2Modal={handleCloseForgotPasswordStep2}
                    backForgotPasswordStep1Modal={handleBackForgotPasswordStep1}
                    showForgotPasswordStep3Modal={handleShowForgotPasswordStep3}
                    customerId={customerId}
                  />
                  <ForgotPasswordStep3
                    showForgotPasswordStep3Modal={showForgotPasswordStep3}
                    hideForgotPasswordStep3Modal={handleCloseForgotPasswordStep3}
                    showForgotPasswordStep4Modal={handleShowForgotPasswordStep4}
                    backForgotPasswordStep2Modal={handleBackForgotPasswordStep2}
                    customerId={customerId}
                  />
                  <ForgotPasswordStep4
                    showForgotPasswordStep4Modal={showForgotPasswordStep4}
                    hideForgotPasswordStep4Modal={handleCloseForgotPasswordStep4}
                    backForgotPasswordStep3Modal={handleBackForgotPasswordStep3}
                  />
                </React.Fragment>}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
