import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";

function ToolBarRight() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <div className="col-md-9">
      <div className="topRight">
        <Link to="/HomePage1">Standard Settlements Instructions</Link>
        <Link to="/HomePage2">Documents Listing</Link>
        <Link to={`/${auth.language}/OfferSubscriptions`}>Settings</Link>
        <Link to={`/${auth.language}/ContactUs`}>Contact Us</Link>
      </div>
    </div>
  );
}

export default ToolBarRight;
