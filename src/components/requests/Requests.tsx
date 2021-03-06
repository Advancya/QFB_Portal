import React, { useContext, useEffect, useState } from "react";
import RequestsListing from "./RequestsListing";
import RequestsDetails from "./RequestsDetails";
import NewRequest from "./NewRequest";
import OTPValidationForm from "./ValidateOTPForm";
import requestIcon from "../../images/request-icon-white.svg";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  emptyRequestDetail,
  IRequestDetail,
} from "../../Helpers/publicInterfaces";
import { GetRequestsByCIF } from "../../services/cmsService";
import { AuthContext } from "../../providers/AuthProvider";

function Requests() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<IRequestDetail>(emptyRequestDetail);
  const [showRequestsListing, setShowRequestsListing] = useState(false);
  const [showRequestsDetails, setshowRequestsDetails] = useState(false);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [validateOTP, showValidateOTPForm] = useState(false);
  const [requests, setRequestsListData] = useState<IRequestDetail[]>(null);
  const [submittedRequest, setRequestValue] = useState<any>(null);
  
  useEffect(() => {
    if (!!currentContext.selectedCIF) {
      refresRequests();
    }
  }, [currentContext.selectedCIF, currentContext.language]);

  const refresRequests = async () => {
    if (!!currentContext.selectedCIF) {
      setLoading(true);

      const responseData: IRequestDetail[] = await GetRequestsByCIF(
        currentContext.selectedCIF
      );

      if (responseData && responseData.length > 0) {
        setRequestsListData(
          responseData.sort((a, b) => (a.id > b.id ? -1 : 1))
        );
      }

      setLoading(false);
    }
  };

  return (
    <>
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={() => setShowRequestsListing(true)}
        >
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
        showNewRequestModal={async () => {
          setShowRequestsListing(false);
          setShowNewRequest(true);
        }}
        requests={requests}
        reloading={isLoading}
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
        showOTPValidationFormModal={(_values) => {
          setShowNewRequest(false);
          showValidateOTPForm(true);
          setRequestValue(_values);
        }}
      />
      <OTPValidationForm
        showOTPValidationFormModal={validateOTP}
        hideOTPValidationFormModal={() => showValidateOTPForm(false)}
        backOTPValidationFormModal={() => {
          showValidateOTPForm(false);
          setShowNewRequest(true);
        }}
        submittedRequest={submittedRequest}
        refreshRequestsListing={() => {
          refresRequests();
          showValidateOTPForm(false);
          setShowRequestsListing(true);          
        }}
      />
    </>
  );
}

export default Requests;
