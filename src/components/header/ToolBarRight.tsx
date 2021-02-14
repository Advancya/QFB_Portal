import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import ContactUsForm from "../ContactUs/ContactUsForm";
import DocumentListing from "../Documents/DocumentListing";
import Faqs from "../Faqs";
import SettingsAnchor from "../Settings/SettingsAnchor";
import StandardSettlement from "../StandardSettlement";

function ToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <StandardSettlement/>
        <DocumentListing />
        {/* <Link to={`/${currentContext.language}/OfferSubscriptions`}>
          Offers Subscriptions
        </Link> */}
        <SettingsAnchor/>
        <Faqs/>        
      </div>      
    </div>
  );
}

export default ToolBarRight;
