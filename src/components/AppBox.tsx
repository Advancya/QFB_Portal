import React from "react";
import appstore from "../images/appstore.png";
import playstore from "../images/playstore.png";

function AppBox() {
  return (
    <div className="box appBox-container min-h-12">
      <div className="box-body">
        <p className="mb-1">
          You can also access your account anytime from your mobile.
        </p>
        <h3 className="mb-3">Download the app Today</h3>
        <p className="m-0">
          <a href="#" className="mx-1">
            <img src={appstore} className="img-fluid appImg" />
          </a>
          <a href="#" className="mx-1">
            <img src={playstore} className="img-fluid appImg" />
          </a>
        </p>
      </div>
    </div>
  );
}

export default AppBox;
