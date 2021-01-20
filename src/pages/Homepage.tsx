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
}

export const InboxContext = createContext<IInboxProps>({
  messages: [emptyInboxDetail],
  refreshInbox: () => {},
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
        } else {
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
                    totalAssets: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalAssets
                    ),
                    totalCash: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalCash
                    ),
                    totalDeposits: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalDeposits
                    ),
                    totalInvestment: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalInvestment
                    ),
                    totalLoans: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalLoans
                    ),
                    networth: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.networth
                    ),
                    totalLiabilities: helper.ConvertToQfbNumberFormat(
                      _userPortfolio.totalLiabilities
                    ),
                    totalGuarantees: "",
                  };

                  if (responseData[1].length > 0) {
                    setUserPortfolio({
                      ..._userPortfolio,
                      totalGuarantees: helper.ConvertToQfbNumberFormat(
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
        }
      } else {
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
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    } else {
      setTimeout(() => {
        if (!currentContext.selectedCIF) {
          history.push(`/${currentContext.language}`);
        }
      }, 5000);
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

  return (
    <div>
      {!!currentContext.selectedCIF && (
        <InboxContext.Provider value={{ messages, refreshInbox }}>
          <PortfolioContext.Provider value={userPortfolio}>
            <AuthCustomHeader />
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
                          showInboxDetailsModal={handleShowInboxDetails}
                        />
                        <RelationManger />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {message && !!message.adviceDate && (
                <InboxDetails
                  item={message}
                  showInboxDetailsModal={showInboxDetails}
                  hideInboxDetailsModal={handleCloseInboxDetails}
                  backInboxListingModal={handleBackInboxDetails}
                />
              )}
            </section>
          </PortfolioContext.Provider>
        </InboxContext.Provider>
      )}

      <Footer />

      <AuthTerms
        showAuthTermsModal={showAuthTerms}
        hideAuthTermsModal={async () => {
          await AddAcceptTermsStatusForCustomer(currentContext.selectedCIF);
          setShowAuthTerms(false);
        }}
      />
    </div>
  );
};

export default HomePage;
