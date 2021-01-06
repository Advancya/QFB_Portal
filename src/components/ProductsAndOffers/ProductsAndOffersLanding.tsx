import React, { useContext, useState } from "react";
import productsICon from "../../images/products-offers-icon.svg";
import ProductsAndOffersDetails from "./ProductsAndOffersDetails";
import ProductsAndOffersListing from "./ProductsAndOffersListing";
import { useHistory } from "react-router-dom";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  emptyProductAndOffersData,
  IProductAndOffersDetail,
} from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";

function ProductsAndOffersLanding() {

  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [item, setItemDetail] = useState<IProductAndOffersDetail>(emptyProductAndOffersData);
  const [
    showProductsAndOffersListing,
    setShowProductsAndOffersListing,
  ] = useState(false);
  const [
    showProductsAndOffersDetails,
    setshowProductsAndOffersDetails,
  ] = useState(false);

  return (
    <div className="inner-box box mt-0 mb-3">
      <div className="d-flex py-2">
        <div className="ib-icon">
          <img src={productsICon} className="img-fluid" />
        </div>
        <div className="ib-text px-4">
          <h3 className="mb-2">{local_Strings.productAndOffersLandingTitle}</h3>
          <p>{local_Strings.productAndOffersLandingInfo}</p>
          <a
            href="#"
            onClick={() => setShowProductsAndOffersListing(true)}
            className="btn btn-sm btn-primary mt-1"
          >
            {local_Strings.productAndOffersLandingButton}
          </a>
        </div>
      </div>
      <ProductsAndOffersListing
        showProductsAndOffersListingModal={showProductsAndOffersListing}
        hideProductsAndOffersListingModal={() => {
          setShowProductsAndOffersListing(false)
        }}
        showProductsAndOffersDetailsModal={(_item: IProductAndOffersDetail) => {
          setShowProductsAndOffersListing(false);
          setshowProductsAndOffersDetails(true);
          setItemDetail(_item);
        }}
      />
      {item && item.id > 0 ?
        <ProductsAndOffersDetails
          item={item}
          showProductsAndOffersDetailsModal={showProductsAndOffersDetails}
          hideProductsAndOffersDetailsModal={() => setshowProductsAndOffersDetails(false)}
          backProductsAndOffersListingModal={() => {
            setshowProductsAndOffersDetails(false);
            setShowProductsAndOffersListing(true);
          }}
        />
        : null}
    </div>
  );
}

export default ProductsAndOffersLanding;
