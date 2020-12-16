import React from "react";
import QFPlogo from "../../images/qfb-logo-w.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

function Logo() {
  return (
    <div className="col-md-5">
      <div className="logo">
        <img src={QFPlogo} className="images-fluid mx-1" />
        {local_Strings.headerLogoTxt}
      </div>
    </div>
  );
}

export default Logo;
