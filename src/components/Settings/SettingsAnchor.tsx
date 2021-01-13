import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import ChangeCurrency from "./ChangeCurrency";
import SettingsLanding from "./SettingsLanding";
import ChangePassword from "./ChangePassword";
import ChangeOTPMethod from "./ChangeOTPMethod";
import ChangeLanguage from "./ChangeLanguage";

interface iSettingsAnchor {
  showSettingsAnchorModal?: boolean;
  hideSettingsAnchorModal?: () => void;
}
function SettingsAnchor(settingsAnchorProps: iSettingsAnchor) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showSettingsLanding, setShowSettingsLanding] = useState(false);

  const handleCloseSettingsLanding = () => {
    setShowSettingsLanding(false);
  };
  const handleShowSettingsLanding = () => {
    setShowSettingsLanding(true);
  };

  const [showChangeCurrency, setShowChangeCurrency] = useState(false);

  const handleCloseChangeCurrency = () => {
    setShowChangeCurrency(false);
  };
  const handleShowChangeCurrency = () => {
    handleCloseSettingsLanding();
    setShowChangeCurrency(true);
  };
  const handleBackSettingsLanding = () => {
    handleCloseChangeCurrency();
    handleCloseChangePassword();
    handleCloseChangeOTPMethod();
    handleCloseChangeLanguage();
    handleShowSettingsLanding();
  };

  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };
  const handleShowChangePassword = () => {
    handleCloseSettingsLanding();
    setShowChangePassword(true);
  };
  const [showChangeOTPMethod, setShowChangeOTPMethod] = useState(false);

  const handleCloseChangeOTPMethod = () => {
    setShowChangeOTPMethod(false);
  };
  const handleShowChangeOTPMethod = () => {
    handleCloseSettingsLanding();
    setShowChangeOTPMethod(true);
  };
  const [showChangeLanguage, setShowChangeLanguage] = useState(false);

  const handleCloseChangeLanguage = () => {
    setShowChangeLanguage(false);
  };
  const handleShowChangeLanguage = () => {
    handleCloseSettingsLanding();
    setShowChangeLanguage(true);
  };

  return (
    <span>
      <a href="#" onClick={handleShowSettingsLanding}>
        {local_Strings.topBarRightItem3}
      </a>
      <SettingsLanding
        showSettingsLandingModal={showSettingsLanding}
        hideSettingsLandingModal={handleCloseSettingsLanding}
        showChangeCurrencyModal={handleShowChangeCurrency}
        showChangePasswordModal={handleShowChangePassword}
        showChangeOTPMethodModal={handleShowChangeOTPMethod}
        showChangeLanguageModal={handleShowChangeLanguage}
      ></SettingsLanding>
      <ChangeCurrency
        showChangeCurrencyModal={showChangeCurrency}
        hideChangeCurrencyModal={handleCloseChangeCurrency}
        backSettingsLandingModal={handleBackSettingsLanding}
      ></ChangeCurrency>
      <ChangePassword
        showChangePasswordModal={showChangePassword}
        hideChangePasswordModal={handleCloseChangePassword}
        backSettingsLandingModal={handleBackSettingsLanding}
      ></ChangePassword>
      <ChangeOTPMethod
        showChangeOTPMethodModal={showChangeOTPMethod}
        hideChangeOTPMethodModal={handleCloseChangeOTPMethod}
        backSettingsLandingModal={handleBackSettingsLanding}
      ></ChangeOTPMethod>
      <ChangeLanguage
        showChangeLanguageModal={showChangeLanguage}
        hideChangeLanguageModal={handleCloseChangeLanguage}
        backSettingsLandingModal={handleBackSettingsLanding}
      ></ChangeLanguage>
    </span>
  );
}

export default SettingsAnchor;
