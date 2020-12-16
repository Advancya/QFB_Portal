import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import Breadcrumb from "../../components/Breadcrumb";
import {
  GetProductsAndOffersAll,
  DeleteProductsAndOffers,
} from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import ProductsAndOffersForm from "../../components/ProductsAndOffers/ProductsAndOffersForm";
import { confirmAlert } from "react-confirm-alert";
import {
  emptyProductAndOffersData,
  IProductAndOffersDetail,
} from "../../Helpers/publicInterfaces";
import { useToasts } from "react-toast-notifications";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

function ProductsAndOffersListing() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<IProductAndOffersDetail[]>([]);
  const [filteredData, setFilteredData] = useState<IProductAndOffersDetail[]>(
    []
  );
  const [isLoading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const [formAttributes, setFormAttributes] = useState({
    showForm: false,
    showEditable: false,
    selectedItem: emptyProductAndOffersData,
  });

  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const refreshList = () => {
    setLoading(true);
    GetProductsAndOffersAll()
      .then((responseData: IProductAndOffersDetail[]) => {
        if (responseData) {
          const _data = responseData
            .filter((d) => new Date(d.expiryDate) > new Date())
            .sort((a, b) => moment(b.createdDate).diff(moment(a.createdDate)));

          setData(_data);
          setFilteredData(_data);
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const deleteTheRecord = async (id: number) => {
    setLoading(true);
    const x = await DeleteProductsAndOffers(id);
    if (x) {
      addToast(local_Strings.ProductsAndOffersDeletedMessage, {
        appearance: "success",
        autoDismiss: true,
      });
      refreshList();
    } else {
      console.log("Error while updating record");
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumb pageName={local_Strings.ProductsAndOffersListingTitle} />
      <div className="main-section">
        <div className="d-flex align-items-center my-3 justify-content-between">
          <div className="ib-text">
            <h3>{local_Strings.ProductsAndOffersListingTitle}</h3>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              setFormAttributes({
                selectedItem: emptyProductAndOffersData,
                showForm: true,
                showEditable: true,
              })
            }
          >
            {local_Strings.ProductsAndOffersAddNew}
          </button>
        </div>
        <LoadingOverlay
          active={isLoading}
          spinner={
            <PuffLoader
              size={Constant.SpnnerSize}
              color={Constant.SpinnerColor}
            />
          }
        />
        <div className="card-header-search">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="field-group">
                <div className="input-group mb-2 mr-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={local_Strings.searchPlaceholder}
                    onChange={(e) => {
                      if (!!e.target.value) {
                        setFilteredData(
                          data.filter(
                            (f) =>
                              Object.values(f).filter(
                                (t: any) =>
                                  t &&
                                  t
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(e.target.value.toLowerCase()) !==
                                    -1
                              ).length > 0
                          )
                        );
                      } else {
                        setFilteredData(data);
                      }
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <div className="demandDateValue searchInputIcon">
                        <i className="fa fa-search"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list" id="dataList">
            {filteredData &&
              filteredData.length > 0 &&
              filteredData.map((item, index) => (
                <li className="shown" key={index}>
                  <a
                    onClick={() => {
                      confirmAlert({
                        title: local_Strings.deleteSure,
                        message: local_Strings.deleteSureMessage,
                        buttons: [
                          {
                            label: local_Strings.ProductsAndOffersDeleteButton,
                            onClick: () => deleteTheRecord(item.id),
                          },
                          {
                            label: local_Strings.cancelBtn,
                            onClick: () => {},
                          },
                        ],
                      });
                    }}
                    style={{ cursor: "pointer", float: "right" }}
                  >
                    {local_Strings.ProductsAndOffersDeleteButton}
                  </a>
                  <a
                    onClick={() =>
                      setFormAttributes({
                        selectedItem: item,
                        showForm: true,
                        showEditable: true,
                      })
                    }
                    style={{ cursor: "pointer", float: "right" }}
                  >
                    {local_Strings.BeneficiaryEditButton}
                  </a>

                  <a
                    href="#"
                    className="row align-items-center"
                    onClick={() =>
                      setFormAttributes({
                        selectedItem: item,
                        showForm: true,
                        showEditable: false,
                      })
                    }
                  >
                    <div className="col-12 col-sm-12">
                      <div className="mb-1 d-flex align-items-center">
                        <img src={dateIcon} className="img-fluid" />
                        <span className="mx-1 text-15 color-light-gold">
                          {item.createdDate
                            ? moment(item.createdDate).format("dddd DD MM YYYY")
                            : ""}
                        </span>
                      </div>
                      <h6 className="mb-1 text-600">
                        {auth.language === "en" ? item.name : item.nameAr}
                      </h6>
                      <div className="text-15">
                        {local_Strings.NotificationsExpireLabel +
                          " " +
                          (item.expiryDate
                            ? moment(item.expiryDate).format("DD-MM-YYYY")
                            : "")}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <ProductsAndOffersForm
          item={formAttributes.selectedItem}
          show={formAttributes.showForm}
          editable={formAttributes.showEditable}
          OnHide={() =>
            setFormAttributes({
              ...formAttributes,
              showForm: false,
            })
          }
          OnBack={() =>
            setFormAttributes({
              ...formAttributes,
              showForm: false,
            })
          }
          refreshList={() => refreshList()}
        />
      </div>
    </div>
  );
}

export default ProductsAndOffersListing;
