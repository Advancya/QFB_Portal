import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import SettingsAnchor from "../Settings/SettingsAnchor";
import ContactUsForm from "../ContactUs/ContactUsForm";
import SendPasswordResetLink from "../ResetPassword/SendPasswordResetLink";
import { Link } from "react-router-dom";

function AdminToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showContactUsForm, setShowContactUsForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <SettingsAnchor></SettingsAnchor>
        <Link to={`/${currentContext.language}/ContactUs`}>
          {local_Strings.topBarRightItem4}
        </Link>
        <a href="#" onClick={() => setShowResetPasswordForm(true)}>
          Send Reset Password
        </a>
      </div>
      <ContactUsForm
        showContactUsFormModal={showContactUsForm}
        hideContactUsFormModal={() => setShowContactUsForm(false)}
      />
      <SendPasswordResetLink
        showFormModal={showResetPasswordForm}
        hideFormModal={() => setShowResetPasswordForm(false)}
      />
    </div>
  );
}

export default AdminToolBarRight;
