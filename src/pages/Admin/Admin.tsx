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

export const CustomerListContext = createContext<ICustomer[]>(
  [emptyCustomer]
);

function Landing() {
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
      setLoading(true);
      GetAllCustomerList()
        .then((responseData: ICustomer[]) => {
          if (responseData && responseData.length > 0 && isMounted) {
            setCustomerList(responseData);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, []);

  useEffect(() => {
    const initialLoadMethod = async () => {
      const role = await getUserRole(currentContext.selectedCIF);
      if (!(role && role !== undefined && (role.name === Constant.RM || role.name === Constant.Management))) {
        let timerInterval: any;
        Swal.fire({
          title: 'Access Denied!',
          icon: 'warning',
          iconColor: "red",
          html: 'Your are not authorize to accesss this admin section.',
          timer: Constant.AlertTimeout,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
            history.push(`/${currentContext.language}/Home`);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push(`/${currentContext.language}/Home`);
          }
        });
      }
    }

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
  }, [currentContext.selectedCIF]);

  return (
    <div>
      <AuthCustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
