import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Requests from "../requests/Requests";
import Transactions from "../transactions/Transactions";
import Inbox from "../Inbox/Inbox";
import AuthOffersLanding from "../AuthOffers/AuthOffersLanding";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { emptyUserInfo, IUserInfo } from "../../Helpers/publicInterfaces";
import { GetUserWelcomeData } from "../../services/cmsService";
import HoldingsLanding from "../HoldingsLanding";
import usericon from "../../images/user-icon.svg";
import Notfications from "../Notifications/Notifications";
import { Nav, Navbar } from "react-bootstrap";

function Navigation() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [userInfo, setUserInfo] = useState<IUserInfo>(emptyUserInfo);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      GetUserWelcomeData(currentContext.selectedCIF)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setUserInfo(responseData[0] as IUserInfo);
          }
        })
        .catch((e: any) => console.log(e));
    };
    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <div className="col-md-7">
      <div className="welcomeText text-right">
        <Link to={`/${currentContext.language}/Home`} className="">
          {local_Strings.WelcomeScreenTitle +
            " " +
            (userInfo.customerShortName || "") +
            " "}
          <img className="mx-1" width="20" src={usericon} />
        </Link>
        &nbsp;
        <a
          className="cursor-pointer log-out"
          href="#"
          title="Click to logout"
          onClick={currentContext.logout}
        >
          <i className="fa fa-sign-out text-sm" />
        </a>
      </div>
      <Navbar expand="md" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="fa fa-bars"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav">
            <HoldingsLanding />
            <Transactions></Transactions>
            <AuthOffersLanding></AuthOffersLanding>
            <Requests></Requests>
            <li className="nav-item">
              <Inbox />

              <Notfications />
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
