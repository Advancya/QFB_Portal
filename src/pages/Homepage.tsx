import React, { createContext, useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import AuthCustomHeader from "../components/header/AuthCustomHeader";
import Breadcrumb from "../components/Breadcrumb";
import AssetsLanding from "../components/assets/AssetsLanding";
import LiabilitiesLanding from "../components/liabilities/LiabilitiesLanding";
import TotalNetWorth from "../components/TotalNetWorth";
import RelationManger from "../components/RelationManger";
import InboxLanding from "../components/Inbox/InboxLanding";
import InboxListing from "../components/Inbox/InboxListing";
import InboxDetails from "../components/Inbox/InboxDetails";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { localStrings as local_Strings } from "../translations/localStrings";
import axios from "axios";
import {
  AddAcceptTermsStatusForCustomer,
  GetInboxByCIF,
  GetUserPortfolio,
  GetGuarantees,
} from "../services/cmsService";
import { emptyInboxDetail, IInboxDetail } from "../Helpers/publicInterfaces";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Constant from "../constants/defaultData";
import * as helper from "../Helpers/helper";
import { getUserRole } from "../services/apiServices";
import Swal from "sweetalert2";
import AuthTerms from "../components/Terms/AuthTerms";
import AdminCustomHeader from "../components/header/AdminCustomHeader";

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
  refreshInbox: () => void;
  reloadNotifications: boolean;
  refreshNotifications: (refresh: boolean) => void;
}

export const InboxContext = createContext<IInboxProps>({
  messages: [emptyInboxDetail],
  refreshInbox: () => { },
  reloadNotifications: false,
  refreshNotifications: (refresh) => { },
});

const HomePage = () => {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  const [showAuthTerms, setShowAuthTerms] = useState(false);
  const [messages, setInboxListing] = useState<IInboxDetail[]>([
    emptyInboxDetail,
  ]);
  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);
  const [showInboxListing, setShowInboxListing] = useState(false);
  const [showInboxDetails, setshowInboxDetails] = useState(false);
  const [showViewMoreListing, setViewMoreListing] = useState(false);
  const [showCustomerHeader, setCustomerHeader] = useState(true);

  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  const [userPortfolio, setUserPortfolio] = useState<IUserPortfolio>(
    intialPortfolioData
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialLoadMethod = async () => {
      const termsAccepted = localStorage.getItem(
        Constant.CustomerTermsAcceptanceStorageKey
      );
      if (termsAccepted === null || !termsAccepted) {
        setShowAuthTerms(true);
      }
    };

    initialLoadMethod();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      const role = await getUserRole(currentContext.selectedCIF);

      if (role && !!role) {
        if (!(role && role.name === Constant.Customer)) {
          setLoading(false);
          setCustomerHeader(false);
          if (role.name === Constant.RM) {
            history.push(`/${currentContext.language}/RMLanding`);
          } else if (role.name === Constant.Management) {
            history.push(`/${currentContext.language}/Managment`);
          } else if (role.name === Constant.CMSADMIN) {
            history.push(`/${currentContext.language}/Admin`);
          } else {
            Swal.fire({
              title: local_Strings.SessionTimeOutMessage,
              icon: "warning",
              iconColor: "red",
              html: "Please login again",
              timer: Constant.AlertTimeout,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {
                history.push(`/${currentContext.language}`);
              },
            }).then((result) => {
              history.push(`/${currentContext.language}`);
            });
          }
        }
      } else {
        setCustomerHeader(true);
        /*
        Swal.fire({
          title:
            "Unable to fetch role for the customer - " +
            currentContext.selectedCIF,
          icon: "warning",
          iconColor: "red",
          timer: Constant.AlertTimeout,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            window.location.reload();
          },
        }).then((result) => {
          window.location.reload();
        });
        */

      }

      const requestOne = GetUserPortfolio(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestTwo = GetGuarantees(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestThree = GetInboxByCIF(currentContext.selectedCIF);

      axios
        .all([requestOne, requestTwo, requestThree])
        .then((responseData: any) => {
          if (isMounted && responseData && responseData.length > 0) {
            if (responseData[0] && responseData[0][0]) {
              let _userPortfolio = responseData[0][0] as IUserPortfolio;
              _userPortfolio = {
                ..._userPortfolio,
                totalAssets: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalAssets
                ),
                totalCash: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalCash
                ),
                totalDeposits: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalDeposits
                ),
                totalInvestment: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalInvestment
                ),
                totalLoans: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalLoans
                ),
                networth: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.networth
                ),
                totalLiabilities: helper.ConvertToQfbNumberFormatWithFraction(
                  _userPortfolio.totalLiabilities
                ),
                totalGuarantees: "",
              };

              if (responseData[1].length > 0) {
                setUserPortfolio({
                  ..._userPortfolio,
                  totalGuarantees: helper.ConvertToQfbNumberFormatWithFraction(
                    responseData[1][0].totalGurQAR
                  ),
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
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  const refreshInbox = () => {
    setLoading(true);
    GetInboxByCIF(currentContext.selectedCIF)
      .then((responseData: IInboxDetail[]) => {
        if (responseData && responseData.length > 0) {
          setInboxListing(responseData);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const [reloadNotifications, setReloadNotifications] = useState(false);
  const refreshNotifications = (refresh: boolean) => {
    setReloadNotifications(refresh);
  }

  return (
    <div>
      {!!currentContext.selectedCIF && (
        <InboxContext.Provider value={{ messages, refreshInbox, reloadNotifications, refreshNotifications }}>
          <PortfolioContext.Provider value={userPortfolio}>
            {currentContext.userRole === Constant.Customer ? <AuthCustomHeader /> : <AdminCustomHeader />}
            <Breadcrumb pageName={local_Strings.PortfolioTitle} />
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
            <section id="main-section" className="main-section">
              {!isLoading && (
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
                        <InboxLanding
                          showInboxDetailsModal={(detail: IInboxDetail) => {
                            setshowInboxDetails(true);
                            setViewMoreListing(false);
                            setMessageDetail(detail);
                          }}
                          showInboxListingModal={() => {
                            setShowInboxListing(true);
                            setViewMoreListing(true);
                          }}
                        />
                        <RelationManger />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {messages &&
                messages.length > 0 &&
                !!messages[0].adviceDate && (
                  <InboxListing
                    showInboxListingModal={showInboxListing}
                    hideInboxListingModal={() => setShowInboxListing(false)}
                    showInboxDetailsModal={(detail: IInboxDetail) => {
                      setShowInboxListing(false);
                      setshowInboxDetails(true);
                      setMessageDetail(detail);
                    }}
                  />
                )}
              {message && !!message.adviceDate && (
                <InboxDetails
                  item={message}
                  showInboxDetailsModal={showInboxDetails}
                  hideInboxDetailsModal={() => setshowInboxDetails(false)}
                  backInboxListingModal={() => {
                    if (showViewMoreListing) {
                      setshowInboxDetails(false);
                      setShowInboxListing(true);
                    } else {
                      setshowInboxDetails(false);
                    }
                  }}
                  refreshInboxListing={() => refreshInbox()}
                />
              )}
            </section>
          </PortfolioContext.Provider>
        </InboxContext.Provider>
      )}

      <Footer />

      <AuthTerms
        showAuthTermsModal={showAuthTerms}
        hideAuthTermsModal={async () => setShowAuthTerms(false)}
        showWelcomePage={async () => {
          await AddAcceptTermsStatusForCustomer(currentContext.selectedCIF);
          setShowAuthTerms(false);
        }}
      />
    </div>
  );
};

export default HomePage;
