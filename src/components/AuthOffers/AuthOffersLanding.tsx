import React, { useContext, useState } from "react";
import productsICon from "../../images/products-offers-icon.svg";
import AuthOffersDetails from "./AuthOffersDetails";
import AuthOffersListing from "./AuthOffersListing";
import { useHistory } from "react-router-dom";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import offerIcon from "../../images/offer-icon.svg";
import AuthOfferRequest from "./AuthOfferRequest";

interface iAuthOffersLanding {
  showAuthOffersDetailsModal?: () => void;
}
function AuthOffersLanding(authOffersLandingProps: iAuthOffersLanding) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const [showAuthOffersListing, setShowAuthOffersListing] = useState(false);

  const handleCloseAuthOffersListing = () => {
    setShowAuthOffersListing(false);
  };
  const handleShowAuthOffersListing = () => {
    setShowAuthOffersListing(true);
  };

  const [showAuthOffersDetails, setshowAuthOffersDetails] = useState(false);

  const handleCloseAuthOffersDetails = () => setshowAuthOffersDetails(false);
  const handleShowAuthOffersDetails = () => {
    handleCloseAuthOffersListing();
    setshowAuthOffersDetails(true);
    //authOffersListingProps.hideAuthOffersListingModal;
  };
  const handleBackAuthOffersDetails = () => {
    setshowAuthOffersDetails(false);

    setShowAuthOffersListing(true);
  };

  const [showAuthOfferRequest, setshowAuthOfferRequest] = useState(false);

  const handleCloseAuthOfferRequest = () => setshowAuthOfferRequest(false);
  const handleShowAuthOfferRequest = () => {
    handleCloseAuthOffersDetails();
    setshowAuthOfferRequest(true);
    //authOffersListingProps.hideAuthOffersListingModal;
  };
  const handleBackAuthOfferRequest = () => {
    setshowAuthOfferRequest(false);

    setshowAuthOffersDetails(true);
  };
  return (
    <div>
      <li className="nav-item">
        <a className="nav-link" onClick={handleShowAuthOffersListing} href="#">
          <img src={offerIcon} className="images-fluid" />
          Offers
        </a>
      </li>
      <AuthOffersListing
        showAuthOffersListingModal={showAuthOffersListing}
        hideAuthOffersListingModal={handleCloseAuthOffersListing}
        showAuthOffersDetailsModal={handleShowAuthOffersDetails}
      ></AuthOffersListing>
      <AuthOffersDetails
        showAuthOffersDetailsModal={showAuthOffersDetails}
        hideAuthOffersDetailsModal={handleCloseAuthOffersDetails}
        backAuthOffersDetailsModal={handleBackAuthOffersDetails}
        showAuthOfferRequestModal={handleShowAuthOfferRequest}
      ></AuthOffersDetails>
      <AuthOfferRequest
        showAuthOfferRequestModal={showAuthOfferRequest}
        hideAuthOfferRequestModal={handleCloseAuthOfferRequest}
        backAuthOffersRequestModal={handleBackAuthOfferRequest}
      ></AuthOfferRequest>
    </div>
  );
}

export default AuthOffersLanding;
