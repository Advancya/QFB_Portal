import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
interface iRegisterLanding {
  showRegisterStep1Modal: () => void;
}
function RegisterLanding(registerLandingProps: iRegisterLanding) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const [showRegisterStep1, setShowRegisterStep1] = useState(false);

  const handleCloseRegisterStep1 = () => {
    setShowRegisterStep1(false);
  };
  const handleShowRegisterStep1 = () => {
    setShowRegisterStep1(true);
  };

  const [showRegisterStep2, setShowRegisterStep2] = useState(false);
  const [showRegisterStep3, setShowRegisterStep3] = useState(false);

  const handleCloseRegisterStep2 = () => setShowRegisterStep2(false);
  const handleShowRegisterStep2 = () => {
    handleCloseRegisterStep1();
    setShowRegisterStep2(true);
    //registerStep1Props.hideRegisterStep1Modal;
  };
  const handleBackRegisterStep1 = () => {
    setShowRegisterStep2(false);

    setShowRegisterStep1(true);
  };
  const handleCloseRegisterStep3 = () => setShowRegisterStep3(false);
  const handleShowRegisterStep3 = () => {
    handleCloseRegisterStep2();
    setShowRegisterStep3(true);
    //registerStep1Props.hideRegisterStep1Modal;
  };
  const handleBackRegisterStep2 = () => {
    setShowRegisterStep3(false);

    setShowRegisterStep2(true);
  };
  return (
    <div className="box register-container min-h-12">
      <div className="box-body py-2">
        <h3> {local_Strings.registerLandingTitle}</h3>
        <p className="my-2">{local_Strings.registerLandingInfo}</p>
        <a
          className="btn btn-primary btn-block mt-1"
          href="#"
          onClick={handleShowRegisterStep1}
        >
          {local_Strings.registerLandingButton}
        </a>
      </div>
      <RegisterStep1
        showRegisterStep1Modal={showRegisterStep1}
        hideRegisterStep1Modal={handleCloseRegisterStep1}
        showRegisterStep2Modal={handleShowRegisterStep2}
      ></RegisterStep1>
      <RegisterStep2
        showRegisterStep2Modal={showRegisterStep2}
        hideRegisterStep2Modal={handleCloseRegisterStep2}
        backRegisterStep1Modal={handleBackRegisterStep1}
        showRegisterStep3Modal={handleShowRegisterStep3}
      ></RegisterStep2>
      <RegisterStep3
        showRegisterStep3Modal={showRegisterStep3}
        hideRegisterStep3Modal={handleCloseRegisterStep3}
        backRegisterStep2Modal={handleBackRegisterStep2}
      ></RegisterStep3>
    </div>
  );
}

export default RegisterLanding;
