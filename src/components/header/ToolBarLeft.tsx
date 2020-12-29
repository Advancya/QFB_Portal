import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserRole } from "../../services/apiServices";
import Constant from "../../constants/defaultData";

function ToolBarLeft() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showHomeLink, setHomeLink] = useState<boolean>(false);
  const [showAdminLink, setAdminLink] = useState<boolean>(false);

  const switchLanguage = (language: string) => {
    if (language === "en") {
      history.replace(
        window.location.pathname.replace(helper.getLanguage(), "ar")
      );
      currentContext.changeLanguage("ar");
    } else {
      history.replace(
        window.location.pathname.replace(helper.getLanguage(), "en")
      );
      currentContext.changeLanguage("en");
    }
  };

  useEffect(() => {
    const initialLoadMethod = async () => {
      
      const role = await getUserRole(currentContext.selectedCIF);
      if (role && role !== undefined && (role.name === Constant.RM || role.name === Constant.Management)) {
        setAdminLink(true);
      }
      if (role && role !== undefined) {
        if (role.name === Constant.Customer) {
          setHomeLink(true);
        } else if (role.name === Constant.RM || role.name === Constant.Management) {
          setHomeLink(true);
          setAdminLink(true);
        } else {
          history.push(`/${currentContext.language}`);
        }
      }
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
  }, [currentContext.selectedCIF]);

  return (
    <div className="col-md-3">
      <div className="topLeftIcons">
        {showHomeLink && <Link to={`/${currentContext.language}/Home`}>
          <FontAwesomeIcon icon={faHome} />
        </Link>}
        <a
          onClick={() => switchLanguage(currentContext.language)}
          style={{ cursor: "pointer" }}
        >
          {currentContext.language === "en"
            ? local_Strings.arabic
            : local_Strings.english}
        </a>
        {showAdminLink &&
          <Link to={`/${currentContext.language}/Admin`}>
            <FontAwesomeIcon icon={faCogs} />
          </Link>}
      </div>
    </div>
  );
}

export default ToolBarLeft;
