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
import { GetUserLocalData } from "../../Helpers/authHelper";

function ToolBarLeft() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [homeLink, setHomeLink] = useState<string>(`/${currentContext.language}`);

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
      const userData = await GetUserLocalData();
      if (userData) {
        const role = await getUserRole(userData.customerId);
        if (role && role.name === Constant.Customer) {
          setHomeLink(`/${currentContext.language}/Home`);
        } else if (role && role.name === Constant.RM) {
          setHomeLink(`/${currentContext.language}/RMLanding`);
        } else if (role && role.name === Constant.Management) {
          setHomeLink(`/${currentContext.language}/Managment`);
        } else {
          setHomeLink(`/${currentContext.language}`);
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
        <Link to={homeLink}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <a
          onClick={() => switchLanguage(currentContext.language)}
          style={{ cursor: "pointer" }}
        >
          {currentContext.language === "en"
            ? local_Strings.arabic
            : local_Strings.english}
        </a>
      </div>
    </div>
  );
}

export default ToolBarLeft;
