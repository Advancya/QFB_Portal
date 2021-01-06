import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";
import ForgotPasswordStep4 from "./ForgotPasswordStep4";

function ForgotPasswordLanding() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const [showForgotPasswordStep1, setShowForgotPasswordStep1] = useState(false);

  const handleCloseForgotPasswordStep1 = () => {
    setShowForgotPasswordStep1(false);
  };
  const handleShowForgotPasswordStep1 = () => {
    setShowForgotPasswordStep1(true);
  };

  const [showForgotPasswordStep2, setShowForgotPasswordStep2] = useState(false);
  const [showForgotPasswordStep3, setShowForgotPasswordStep3] = useState(false);
  const [showForgotPasswordStep4, setShowForgotPasswordStep4] = useState(false);

  const handleCloseForgotPasswordStep2 = () =>
    setShowForgotPasswordStep2(false);
  const handleShowForgotPasswordStep2 = () => {
    handleCloseForgotPasswordStep1();
    setShowForgotPasswordStep2(true);
    //registerStep1Props.hideForgotPasswordStep1Modal;
  };
  const handleBackForgotPasswordStep1 = () => {
    setShowForgotPasswordStep2(false);

    setShowForgotPasswordStep1(true);
  };
  const handleCloseForgotPasswordStep3 = () =>
    setShowForgotPasswordStep3(false);
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
  return (
    <>
      <div className="form-group text-right">
        <a
          href="#"
          className="forgotLink"
          onClick={handleShowForgotPasswordStep1}
        >
          {local_Strings.LoginWithCredentialsPasswordResetLabel}
        </a>
      </div>
      <ForgotPasswordStep1
        showForgotPasswordStep1Modal={showForgotPasswordStep1}
        hideForgotPasswordStep1Modal={handleCloseForgotPasswordStep1}
        showForgotPasswordStep2Modal={handleShowForgotPasswordStep2}
      ></ForgotPasswordStep1>
      <ForgotPasswordStep2
        showForgotPasswordStep2Modal={showForgotPasswordStep2}
        hideForgotPasswordStep2Modal={handleCloseForgotPasswordStep2}
        backForgotPasswordStep1Modal={handleBackForgotPasswordStep1}
        showForgotPasswordStep3Modal={handleShowForgotPasswordStep3}
      ></ForgotPasswordStep2>
      <ForgotPasswordStep3
        showForgotPasswordStep3Modal={showForgotPasswordStep3}
        hideForgotPasswordStep3Modal={handleCloseForgotPasswordStep3}
        showForgotPasswordStep4Modal={handleShowForgotPasswordStep4}
        backForgotPasswordStep2Modal={handleBackForgotPasswordStep2}
      ></ForgotPasswordStep3>
      <ForgotPasswordStep4
        showForgotPasswordStep4Modal={showForgotPasswordStep4}
        hideForgotPasswordStep4Modal={handleCloseForgotPasswordStep4}
        backForgotPasswordStep3Modal={handleBackForgotPasswordStep3}
      ></ForgotPasswordStep4>
    </>
  );
}

export default ForgotPasswordLanding;
