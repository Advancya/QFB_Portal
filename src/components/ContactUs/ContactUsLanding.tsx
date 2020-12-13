import React, { useState } from "react";
import inquiriesIcon from "../../images/inquiries-icon.svg";
import ContactUsForm from "./ContactUsForm";
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
          <h3 className="mb-2">For any inquiries contact us</h3>
          <p>Click here to get in touch for any query.</p>
          <a
            href="#"
            onClick={handleShowContactUsForm}
            className="btn btn-sm btn-primary mt-1"
          >
            Contact
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
