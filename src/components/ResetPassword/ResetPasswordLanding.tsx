import React, { useState } from "react";
import inquiriesIcon from "../../images/inquiries-icon.svg";
import ResetPasswordForm from "./ResetPasswordForm";
import { localStrings as local_Strings } from "../../translations/localStrings";

function ContactUsLanding() {
  const [showContactUsForm, setShowContactUsForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  
  return (
    <div className="inner-box box mt-0">
      <div className="d-flex py-2">
        <div className="ib-icon">
          <img src={inquiriesIcon} className="img-fluid" />
        </div>
        <div className="ib-text px-4">
          <h3 className="mb-2">{local_Strings.contactUsLandingTitle}</h3>
          <p>{local_Strings.contactUsLandingInfo}</p>
          <a
            href="#"
            onClick={() => setShowContactUsForm(true)}
            className="btn btn-sm btn-primary mt-1"
          >
            {local_Strings.contactUsLandingButton}
          </a>
        </div>
      </div>
      <ResetPasswordForm
        showFormModal={showResetPasswordForm}
        hideFormModal={() => setShowResetPasswordForm(false)}
      />
      
    </div>
  );
}

export default ContactUsLanding;
