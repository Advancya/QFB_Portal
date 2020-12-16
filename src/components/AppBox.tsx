import React from "react";
import appstore from "../images/appstore.png";
import playstore from "../images/playstore.png";
import { localStrings as local_Strings } from "../translations/localStrings";

function AppBox() {
  return (
    <div className="box appBox-container min-h-12">
      <div className="box-body">
        <p className="mb-1">{local_Strings.appLandingTitle}</p>
        <h3 className="mb-3">{local_Strings.appLandingInfo}</h3>
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
