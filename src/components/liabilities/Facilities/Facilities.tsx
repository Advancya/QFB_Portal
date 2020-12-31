import React, { useContext, useState } from "react";
import facilitiesIcon from "../../../images/facilities-icon.svg";
import { Button, Modal } from "react-bootstrap";
import FacilitiesListing from "./FacilitiesListing";
import FacilitiesDetails from "./FacilitiesDetails";
import FacilitiesOutstandingPayment from "./FacilitiesOutstandingPayment";
import FacilitiesHistoricalPayment from "./FacilitiesHistoricalPayment";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";

function Facilities() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [facilityNumber, setReferenceId] = useState<string>("");
  const [showFacilitiesListing, setShowFacilitiesListing] = useState(false);
  const [showFacilitiesDetails, setshowFacilitiesDetails] = useState(false);
  const [
    showFacilitiesOutstandingPayment,
    setShowFacilitiesOutstandingPayment,
  ] = useState(false);
  const [
    showFacilitiesHistoricalPayment,
    setShowFacilitiesHistoricalPayment,
  ] = useState(false);

  return (
    <div>
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={facilitiesIcon} className="img-fluid" />
          </div>
          <a href="#" className="ib-text" onClick={() => setShowFacilitiesListing(true)}>
            <h4>{local_Strings.PortfolioLiabilitiesOption1}</h4>
            <h5>
              {(userPortfolio.totalLoans || 0)}{
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>

      <FacilitiesListing
        showFacilitiesListingModal={showFacilitiesListing}
        hideFacilitiesListingModal={() =>
          setShowFacilitiesListing(false)
        }
        showFacilitiesDetailsModal={(facilityNumber: string) => {
          setShowFacilitiesListing(false);
          setshowFacilitiesDetails(true);
          setReferenceId(facilityNumber);
        }}
      />
      {facilityNumber && !!facilityNumber &&
        <React.Fragment>
          <FacilitiesDetails
            showFacilitiesDetailsModal={showFacilitiesDetails}
            hideFacilitiesDetailsModal={() => setshowFacilitiesDetails(false)}
            backFacilitiesListingModal={() => {
              setshowFacilitiesDetails(false);
              setShowFacilitiesListing(true);
            }}
            showFacilitiesOutstandingPayment={() => {
              setshowFacilitiesDetails(false);
              setShowFacilitiesOutstandingPayment(true);
            }}
            showFacilitiesHistoricalPayment={() => {
              setshowFacilitiesDetails(false);
              setShowFacilitiesHistoricalPayment(true);
            }}
            facilityNumber={facilityNumber}
          />
          <FacilitiesOutstandingPayment
            showFacilitiesOutstandingPaymentModal={showFacilitiesOutstandingPayment}
            hideFacilitiesOutstandingPaymentModal={() =>
              setShowFacilitiesOutstandingPayment(false)
            }
            backFacilitiesOutstandingPaymentModal={() => {
              setShowFacilitiesOutstandingPayment(false);
              setshowFacilitiesDetails(true);
            }}
            facilityNumber={facilityNumber}
          />
          <FacilitiesHistoricalPayment
            showFacilitiesHistoricalPaymentModal={showFacilitiesHistoricalPayment}
            hideFacilitiesHistoricalPaymentModal={() =>
              setShowFacilitiesHistoricalPayment(false)}
            backFacilitiesHistoricalPaymentModal={() => {
              setShowFacilitiesHistoricalPayment(false);
              setshowFacilitiesDetails(true);
            }}
            facilityNumber={facilityNumber}
          />
        </React.Fragment>}
    </div>
  );
}

export default Facilities;
