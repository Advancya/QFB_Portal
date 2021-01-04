import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import Breadcrumb from "../Breadcrumb";
import {
  GetProductsAndOffersAll,
  DeleteProductsAndOffers,
} from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import ProductsAndOffersForm from "./ProductsAndOffersForm";
import {
  emptyProductAndOffersData,
  IProductAndOffersDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Pagination from "../../shared/pagination";
import NoResult from "../../shared/NoResult";
import Swal from "sweetalert2";

function ProductsAndOffersListing() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<IProductAndOffersDetail[]>([]);
  const [filteredData, setFilteredData] = useState<IProductAndOffersDetail[]>(
    []
  );
  const [isLoading, setLoading] = useState(true);
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
  }, [currentContext.selectedCIF]);

  const refreshList = () => {
    setLoading(true);
    GetProductsAndOffersAll()
      .then((responseData: IProductAndOffersDetail[]) => {
        if (responseData && responseData.length > 0) {
          const _data = responseData.sort((a, b) =>
            moment(b.createdDate).diff(moment(a.createdDate))
          );

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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: local_Strings.ProductsAndOffersDeletedMessage,
        showConfirmButton: false,
        timer: Constant.AlertTimeout,
      });
      refreshList();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: local_Strings.GenericErrorMessage,
        showConfirmButton: false,
        timer: Constant.AlertTimeout,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumb pageName={local_Strings.ProductsAndOffersListingTitle} />
      <div className="container-fluid">
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

          <div className="card-header-search">
            <div className="row align-items-center">
              <div className="col-md-12 mb-4">
                <div className="field-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={local_Strings.searchPlaceholder}
                      onChange={(e) => {
                        if (!!e.target.value) {
                          const _filteredData = [...data];
                          setFilteredData(
                            _filteredData
                              .filter(
                                (f) =>
                                  Object.values(f).filter(
                                    (t: any) =>
                                      t &&
                                      t
                                        .toString()
                                        .toLowerCase()
                                        .indexOf(
                                          e.target.value.toLowerCase()
                                        ) !== -1
                                  ).length > 0
                              )
                              .slice(0, 10)
                          );
                        } else {
                          setFilteredData(data.slice(0, 10));
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            /> */}
            <div className="box modal-box py-0 mb-4 scrollabel-modal-box">
              <ul className="box-list" id="dataList">
                {filteredData && filteredData.length > 0
                  ? filteredData.map((item, index) => (
                      <li className="shown" key={index}>
                        <a
                          onClick={() => {
                            Swal.fire({
                              title: local_Strings.deleteSure,
                              text: local_Strings.deleteSureMessage,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#6b4f44",
                              confirmButtonText:
                                local_Strings.OfferDeleteButton,
                              cancelButtonText: local_Strings.cancelBtn,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteTheRecord(item.id);
                              }
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
                                  ? moment(item.createdDate).format(
                                      "dddd DD MM YYYY"
                                    )
                                  : ""}
                              </span>
                            </div>
                            <h6 className="mb-1 text-600">
                              {currentContext.language === "en" ? item.name : item.nameAr}
                            </h6>
                            <div className="text-15">
                              {local_Strings.NotificationsExpireLabel +
                                " " +
                                (item.expiryDate
                                  ? moment(item.expiryDate).format("DD/MM/YYYY")
                                  : "")}
                            </div>
                          </div>
                        </a>
                      </li>
                    ))
                  : NoResult(local_Strings.NoDataToShow)}
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
          {data.length > 10 && (
            <Pagination
              items={data as []}
              onChangePage={setFilteredData}
              initialPage={1}
              pageSize={10}
            />
          )}
        </div>
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
  );
}

export default ProductsAndOffersListing;
