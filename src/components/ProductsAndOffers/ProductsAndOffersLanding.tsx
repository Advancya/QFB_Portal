import React, { useContext, useState } from "react";
import productsICon from "../../images/products-offers-icon.svg";
import ProductsAndOffersDetails from "./ProductsAndOffersDetails";
import ProductsAndOffersListing from "./ProductsAndOffersListing";
import { useHistory } from "react-router-dom";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

interface iProductsAndOffersLanding {
  showProductsAndOffersDetailsModal: () => void;
}
function ProductsAndOffersLanding(
  productsAndOffersLandingProps: iProductsAndOffersLanding
) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const [
    showProductsAndOffersListing,
    setShowProductsAndOffersListing,
  ] = useState(false);

  const handleCloseProductsAndOffersListing = () => {
    setShowProductsAndOffersListing(false);
  };
  const handleShowProductsAndOffersListing = () => {
    setShowProductsAndOffersListing(true);
  };

  const [
    showProductsAndOffersDetails,
    setshowProductsAndOffersDetails,
  ] = useState(false);

  const handleCloseProductsAndOffersDetails = () =>
    setshowProductsAndOffersDetails(false);
  const handleShowProductsAndOffersDetails = () => {
    handleCloseProductsAndOffersListing();
    setshowProductsAndOffersDetails(true);
    //productsAndOffersListingProps.hideProductsAndOffersListingModal;
  };
  const handleBackProductsAndOffersDetails = () => {
    setshowProductsAndOffersDetails(false);

    setShowProductsAndOffersListing(true);
  };
  return (
    <div className="inner-box box mt-0 mb-3">
      <div className="d-flex py-2">
        <div className="ib-icon">
          <img src={productsICon} className="img-fluid" />
        </div>
        <div className="ib-text px-4">
          <h3 className="mb-2">PRODUCTS AND OFFERS</h3>
          <p>Click here to see our latest!</p>
          <a
            href="#"
            onClick={handleShowProductsAndOffersListing}
            className="btn btn-sm btn-primary mt-1"
          >
            See More
          </a>
        </div>
      </div>
      <ProductsAndOffersListing
        showProductsAndOffersListingModal={showProductsAndOffersListing}
        hideProductsAndOffersListingModal={handleCloseProductsAndOffersListing}
        showProductsAndOffersDetailsModal={handleShowProductsAndOffersDetails}
      ></ProductsAndOffersListing>
      <ProductsAndOffersDetails
        showProductsAndOffersDetailsModal={showProductsAndOffersDetails}
        hideProductsAndOffersDetailsModal={handleCloseProductsAndOffersDetails}
        backProductsAndOffersListingModal={handleBackProductsAndOffersDetails}
      ></ProductsAndOffersDetails>
    </div>
  );
}

export default ProductsAndOffersLanding;
