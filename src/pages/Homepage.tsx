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
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";
import axios from "axios";
import { GetUserLocalData } from "../Helpers/authHelper";
import { GetInboxByCIF, GetUserPortfolio, GetGuarantees } from "../services/cmsService";
import { emptyInboxDetail, IInboxDetail } from "../Helpers/publicInterfaces";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Constant from "../constants/defaultData";
import * as helper from "../Helpers/helper";

export interface IUserPortfolio {
  customerCode: string;
  customerName: string;
  totalAssets: string;
  totalCash: string;
  totalDeposits: string;
  totalInvestment: string;
  totalLoans: string;
  networth: string;
  totalLiabilities: string;
  totalGuarantees: string;
}

const intialPortfolioData = {
  customerCode: "",
  customerName: "",
  totalAssets: "",
  totalCash: "",
  totalDeposits: "",
  totalInvestment: "",
  totalLoans: "",
  networth: "",
  totalLiabilities: "",
  totalGuarantees: "",
};

export const PortfolioContext = createContext<IUserPortfolio>(
  intialPortfolioData
);

export interface IInboxProps {
  messages: IInboxDetail[];
  refresh: () => void;
}

export const InboxContext = createContext<IInboxProps>(
  {
    messages: [emptyInboxDetail],
    refresh: () => { },
  }
);

function HomePage() {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  const [messages, setInboxListing] = useState<IInboxDetail[]>([emptyInboxDetail]);
  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);

  const [showInboxDetails, setshowInboxDetails] = useState(false);
  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = (detail: IInboxDetail) => {
    setshowInboxDetails(true);
    setMessageDetail(detail);
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);
  };
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  const [userPortfolio, setUserPortfolio] = useState<IUserPortfolio>(
    intialPortfolioData
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);

      const requestOne = GetUserPortfolio(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestTwo = GetGuarantees(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestThree = GetInboxByCIF(
        currentContext.selectedCIF
      );

      axios
        .all([requestOne, requestTwo, requestThree])
        .then((responseData: any) => {
          if (isMounted && responseData && responseData.length > 0) {

            if (responseData[0] && responseData[0][0]) {
              let _userPortfolio = responseData[0][0] as IUserPortfolio;
              _userPortfolio = {
                ..._userPortfolio,
                totalAssets: helper.ConvertToQfbNumberFormat(_userPortfolio.totalAssets),
                totalCash: helper.ConvertToQfbNumberFormat(_userPortfolio.totalCash),
                totalDeposits: helper.ConvertToQfbNumberFormat(_userPortfolio.totalDeposits),
                totalInvestment: helper.ConvertToQfbNumberFormat(_userPortfolio.totalInvestment),
                totalLoans: helper.ConvertToQfbNumberFormat(_userPortfolio.totalLoans),
                networth: helper.ConvertToQfbNumberFormat(_userPortfolio.networth),
                totalLiabilities: helper.ConvertToQfbNumberFormat(_userPortfolio.totalLiabilities),
                totalGuarantees: ""
              };

              if (responseData[1].length > 0) {
                setUserPortfolio({
                  ..._userPortfolio,
                  totalGuarantees: helper.ConvertToQfbNumberFormat(responseData[1][0].totalGurQAR),
                });
              } else {
                setUserPortfolio(_userPortfolio);
              }
            }

            setInboxListing(responseData[2]);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    } else {
      //history.push(`/${currentContext.language}`);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  const refresh = () => {
    console.log("refresh called");

    setLoading(true);
    GetInboxByCIF(currentContext.selectedCIF)
      .then((responseData: IInboxDetail[]) => {
        if (responseData && responseData.length > 0) {
          setInboxListing(responseData);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <InboxContext.Provider value={{ messages, refresh }}>
        <PortfolioContext.Provider value={userPortfolio}>
          <AuthCustomHeader />
          {/* <Breadcrumb pageName={""} /> */}
          <section id="main-section" className="main-section">
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-9">

                  <div className="main-container">
                    <AssetsLanding />
                    <div className="row">
                      <LiabilitiesLanding />
                      <TotalNetWorth />
                    </div>
                  </div>

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
          {message && !!message.adviceDate &&
            <InboxDetails
              item={message}
              showInboxDetailsModal={showInboxDetails}
              hideInboxDetailsModal={handleCloseInboxDetails}
              backInboxListingModal={handleBackInboxDetails}
            />}
        </PortfolioContext.Provider>
      </InboxContext.Provider>
    </div>
  );
}

export default HomePage;
