import React, { useContext, useState } from "react";
import facilitiesIcon from "../../../images/facilities-icon.svg";
import FacilitiesListing from "./FacilitiesListing";
import FacilitiesDetails from "./FacilitiesDetails";
import FacilitiesOutstandingPayment from "./FacilitiesOutstandingPayment";
import FacilitiesHistoricalPayment from "./FacilitiesHistoricalPayment";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { ILoanItem } from "../../../Helpers/publicInterfaces";

function Facilities() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [facilityItem, selectItemFromList] = useState<ILoanItem>(null);
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
          <a href="#" className="ib-text" onClick={() => {
            if (!!userPortfolio.totalLoans && userPortfolio.totalLoans !== "0") {
              setShowFacilitiesListing(true)
            }
          }}>
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
        showFacilitiesDetailsModal={(selectedFacility: ILoanItem) => {
          setShowFacilitiesListing(false);
          setshowFacilitiesDetails(true);
          selectItemFromList(selectedFacility);
        }}
      />
      {facilityItem && !!facilityItem.ldReference &&
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
            facilityItem={facilityItem}
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
            facilityItem={facilityItem}
          />
          <FacilitiesHistoricalPayment
            showFacilitiesHistoricalPaymentModal={showFacilitiesHistoricalPayment}
            hideFacilitiesHistoricalPaymentModal={() =>
              setShowFacilitiesHistoricalPayment(false)}
            backFacilitiesHistoricalPaymentModal={() => {
              setShowFacilitiesHistoricalPayment(false);
              setshowFacilitiesDetails(true);
            }}
            facilityItem={facilityItem}
          />
        </React.Fragment>}
    </div>
  );
}

export default Facilities;
