import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import RequestsListing from "./RequestsListing";
import RequestsDetails from "./RequestsDetails";
import NewRequest from "./NewRequest";
import requestIcon from "../../images/request-icon.svg";

function Requests() {
  const [showRequestsListing, setShowRequestsListing] = useState(false);

  const handleCloseRequestsListing = () => {
    setShowRequestsListing(false);
  };
  const handleShowRequestsListing = () => {
    setShowRequestsListing(true);
  };

  const [showRequestsDetails, setshowRequestsDetails] = useState(false);

  const handleCloseRequestsDetails = () => setshowRequestsDetails(false);
  const handleShowRequestsDetails = () => {
    handleCloseRequestsListing();
    setshowRequestsDetails(true);
  };
  const handleBackRequestsDetails = () => {
    setshowRequestsDetails(false);

    handleShowRequestsListing();
  };

  const [showNewRequest, setShowNewRequest] = useState(false);

  const handleCloseNewRequest = () => {
    setShowNewRequest(false);
  };
  const handleShowNewRequest = () => {
    handleCloseRequestsListing();
    setShowNewRequest(true);
  };
  const handleBackNewRequest = () => {
    setShowNewRequest(false);

    handleShowRequestsListing();
  };

  return (
    <div>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={handleShowRequestsListing}>
          <img src={requestIcon} className="images-fluid" />
          Requests
        </a>
      </li>
      <RequestsListing
        showRequestsListingModal={showRequestsListing}
        hideRequestsListingModal={handleCloseRequestsListing}
        showRequestsDetailsModal={handleShowRequestsDetails}
        showNewRequestModal={handleShowNewRequest}
      ></RequestsListing>
      <RequestsDetails
        showRequestsDetailsModal={showRequestsDetails}
        hideRequestsDetailsModal={handleCloseRequestsDetails}
        backRequestsListingModal={handleBackRequestsDetails}
        showNewRequestModal={handleShowNewRequest}
      ></RequestsDetails>
      <NewRequest
        showNewRequestModal={showNewRequest}
        hideNewRequestModal={handleCloseNewRequest}
        backNewRequestModal={handleBackNewRequest}
      ></NewRequest>
    </div>
  );
}

export default Requests;
