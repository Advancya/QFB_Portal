import React, { useState } from "react";
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
  
  const [item, setDetail] = useState<IRequestDetail>(emptyRequestDetail);
  const [showRequestsListing, setShowRequestsListing] = useState(false);
  const [showRequestsDetails, setshowRequestsDetails] = useState(false);
  const [showNewRequest, setShowNewRequest] = useState(false);

  return (
    <>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={() => setShowRequestsListing(true)}>
          <img src={requestIcon} className="images-fluid" />
          {local_Strings.navigationItem4}
        </a>
      </li>
      <RequestsListing
        showRequestsListingModal={showRequestsListing}
        hideRequestsListingModal={() => setShowRequestsListing(false)}
        showRequestsDetailsModal={(detail: IRequestDetail) => {
          setShowRequestsListing(false);
          setshowRequestsDetails(true);
          setDetail(detail);
        }}
        showNewRequestModal={() => setShowNewRequest(true)}
      />
      {item && !!item.requestCreateDate && (
        <RequestsDetails
          showRequestsDetailsModal={showRequestsDetails}
          hideRequestsDetailsModal={() => setshowRequestsDetails(false)}
          backRequestsListingModal={() => {
            setshowRequestsDetails(false);        
            setShowRequestsListing(true);
          }}
          showNewRequestModal={() => {
            setShowRequestsListing(false);
            setShowNewRequest(true);
          }}
          item={item}
        />
      )}
      <NewRequest
        showNewRequestModal={showNewRequest}
        hideNewRequestModal={() => setShowNewRequest(false)}
        backNewRequestModal={() => {
          setShowNewRequest(false);      
          setShowRequestsListing(true);
        }}
      />
    </>
  );
}

export default Requests;
