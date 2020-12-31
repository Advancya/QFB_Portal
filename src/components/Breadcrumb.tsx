import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";

function Breadcrumb({ pageName }) {
  const location = useLocation();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div id="breadcrumb-section" className="breadcrumb-section">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">{local_Strings.FooterItem1}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {location.pathname.replace(`/${currentContext.language}/`, "")}
            </li>
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
