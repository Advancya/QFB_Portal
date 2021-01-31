import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import SettingsAnchor from "../Settings/SettingsAnchor";

function ManagementToolBarRight() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <div className="col-md-9">
      <div className="topRight text-right">
        <SettingsAnchor></SettingsAnchor>        
      </div>
    </div>
  );
}

export default ManagementToolBarRight;
