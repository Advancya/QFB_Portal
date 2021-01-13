import React, { useContext, createContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { emptyCustomer, ICustomer } from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { getUserRole } from "../../services/apiServices";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ManagmentRequestsLanding from "../../components/Managment/ManagmentRequestsLanding";
import Breadcrumb from "../../components/Breadcrumb";
import ClientPortfolioListing from "../../shared/ClientPortfolioListing";
import AdminCustomHeader from "../../components/header/AdminCustomHeader";
import { GetUserLocalData } from "../../Helpers/authHelper";
import { AddAcceptTermsStatusForCustomer } from "../../services/cmsService";
import AuthTerms from "../../components/Terms/AuthTerms";

export const CustomerListContext = createContext<ICustomer[]>([emptyCustomer]);

const ManagmentLanding = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  const [showAuthTerms, setShowAuthTerms] = useState(false);
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  const [isLoading, setLoading] = useState<boolean>(false);
  const [customerList, setCustomerList] = useState<ICustomer[]>([
    emptyCustomer,
  ]);
  const [showLeftSection, setLeftSection] = useState({
    ProductsAndOffers: true,
    Notifications: false,
    Offers: false,
    Documents: false,
  });
  const history = useHistory();

  useEffect(() => {

    const initialLoadMethod = async () => {
      const termsAccepted = localStorage.getItem(Constant.CustomerTermsAcceptanceStorageKey);
      if (termsAccepted === null || !termsAccepted) {
        setShowAuthTerms(true);
      }
    }

    initialLoadMethod();

  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      setLoading(true);
      const userData = await GetUserLocalData();
      if (userData) {

        const role = await getUserRole(userData.customerId);
        if (!(role && role.name === Constant.Management)) {
          let timerInterval: any;
          Swal.fire({
            title: local_Strings.AccessDeniedMsgTitle,
            icon: 'warning',
            iconColor: "red",
            text: local_Strings.AccessDeniedMessage,
            timer: Constant.AlertTimeout,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              clearInterval(timerInterval);
              history.push(`/${currentContext.language}`);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              history.push(`/${currentContext.language}`);
            }
          });
        } else {
          if (userData.customerId !== currentContext.selectedCIF) {
            //currentContext.selectCIF(userData.customerId);
          }
        }
      }
      setLoading(false);
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  return (
    <div>
      <AdminCustomHeader />
      <div className="my-2">
        <Breadcrumb pageName={local_Strings.BreadcrumbLandingTitle} />
      </div>
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-container flex-column">
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
                <ManagmentRequestsLanding></ManagmentRequestsLanding>
              </div>
              <div className="col-xl-6 col-container flex-column loginSideBoxBoxes">
                <LoadingOverlay
                  active={isLoading}
                  spinner={
                    <PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />
                  }
                />
                <ClientPortfolioListing />
              </div>
            </div>
          </div>
        </div>
      </div>
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
}

export default ManagmentLanding;
