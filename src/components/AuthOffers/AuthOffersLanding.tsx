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
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";

interface iAuthOffersLanding {
  showAuthOffersDetailsModal?: () => void;
}
function AuthOffersLanding(props: iAuthOffersLanding) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [itemID, setDetail] = useState<number>(0);
  const [showAuthOffersListing, setShowAuthOffersListing] = useState(false);

  const handleCloseAuthOffersListing = () => {
    setShowAuthOffersListing(false);
  };
  const handleShowAuthOffersListing = () => {
    setShowAuthOffersListing(true);
  };

  const [showAuthOffersDetails, setshowAuthOffersDetails] = useState(false);

  const handleCloseAuthOffersDetails = () => setshowAuthOffersDetails(false);
  const handleShowAuthOffersDetails = (itemID: number) => {
    handleCloseAuthOffersListing();
    setshowAuthOffersDetails(true);
    setDetail(itemID);
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
          {local_Strings.navigationItem3}
        </a>
      </li>
      <AuthOffersListing
        showAuthOffersListingModal={showAuthOffersListing}
        hideAuthOffersListingModal={handleCloseAuthOffersListing}
        showAuthOffersDetailsModal={handleShowAuthOffersDetails}
      />
      {itemID > 0 &&
      <AuthOffersDetails
        showAuthOffersDetailsModal={showAuthOffersDetails}
        hideAuthOffersDetailsModal={handleCloseAuthOffersDetails}
        backAuthOffersDetailsModal={handleBackAuthOffersDetails}
        showAuthOfferRequestModal={handleShowAuthOfferRequest}
        itemID={itemID}
      />}
      <AuthOfferRequest
        showAuthOfferRequestModal={showAuthOfferRequest}
        hideAuthOfferRequestModal={handleCloseAuthOfferRequest}
        backAuthOffersRequestModal={handleBackAuthOfferRequest}
      />
    </div>
  );
}

export default AuthOffersLanding;
