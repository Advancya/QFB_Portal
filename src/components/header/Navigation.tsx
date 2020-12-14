import React from "react";
import holdingsIcon from "../../images/holdings-icon.svg";
import transactionIcon from "../../images/transaction-icon.svg";
import offerIcon from "../../images/offer-icon.svg";
import requestIcon from "../../images/request-icon.svg";
import { Switch, Route, Link } from "react-router-dom";
import Requests from "../requests/Requests";
import Transactions from "../transactions/Transactions";

function Navigation() {
  return (
    <div className="col-md-7">
      <div className="welcomeText text-right">
        <Link to="/" className="">
          Welcome, Ahmed Mohamed Ahmed Mohamed
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
          MENU <span className="fa fa-bars"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <img src={holdingsIcon} className="images-fluid" />
                Holdings
              </Link>
            </li>

            <Transactions></Transactions>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <img src={offerIcon} className="images-fluid" />
                Offers
              </Link>
            </li>

            <Requests></Requests>
            <li className="nav-item">
              <Link className="" to="/">
                <i className="fa fa-envelope"></i>
              </Link>
              <Link className="" to="/">
                <i className="fa fa-bell unread"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
