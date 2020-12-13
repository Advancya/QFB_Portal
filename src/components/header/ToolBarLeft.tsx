import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";

function ToolBarLeft() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const switchLanguage = (language: string) => {
    if (language === "en") {
      history.replace(
        window.location.pathname.replace(helper.getLanguage(), "ar")
      );
      auth.changeLanguage("ar");
    } else {
      history.replace(
        window.location.pathname.replace(helper.getLanguage(), "en")
      );
      auth.changeLanguage("en");
    }
  };

  return (
    <div className="col-md-3 text-left">
      <div className="topLeftIcons">
        <Link to={`/${auth.language}/Home`}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <a
          onClick={() => switchLanguage(auth.language)}
          style={{ cursor: "pointer" }}
        >
          {auth.language === "en"
            ? local_Strings.arabic
            : local_Strings.english}
        </a>
        <Link to={`/${auth.language}/Admin`}>
          <FontAwesomeIcon icon={faCogs} />
        </Link>
      </div>
    </div>
  );
}

export default ToolBarLeft;
