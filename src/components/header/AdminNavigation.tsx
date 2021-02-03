import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { emptyUserInfo, IUserInfo } from "../../Helpers/publicInterfaces";
import {
  GetUserWelcomeData,
  GetRmDisplayName,
} from "../../services/cmsService";
import Notfications from "../Notifications/Notifications";
import usericon from "../../images/user-icon.svg";

interface IAdminNavigation {
  userType: {
    Admin: boolean;
    RM: boolean;
    Management: boolean
  };
}

const AdminNavigation: React.FC<IAdminNavigation> = ( props ) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [rmName, setRmName] = React.useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRmName = async () => {
      const res = await GetRmDisplayName(currentContext.selectedCIF);
      if (isMounted) {
        setRmName(res);
      }
    };

    if (!!currentContext.selectedCIF && props.userType.RM) {
      fetchRmName();
    } else if (props.userType.Admin) {
      setRmName(local_Strings.AdminLandingTitle);
    } else if (props.userType.Management) {
      setRmName(local_Strings.ManagementLandingTitle);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language, props.userType]);

  return (
    <div className="col-md-7">
      <div className="welcomeText text-right mt-3  d-flex justify-content-end align-items-center">
        <span>
          {props.userType.RM ? local_Strings.navigationUserMessage + rmName
            : rmName}
          <img className="mx-1" width="20" src={usericon} />
        </span>
        &nbsp;
        <a
          className="cursor-pointer  log-out"
          href="#"
          title="Exit"
          onClick={currentContext.logout}
        >
          <i className="fa fa-sign-out text-sm" />
        </a>
      </div>
    </div>
  );
}

export default AdminNavigation;
