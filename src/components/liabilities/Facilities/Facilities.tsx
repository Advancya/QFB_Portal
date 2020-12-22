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

  const [showFacilitiesListing, setShowFacilitiesListing] = useState(false);

  const handleCloseFacilitiesListing = () => {
    setShowFacilitiesListing(false);
  };
  const handleShowFacilitiesListing = () => {
    setShowFacilitiesListing(true);
  };

  const [showFacilitiesDetails, setshowFacilitiesDetails] = useState(false);

  const handleCloseFacilitiesDetails = () => setshowFacilitiesDetails(false);
  const handleShowFacilitiesDetails = () => {
    handleCloseFacilitiesListing();
    setshowFacilitiesDetails(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackFacilitiesDetails = () => {
    setshowFacilitiesDetails(false);

    setShowFacilitiesListing(true);
  };

  const [
    showFacilitiesOutstandingPayment,
    setShowFacilitiesOutstandingPayment,
  ] = useState(false);

  const handleCloseFacilitiesOutstandingPayment = () =>
    setShowFacilitiesOutstandingPayment(false);
  const handleShowFacilitiesOutstandingPayment = () => {
    handleCloseFacilitiesDetails();
    setShowFacilitiesOutstandingPayment(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackFacilitiesOutstandingPayment = () => {
    setShowFacilitiesOutstandingPayment(false);

    setshowFacilitiesDetails(true);
  };

  const [
    showFacilitiesHistoricalPayment,
    setShowFacilitiesHistoricalPayment,
  ] = useState(false);

  const handleCloseFacilitiesHistoricalPayment = () =>
    setShowFacilitiesOutstandingPayment(false);
  const handleShowFacilitiesHistoricalPayment = () => {
    handleCloseFacilitiesDetails();
    setShowFacilitiesHistoricalPayment(true);
    //cashListingProps.hideCashListingModal;
  };
  const handleBackFacilitiesHistoricalPayment = () => {
    setShowFacilitiesHistoricalPayment(false);

    setshowFacilitiesDetails(true);
  };
  return (
    <div>
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={facilitiesIcon} className="img-fluid" />
          </div>
          <a href="#" className="ib-text" onClick={handleShowFacilitiesListing}>
            <h4>{local_Strings.PortfolioLiabilitiesOption1}</h4>
            <h5>
              {(userPortfolio.totalLoans || "0") +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>

      <FacilitiesListing
        showFacilitiesListingModal={showFacilitiesListing}
        hideFacilitiesListingModal={handleCloseFacilitiesListing}
        showFacilitiesDetailsModal={handleShowFacilitiesDetails}
      ></FacilitiesListing>
      <FacilitiesDetails
        showFacilitiesDetailsModal={showFacilitiesDetails}
        hideFacilitiesDetailsModal={handleCloseFacilitiesDetails}
        backFacilitiesListingModal={handleBackFacilitiesDetails}
        showFacilitiesOutstandingPayment={
          handleShowFacilitiesOutstandingPayment
        }
        showFacilitiesHistoricalPayment={handleShowFacilitiesHistoricalPayment}
      ></FacilitiesDetails>
      <FacilitiesOutstandingPayment
        showFacilitiesOutstandingPaymentModal={showFacilitiesOutstandingPayment}
        hideFacilitiesOutstandingPaymentModal={
          handleCloseFacilitiesOutstandingPayment
        }
        backFacilitiesOutstandingPaymentModal={
          handleBackFacilitiesOutstandingPayment
        }
      ></FacilitiesOutstandingPayment>
      <FacilitiesHistoricalPayment
        showFacilitiesHistoricalPaymentModal={showFacilitiesHistoricalPayment}
        hideFacilitiesHistoricalPaymentModal={
          handleCloseFacilitiesHistoricalPayment
        }
        backFacilitiesHistoricalPaymentModal={
          handleBackFacilitiesHistoricalPayment
        }
      ></FacilitiesHistoricalPayment>
    </div>
  );
}

export default Facilities;
