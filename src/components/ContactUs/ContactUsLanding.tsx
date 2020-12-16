import React, { useState } from "react";
import inquiriesIcon from "../../images/inquiries-icon.svg";
import ContactUsForm from "./ContactUsForm";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iContactUsLanding {
  showContactUsDetailsModal: () => void;
}
function ContactUsLanding(contactUsLandingProps: iContactUsLanding) {
  const [showContactUsForm, setShowContactUsForm] = useState(false);

  const handleCloseContactUsForm = () => {
    setShowContactUsForm(false);
  };
  const handleShowContactUsForm = () => {
    setShowContactUsForm(true);
  };

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
            onClick={handleShowContactUsForm}
            className="btn btn-sm btn-primary mt-1"
          >
            {local_Strings.contactUsLandingButton}
          </a>
        </div>
      </div>
      <ContactUsForm
        showContactUsFormModal={showContactUsForm}
        hideContactUsFormModal={handleCloseContactUsForm}
      ></ContactUsForm>
    </div>
  );
}

export default ContactUsLanding;
