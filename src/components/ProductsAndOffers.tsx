import React, { useContext, useEffect, useState } from "react";
import productsICon from "../images/products-offers-icon.svg";
import { localStrings as local_Strings } from '../translations/localStrings';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from '../Helpers/helper';
import { AuthContext } from "../providers/AuthProvider";

function ProductsAndOffers() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <div className="inner-box box mt-0 mb-3">
      <div className="d-flex py-2">
        <div className="ib-icon">
          <img src={productsICon} className="img-fluid" />
        </div>
        <div className="ib-text px-4">
          <h3 className="mb-2">PRODUCTS AND OFFERS</h3>
          <p>Click here to see our latest!</p>
          <a href="#" className="btn btn-sm btn-primary mt-1">
            See More
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductsAndOffers;
