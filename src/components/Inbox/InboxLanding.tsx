import React, { useState } from "react";
import InboxDetails from "./InboxDetails";
import InboxListing from "./InboxListing";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iInboxLanding {
  showInboxDetailsModal: () => void;
}
function InboxLanding(inboxLandingProps: iInboxLanding) {
  const [showInboxListing, setShowInboxListing] = useState(false);

  const handleCloseInboxListing = () => {
    setShowInboxListing(false);
  };
  const handleShowInboxListing = () => {
    setShowInboxListing(true);
  };

  const [showInboxDetails, setshowInboxDetails] = useState(false);

  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = () => {
    handleCloseInboxListing();
    setshowInboxDetails(true);
    //inboxListingProps.hideInboxListingModal;
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);

    setShowInboxListing(true);
  };

  return (
    <div className="box pb-0 min-h-16">
      <div className="box-header">
        <h3>{local_Strings.landingInboxTitle}</h3>
        <a href="#" className="viewLink" onClick={handleShowInboxListing}>
          {local_Strings.landingMore} <i className="fa fa-arrow-right"></i>
        </a>
      </div>
      <ul className="box-list">
        <li>
          <a
            href="#"
            className="d-block"
            onClick={inboxLandingProps.showInboxDetailsModal}
          >
            <h4>
              <span className="unread">{local_Strings.dummyTitle}</span>
              <small>02/08/2020 &nbsp; 01:57 pm</small>
            </h4>
            <p>{local_Strings.dummyDesc}</p>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="d-block"
            onClick={inboxLandingProps.showInboxDetailsModal}
          >
            <h4>
              <span className="unread">{local_Strings.dummyTitle}</span>
              <small>02/08/2020 &nbsp; 01:57 pm</small>
            </h4>
            <p>{local_Strings.dummyDesc}</p>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="d-block"
            onClick={inboxLandingProps.showInboxDetailsModal}
          >
            <h4>
              <span className="unread">{local_Strings.dummyTitle}</span>
              <small>02/08/2020 &nbsp; 01:57 pm</small>
            </h4>
            <p>{local_Strings.dummyDesc}</p>
          </a>
        </li>
      </ul>
      <InboxListing
        showInboxListingModal={showInboxListing}
        hideInboxListingModal={handleCloseInboxListing}
        showInboxDetailsModal={handleShowInboxDetails}
      ></InboxListing>
      <InboxDetails
        showInboxDetailsModal={showInboxDetails}
        hideInboxDetailsModal={handleCloseInboxDetails}
        backInboxListingModal={handleBackInboxDetails}
      ></InboxDetails>
    </div>
  );
}

export default InboxLanding;
