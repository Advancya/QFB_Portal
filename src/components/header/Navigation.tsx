import React, { useContext, useEffect, useState } from "react";
import holdingsIcon from "../../images/holdings-icon.svg";
import { Link } from "react-router-dom";
import Requests from "../requests/Requests";
import Transactions from "../transactions/Transactions";
import Inbox from "../Inbox/Inbox";
import AuthOffersLanding from "../AuthOffers/AuthOffersLanding";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { emptyUserInfo, IUserInfo } from "../../Helpers/publicInterfaces";
import { GetUserWelcomeData } from "../../services/cmsService";

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
    }
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
          {local_Strings.WelcomeScreenTitle + " " + (userInfo.customerShortName || "") + " "}
          <i className="fa fa-user-circle-o"></i>
        </Link>&nbsp;
        <a
          className="cursor-pointer"
          href="#"
          title="Click to logout"
          onClick={currentContext.logout}
        >
          <i className="fa fa-sign-out" />
        </a>
      </div>
      <nav className="navbar navbar-expand-md">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <img src={holdingsIcon} className="images-fluid" />
                {local_Strings.navigationItem1}
              </Link>
            </li>

            <Transactions></Transactions>
            <AuthOffersLanding></AuthOffersLanding>
            <Requests></Requests>
            <li className="nav-item">
              <Inbox />
              <a
                className=""
                href="#"
                onClick={() => { }}
              >
                <i className="fa fa-bell unread" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
