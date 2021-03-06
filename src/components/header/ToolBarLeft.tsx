import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import * as helper from "../../Helpers/helper";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserRole } from "../../services/apiServices";
import Constant from "../../constants/defaultData";
import { GetUserLocalData } from "../../Helpers/authHelper";
import { Link } from "react-router-dom";

function ToolBarLeft() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showLanguageSwither, setShowLanguageSwither] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData && userData.customerId) {
        const role = await getUserRole(userData.customerId);
        if (role && role.name === Constant.CMSADMIN) {
          setShowLanguageSwither(false);
        } else {
          setShowLanguageSwither(true);
        }
      }
    };

    initialLoadMethod();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

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

  const redirectToHome = async () => {
    const userData = await GetUserLocalData();
    if (userData) {
      const role = await getUserRole(userData.customerId);
      currentContext.selectCIF(userData.customerId);
      setTimeout(() => {
        if (role && role.name === Constant.Customer) {
          history.push(`/${currentContext.language}/Home`);
        } else if (role && role.name === Constant.RM) {
          history.push(`/${currentContext.language}/RMLanding`);
        } else if (role && role.name === Constant.Management) {
          history.push(`/${currentContext.language}/Managment`);
        } else if (role.name === Constant.CMSADMIN) {
          history.push(`/en/Admin`);
        } else {
          history.push(`/${currentContext.language}`);
        }
      }, 500);
    }
  };

  return (
    <div className="col-md-3">
      <div className="topLeftIcons">
        <a href="#" onClick={redirectToHome}>
          <FontAwesomeIcon icon={faHome} />
        </a>
        {showLanguageSwither && (
          <a href="#" onClick={() => switchLanguage(currentContext.language)}>
            {currentContext.language === "en"
              ? local_Strings.arabic
              : local_Strings.english}
          </a>
        )}
      </div>
    </div>
  );
}

export default ToolBarLeft;
