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

function AdminNavigation() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [userInfo, setUserInfo] = useState<IUserInfo>(emptyUserInfo);
  const [rmName, setRmName] = React.useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRmName = async () => {
      const res = await GetRmDisplayName(currentContext.selectedCIF);
      GetUserWelcomeData(currentContext.selectedCIF)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            setUserInfo(responseData[0] as IUserInfo);
          }
        })
        .catch((e: any) => console.log(e));
      if (isMounted) {
        setRmName(res);
      }
    };

    if (!!currentContext.selectedCIF) {
      fetchRmName();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <div className="col-md-7">
      <div className="welcomeText text-right mt-3  d-flex justify-content-end">
        <span>
          {local_Strings.navigationUserMessage +
            (rmName || userInfo.name) +
            " "}
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
