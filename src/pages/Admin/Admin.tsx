import React, { useContext, createContext, useEffect, useState } from "react";
import AuthCustomHeader from "../../components/header/AuthCustomHeader";
import Footer from "../../components/Footer";
import ProductsAndOffersListing from "../../components/ProductsAndOffers/Listing";
import NotificationsListing from "../../components/Notifications/Listing";
import OffersListing from "../../components/ManageOffers/Listing";
import DocumentsListing from "../../components/ManageDocuments/Listing";
import { emptyCustomer, ICustomer } from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import { getUserRole } from "../../services/apiServices";
import { GetAllCustomerList } from "../../services/cmsService";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { GetUserLocalData } from "../../Helpers/authHelper";
import Breadcrumb from "../../components/Breadcrumb";
export const CustomerListContext = createContext<ICustomer[]>(
  [emptyCustomer]
);

const Landing = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [customerList, setCustomerList] = useState<ICustomer[]>([emptyCustomer]);
  const [showLeftSection, setLeftSection] = useState({
    ProductsAndOffers: true,
    Notifications: false,
    Offers: false,
    Documents: false,
  });
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        setLoading(true);
        const role = await getUserRole(userData.customerId);

        if (role && !!role) {
          const requestOne = await getUserRole(userData.customerId);
          const requestTwo = await GetAllCustomerList();
          axios
            .all([requestOne, requestTwo])
            .then((responseData: any) => {

              if (responseData && responseData.length > 0 && isMounted) {

                const role = responseData[0];
                if (!(role && role.name === Constant.Management)) {
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
                      if (role.name === Constant.Customer) {
                        history.push(`/${currentContext.language}/Home`);
                      } else if (role.name === Constant.RM) {
                        history.push(`/${currentContext.language}/RMLanding`);
                      } else {
                        history.push(`/${currentContext.language}`);
                      }
                    }
                  }).then((result) => {
                    if (role.name === Constant.Customer) {
                      history.push(`/${currentContext.language}/Home`);
                    } else if (role.name === Constant.RM) {
                      history.push(`/${currentContext.language}/RMLanding`);
                    } else {
                      history.push(`/${currentContext.language}`);
                    }
                  });
                }

                setCustomerList(responseData[1]);
              }
            })
            .catch((e: any) => console.log(e))
            .finally(() => setLoading(false));
        } else {
          Swal.fire({
            title: local_Strings.AccessDeniedMsgTitle,
            icon: 'warning',
            iconColor: "red",
            text: local_Strings.AccessDeniedMessage,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              history.push(`/${currentContext.language}`);
            }
          }).then((result) => {
            history.push(`/${currentContext.language}`);
          });
        }
      } else {
        history.push(`/${currentContext.language}`);
      }
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    } else {
      setTimeout(() => {
        if (!currentContext.selectedCIF) {
          history.push(`/${currentContext.language}`);
        }
      }, 3000);
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, [currentContext.selectedCIF]);

  return (
    <div>
      <AuthCustomHeader />
      <Breadcrumb pageName={local_Strings.BreadcrumbAdminTitle} />
      <div>
        <div id="main-section" className="main-section pt-4">
          {!!currentContext.selectedCIF &&
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-8 col-container flex-column">
                  <LoadingOverlay
                    active={isLoading}
                    spinner={<PuffLoader
                      size={Constant.SpnnerSize}
                      color={Constant.SpinnerColor}
                    />}
                  />
                  <CustomerListContext.Provider value={customerList}>
                    {showLeftSection.ProductsAndOffers && (
                      <ProductsAndOffersListing />
                    )}
                    {showLeftSection.Notifications && <NotificationsListing />}
                    {showLeftSection.Offers && <OffersListing />}
                    {showLeftSection.Documents && <DocumentsListing />}
                  </CustomerListContext.Provider>
                </div>
                <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                  <div className="box pb-0 min-h-16">
                    <div className="box-header">
                      <h3>Admin Sections</h3>
                    </div>
                    <ul className="box-list" id="dataList">
                      <li className="shown">
                        <a
                          href="#"
                          className="row align-items-center"
                          onClick={() =>
                            setLeftSection({
                              ProductsAndOffers: true,
                              Notifications: false,
                              Offers: false,
                              Documents: false,
                            })
                          }
                        >
                          <h6 className="mb-1">Manage Products And Offers</h6>
                        </a>
                      </li>
                      <li className="shown">
                        <a
                          href="#"
                          className="row align-items-center"
                          onClick={() =>
                            setLeftSection({
                              ProductsAndOffers: false,
                              Notifications: true,
                              Offers: false,
                              Documents: false,
                            })
                          }
                        >
                          <h6 className="mb-1">Manage Notifications</h6>
                        </a>
                      </li>
                      <li className="shown">
                        <a
                          href="#"
                          className="row align-items-center"
                          onClick={() =>
                            setLeftSection({
                              ProductsAndOffers: false,
                              Notifications: false,
                              Offers: true,
                              Documents: false,
                            })
                          }
                        >
                          <h6 className="mb-1">Manage Offers</h6>
                        </a>
                      </li>
                      <li className="shown">
                        <a
                          href="#"
                          className="row align-items-center"
                          onClick={() =>
                            setLeftSection({
                              ProductsAndOffers: false,
                              Notifications: false,
                              Offers: false,
                              Documents: true,
                            })
                          }
                        >
                          <h6 className="mb-1">Manage Documents</h6>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
