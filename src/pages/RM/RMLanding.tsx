import React, { useContext, createContext, useEffect } from "react";
import Footer from "../../components/Footer";
import { emptyCustomer, ICustomer } from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import { getUserRole } from "../../services/apiServices";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import RMRequestsLanding from "../../components/RM/RMRequestsLanding";
import Breadcrumb from "../../components/Breadcrumb";
import ClientPortfolioListing from "../../shared/ClientPortfolioListing";
import AdminCustomHeader from "../../components/header/AdminCustomHeader";
import { GetUserLocalData } from "../../Helpers/authHelper";

export const CustomerListContext = createContext<ICustomer[]>([emptyCustomer]);

const RMLanding = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
    : document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  currentContext.language === "en"
    ? document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    : document.getElementsByTagName("html")[0].setAttribute("lang", "ar");

  const history = useHistory();

  useEffect(() => {

    const initialLoadMethod = async () => {
      
    }

    initialLoadMethod();

  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {

      const userData = await GetUserLocalData();
      if (userData) {
        const role = await getUserRole(userData.customerId);
        if (!(role && role.name === Constant.RM)) {
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
      } else {
        history.push(`/${currentContext.language}`);
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  return (
    <div>
      <AdminCustomHeader />
      <div className="my-2">
        <Breadcrumb pageName={local_Strings.BreadcrumbLandingTitle} />
      </div>
      {!!currentContext.selectedCIF &&
        <div>
          <div id="main-section" className="main-section pt-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-container flex-column">
                  <RMRequestsLanding />
                </div>
                <div className="col-lg-6 col-container flex-column loginSideBoxBoxes">
                  <ClientPortfolioListing />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
}

export default RMLanding;
