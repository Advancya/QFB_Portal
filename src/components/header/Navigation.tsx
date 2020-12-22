import React from "react";
import holdingsIcon from "../../images/holdings-icon.svg";
import transactionIcon from "../../images/transaction-icon.svg";
import offerIcon from "../../images/offer-icon.svg";
import requestIcon from "../../images/request-icon.svg";
import { Switch, Route, Link } from "react-router-dom";
import Requests from "../requests/Requests";
import Transactions from "../transactions/Transactions";
import Inbox from "../Inbox/Inbox";
import AuthOffersLanding from "../AuthOffers/AuthOffersLanding";
import { localStrings as local_Strings } from "../../translations/localStrings";

function Navigation() {
  return (
    <div className="col-md-7">
      <div className="welcomeText text-right">
        <Link to="/" className="">
          {local_Strings.navigationUserMessage}
          <i className="fa fa-user-circle-o"></i>
        </Link>
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
                onClick={() => {}}
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
