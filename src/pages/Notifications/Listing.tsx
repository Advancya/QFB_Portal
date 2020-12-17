import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import Breadcrumb from "../../components/Breadcrumb";
import { GetNotificationsAll } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import NotificationsForm from "../../components/Notifications/NotificationsForm";
import {
  emptyNotificationsDetail,
  INotificationsDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Pagination from "../../shared/pagination";

function NotificationsListing() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<INotificationsDetail[]>([]);
  const [filteredData, setFilteredData] = useState<INotificationsDetail[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [formAttributes, setFormAttributes] = useState({
    showForm: false,
    showEditable: false,
    selectedItem: emptyNotificationsDetail,
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
    GetNotificationsAll()
      .then((responseData: INotificationsDetail[]) => {
        if (responseData) {
          const _data = responseData.sort((a, b) =>
            moment(b.messageSendDate).diff(moment(a.messageSendDate))
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

  return (
    <div>
      <Breadcrumb pageName={local_Strings.NotificationsListingTitle} />
      <div className="container-fluid">
        <div className="main-section">
          <div className="d-flex align-items-center my-3 justify-content-between">
            <div className="ib-text">
              <h3 className="mb-2">
                {local_Strings.NotificationsListingTitle}
              </h3>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() =>
                setFormAttributes({
                  selectedItem: emptyNotificationsDetail,
                  showForm: true,
                  showEditable: true,
                })
              }
            >
              {local_Strings.NotificationsAddNew}
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
                        <div className="demandDateValue searchInputIcon">
                          <i className="fa fa-search"></i>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box modal-box py-0 mb-4 scrollabel-modal-box">
              <ul className="box-list" id="dataList">
                {filteredData &&
                  filteredData.length > 0 &&
                  filteredData.map((item, index) => (
                    <li className="shown" key={index}>
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
                              {item.messageSendDate
                                ? moment(item.messageSendDate).format(
                                    "dddd DD MM YYYY"
                                  )
                                : ""}
                            </span>
                          </div>
                          <h6 className="mb-1 text-600">
                            {item.messageTitle || item.messageSubTitle || ""}
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
            <NotificationsForm
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
      <NotificationsForm
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

export default NotificationsListing;
