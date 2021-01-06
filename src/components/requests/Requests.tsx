import React, { useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import RequestsListing from "./RequestsListing";
import RequestsDetails from "./RequestsDetails";
import NewRequest from "./NewRequest";
import requestIcon from "../../images/request-icon.svg";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  emptyRequestDetail,
  IRequestDetail,
} from "../../Helpers/publicInterfaces";

function Requests() {
  const [showRequestsListing, setShowRequestsListing] = useState(false);
  const [item, setDetail] = useState<IRequestDetail>(emptyRequestDetail);

  const handleCloseRequestsListing = () => {
    setShowRequestsListing(false);
  };
  const handleShowRequestsListing = () => {
    setShowRequestsListing(true);
  };

  const [showRequestsDetails, setshowRequestsDetails] = useState(false);

  const handleCloseRequestsDetails = () => setshowRequestsDetails(false);
  const handleShowRequestsDetails = (detail: IRequestDetail) => {
    handleCloseRequestsListing();
    setshowRequestsDetails(true);
    setDetail(detail);
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
    <>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={handleShowRequestsListing}>
          <img src={requestIcon} className="images-fluid" />
          {local_Strings.navigationItem4}
        </a>
      </li>
      <RequestsListing
        showRequestsListingModal={showRequestsListing}
        hideRequestsListingModal={handleCloseRequestsListing}
        showRequestsDetailsModal={handleShowRequestsDetails}
        showNewRequestModal={handleShowNewRequest}
      />
      {item && !!item.requestCreateDate && (
        <RequestsDetails
          showRequestsDetailsModal={showRequestsDetails}
          hideRequestsDetailsModal={handleCloseRequestsDetails}
          backRequestsListingModal={handleBackRequestsDetails}
          showNewRequestModal={handleShowNewRequest}
          item={item}
        />
      )}
      <NewRequest
        showNewRequestModal={showNewRequest}
        hideNewRequestModal={handleCloseNewRequest}
        backNewRequestModal={handleBackNewRequest}
      />
    </>
  );
}

export default Requests;
