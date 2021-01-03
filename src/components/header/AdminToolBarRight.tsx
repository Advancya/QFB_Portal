import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import DocumentListing from "../Documents/DocumentListing";
import SettingsAnchor from "../Settings/SettingsAnchor";
import SettingsLanding from "../Settings/SettingsLanding";

function AdminToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <SettingsAnchor></SettingsAnchor>
      </div>
    </div>
  );
}

export default AdminToolBarRight;
