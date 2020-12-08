import React from "react";
import QFPlogo from "../../images/qfb-logo-w.png";

function Logo() {
  return (
    <div className="col-md-5">
      <div className="logo">
        <img src={QFPlogo} className="images-fluid" />
        Online Banking Portal
      </div>
    </div>
  );
}

export default Logo;
