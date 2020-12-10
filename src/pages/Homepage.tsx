import React, { createContext, useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import AuthCustomHeader from "../components/header/AuthCustomHeader";
import Breadcrumb from "../components/Breadcrumb";
import AssetsLanding from "../components/assets/AssetsLanding";
import LiabilitiesLanding from "../components/liabilities/LiabilitiesLanding";
import TotalNetWorth from "../components/TotalNetWorth";
import RelationManger from "../components/RelationManger";
import InboxLanding from "../components/Inbox/InboxLanding";
import InboxDetails from "../components/Inbox/InboxDetails";
import InboxListing from "../components/Inbox/InboxListing";
import { AuthContext, User } from "../providers/AuthProvider";
import axios from "axios";
import { GetUserLocalData } from "../Helpers/authHelper";
import { GetUserPortfolio, GetGuarantees } from "../services/cmsService";

export interface IUserPortfolio {
  customerCode: string;
  customerName: string;
  totalAssets: number;
  totalCash: number;
  totalDeposits: number;
  totalInvestment: number;
  totalLoans: number;
  networth: number;
  totalLiabilities: number;
  totalGuarantees: number;
}

const intialPortfolioData = {
  customerCode: "",
  customerName: "",
  totalAssets: 0,
  totalCash: 0,
  totalDeposits: 0,
  totalInvestment: 0,
  totalLoans: 0,
  networth: 0,
  totalLiabilities: 0,
  totalGuarantees: 0,
};

export const PortfolioContext = createContext<IUserPortfolio>(intialPortfolioData);

function HomePage() {
  const currentContext = useContext(AuthContext);
  const [showInboxDetails, setshowInboxDetails] = useState(false);
  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = () => {
    setshowInboxDetails(true);
    //inboxListingProps.hideInboxListingModal;
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);
  };

  const [userPortfolio, setUserPortfolio] = useState<IUserPortfolio>(intialPortfolioData);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const requestOne = GetUserPortfolio(
      currentContext.cif,
      currentContext.userSettings.currency
    );
    const requestTwo = GetGuarantees(
      currentContext.cif,
      currentContext.userSettings.currency
    );
    axios
      .all([requestOne, requestTwo])
      .then((responseData: any) => {
        if (isMounted && responseData && responseData.length > 0) {
          if (responseData[1].length > 0) {
            setUserPortfolio({
              ...responseData[0][0],
              totalGuarantees: responseData[1][0].totalGurQAR,
            });
          } else {
            setUserPortfolio(responseData[0][0]);
          }
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <div>
      <AuthCustomHeader />
      <Breadcrumb />
      <section id="main-section" className="main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <PortfolioContext.Provider value={userPortfolio}>
                <div className="main-container">
                  <AssetsLanding />
                  <div className="row">
                    <LiabilitiesLanding />
                    <TotalNetWorth />
                  </div>
                </div>
              </PortfolioContext.Provider>
            </div>
            <div className="col-lg-3">
              <div className="sidebar-container">
                <InboxLanding showInboxDetailsModal={handleShowInboxDetails} />
                <RelationManger />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <InboxDetails
        showInboxDetailsModal={showInboxDetails}
        hideInboxDetailsModal={handleCloseInboxDetails}
        backInboxListingModal={handleBackInboxDetails}
      ></InboxDetails>
    </div>
  );
}

export default HomePage;
