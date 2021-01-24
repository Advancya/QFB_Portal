import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";
import { getUserRole } from "../services/apiServices";
import Constant from "../constants/defaultData";
import { GetUserLocalData } from "../Helpers/authHelper";
import { useHistory } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  //const location = useLocation();
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

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
          history.push(`/${currentContext.language}/Admin`);
        } else {
          history.push(`/${currentContext.language}`);
        }
      }, 500);
    }
  }

  return (
    <div id="breadcrumb-section" className="breadcrumb-section">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                onClick={redirectToHome}
                style={{ cursor: "pointer" }}
              >
                {local_Strings.FooterItem1}
              </a>
            </li>
            {/* <li className="breadcrumb-item active" aria-current="page">
              {location.pathname.replace(`/${currentContext.language}/`, "")}
            </li> */}
            {!!pageName && (
              <li className="breadcrumb-item active" aria-current="page">
                {pageName}
              </li>
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
