import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";

function ToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <Link to="/HomePage1"> {local_Strings.topBarRightItem1}</Link>
        <Link to="/HomePage2"> {local_Strings.topBarRightItem2}</Link>
        <Link to={`/${currentContext.language}/OfferSubscriptions`}>
          {local_Strings.topBarRightItem3}
        </Link>
        <Link to={`/${currentContext.language}/ContactUs`}>
          {local_Strings.topBarRightItem4}
        </Link>
      </div>
    </div>
  );
}

export default ToolBarRight;
