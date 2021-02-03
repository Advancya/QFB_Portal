import React, { useContext, useEffect, useState } from "react";
import CustomHeader from "../../components/header/CustomHeader";
import Footer from "../../components/Footer";
import { AuthContext, User } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import ResetPasswordStep1 from "../../components/ResetPassword/ResetPasswordStep1";
import ResetPasswordStep2 from "../../components/ResetPassword/ResetPasswordStep2";
import ResetPasswordStep3 from "../../components/ResetPassword/ResetPasswordStep3";
import ResetPasswordStep4 from "../../components/ResetPassword/ResetPasswordStep4";

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
  const [showResetPasswordStep1, setShowResetPasswordStep1] = useState(false);

  const handleCloseResetPasswordStep1 = () => {
    setShowResetPasswordStep1(false);
  };
  const handleShowResetPasswordStep1 = () => {
    setShowResetPasswordStep1(true);
  };

  const [showResetPasswordStep2, setShowResetPasswordStep2] = useState(false);
  const [showResetPasswordStep3, setShowResetPasswordStep3] = useState(false);
  const [showResetPasswordStep4, setShowResetPasswordStep4] = useState(false);

  const handleCloseResetPasswordStep2 = () => {
    setShowResetPasswordStep2(false);
  }

  const handleShowResetPasswordStep2 = (cif: string) => {
    handleCloseResetPasswordStep1();
    setShowResetPasswordStep2(true);
    setCIF(cif);
  };

  const handleBackResetPasswordStep1 = () => {
    setShowResetPasswordStep2(false);
    setShowResetPasswordStep1(true);
  };
  const handleCloseResetPasswordStep3 = () => {
    setShowResetPasswordStep3(false);
    //history.push(`/${currentContext.language}`);
  }

  const handleShowResetPasswordStep3 = () => {
    handleCloseResetPasswordStep2();
    setShowResetPasswordStep3(true);
    //registerStep1Props.hideResetPasswordStep1;
  };
  const handleBackResetPasswordStep2 = () => {
    setShowResetPasswordStep3(false);

    setShowResetPasswordStep2(true);
  };
  const handleCloseResetPasswordStep4 = () => {
    setShowResetPasswordStep4(false);    
  };

  const handleShowResetPasswordStep4 = () => {
    handleCloseResetPasswordStep3();
    setShowResetPasswordStep4(true);
    //registerStep1Props.hideResetPasswordStep1;
  };
  const handleBackResetPasswordStep3 = () => {
    setShowResetPasswordStep4(false);

    setShowResetPasswordStep3(true);
  };

  useEffect(() => {

    const initialLoadMethod = async () => {
      handleShowResetPasswordStep1();
    }

    initialLoadMethod();

  }, []);

  return (
    <div>
      {/* <CustomHeader /> */}
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <ResetPasswordStep1
                showResetPasswordStep1={showResetPasswordStep1}
                hideResetPasswordStep1={handleCloseResetPasswordStep1}
                showResetPasswordStep2={handleShowResetPasswordStep2}
              />
              {customerId && !!customerId &&
                <React.Fragment>
                  <ResetPasswordStep2
                    showResetPasswordStep2={showResetPasswordStep2}
                    hideResetPasswordStep2={handleCloseResetPasswordStep2}
                    showResetPasswordStep3={handleShowResetPasswordStep3}
                    customerId={customerId}
                  />
                  <ResetPasswordStep3
                    showResetPasswordStep3={showResetPasswordStep3}
                    hideResetPasswordStep3={handleCloseResetPasswordStep3}
                    showResetPasswordStep4={handleShowResetPasswordStep4}
                    customerId={customerId}
                  />
                  <ResetPasswordStep4
                    showResetPasswordStep4={showResetPasswordStep4}
                    hideResetPasswordStep4={handleCloseResetPasswordStep4}
                  />
                </React.Fragment>}

            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default ResetPassword;
