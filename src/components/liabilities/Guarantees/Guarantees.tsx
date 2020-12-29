import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import guarantiesIcon from "../../../images/guaranties-icon.svg";
import GuaranteesListing from "./GuaranteesListing";
import GuaranteesDetails from "./GuaranteesDetails";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";

function Guarantees() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);

  const [showGuaranteesListing, setShowGuaranteesListing] = useState(false);

  const handleCloseGuaranteesListing = () => {
    setShowGuaranteesListing(false);
  };
  const handleShowGuaranteesListing = () => {
    setShowGuaranteesListing(true);
  };

  const [showGuaranteesDetails, setshowGuaranteesDetails] = useState(false);

  const handleCloseGuaranteesDetails = () => setshowGuaranteesDetails(false);
  const handleShowGuaranteesDetails = () => {
    handleCloseGuaranteesListing();
    setshowGuaranteesDetails(true);
    //guaranteesListingProps.hideGuaranteesListingModal;
  };
  const handleBackGuaranteesDetails = () => {
    setshowGuaranteesDetails(false);

    setShowGuaranteesListing(true);
  };

  return (
    <div>
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={guarantiesIcon} className="img-fluid" />
          </div>
          <a href="#" className="ib-text" onClick={handleShowGuaranteesListing}>
            <h4>{local_Strings.PortfolioLiabilitiesOption2}</h4>
            <h5>
              {(userPortfolio.totalGuarantees || "0") +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>
      <GuaranteesListing
        showGuaranteesListingModal={showGuaranteesListing}
        hideGuaranteesListingModal={handleCloseGuaranteesListing}
        showGuaranteesDetailsModal={handleShowGuaranteesDetails}
      />
      <GuaranteesDetails
        showGuaranteesDetailsModal={showGuaranteesDetails}
        hideGuaranteesDetailsModal={handleCloseGuaranteesDetails}
        backGuaranteesListingModal={handleBackGuaranteesDetails}
      />
    </div>
  );
}

export default Guarantees;
