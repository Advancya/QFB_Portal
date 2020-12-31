import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import DocumentListing from "../Documents/DocumentListing";
import SettingsAnchor from "../Settings/SettingsAnchor";
import SettingsLanding from "../Settings/SettingsLanding";

function ToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <Link to="/HomePage1"> {local_Strings.topBarRightItem1}</Link>
        <DocumentListing />
        <Link to={`/${currentContext.language}/OfferSubscriptions`}>
          Offers Subscriptions
        </Link>
        <SettingsAnchor></SettingsAnchor>
        <Link to={`/${currentContext.language}/ContactUs`}>
          {local_Strings.topBarRightItem4}
        </Link>
      </div>
    </div>
  );
}

export default ToolBarRight;
