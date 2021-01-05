import React, { useContext, useState } from "react";
import productsICon from "../../images/products-offers-icon.svg";
import AuthOffersDetails from "./AuthOffersDetails";
import AuthOffersListing from "./AuthOffersListing";
import { useHistory } from "react-router-dom";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import offerIcon from "../../images/offer-icon.svg";
import AuthOfferRequest from "./AuthOfferRequest";

interface iAuthOffersLanding {
  showAuthOffersDetailsModal?: () => void;
}
function AuthOffersLanding(props: iAuthOffersLanding) {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [itemID, setDetail] = useState<number>(0);
  const [showAuthOffersListing, setShowAuthOffersListing] = useState(false);
  const [showAuthOffersDetails, setshowAuthOffersDetails] = useState(false);
  const [showAuthOfferRequest, setshowAuthOfferRequest] = useState(false);

  return (
    <div>
      <li className="nav-item">
        <a className="nav-link" onClick={() => setShowAuthOffersListing(true)} href="#">
          <img src={offerIcon} className="images-fluid" />
          {local_Strings.navigationItem3}
        </a>
      </li>
      <AuthOffersListing
        showAuthOffersListingModal={showAuthOffersListing}
        hideAuthOffersListingModal={() => setShowAuthOffersListing(false)}
        showAuthOffersDetailsModal={(itemID: number) => {
          setShowAuthOffersListing(false);
          setshowAuthOffersDetails(true);
          setDetail(itemID);
        }}
      />
      {itemID > 0 &&
        <React.Fragment>
          <AuthOffersDetails
            showAuthOffersDetailsModal={showAuthOffersDetails}
            hideAuthOffersDetailsModal={() => setshowAuthOffersDetails(false)}
            backAuthOffersDetailsModal={() => {
              setshowAuthOffersDetails(false);
              setShowAuthOffersListing(true);
            }}
            showAuthOfferRequestModal={() => {
              setshowAuthOffersDetails(false);
              setshowAuthOfferRequest(true);
            }}
            itemID={itemID}
          />
          <AuthOfferRequest
            showAuthOfferRequestModal={showAuthOfferRequest}
            hideAuthOfferRequestModal={() => setshowAuthOfferRequest(false)}
            backAuthOffersRequestModal={() => {
              setshowAuthOfferRequest(false);
              setshowAuthOffersDetails(true);
            }}
            sendToAuthOffersRequestListing={() => {
              setshowAuthOfferRequest(false);
              setShowAuthOffersListing(true);
            }}
            itemID={itemID}
          />
        </React.Fragment>
      }
    </div>
  );
}

export default AuthOffersLanding;
