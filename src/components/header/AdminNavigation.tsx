import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  GetRmDisplayName,
} from "../../services/cmsService";
import usericon from "../../images/user-icon.svg";
import { GetUserLocalData } from "../../Helpers/authHelper";
import Inbox from "../Inbox/Inbox";
import Notfications from "../Notifications/Notifications";
import { Navbar } from "react-bootstrap";

interface IAdminNavigation {
  userType: {
    Admin: boolean;
    RM: boolean;
    Management: boolean
  };
}

const AdminNavigation: React.FC<IAdminNavigation> = (props) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [rmName, setRmName] = React.useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchRmName = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        const res = await GetRmDisplayName(userData.customerId);
        if (isMounted) {
          setRmName(res);
        }
      }
    };

    if (!!currentContext.selectedCIF && props.userType.RM) {
      fetchRmName();
      setShowNotifications(true);
    } else if (props.userType.Admin) {
      setRmName(local_Strings.AdminLandingTitle);
      setShowNotifications(false);
    } else if (props.userType.Management) {
      setRmName(local_Strings.ManagementLandingTitle);
      setShowNotifications(true);
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
      {showNotifications &&
        <Navbar expand="md" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="fa fa-bars"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Inbox />
                <Notfications />
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      }
    </div>
  );
}

export default AdminNavigation;
