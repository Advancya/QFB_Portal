import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import {
  IInboxFilter,
  INotificationDetail,
} from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import FilterDropDownControl from "../../shared/FilterDropDownControl";
import FilterButtonControl from "../../shared/FilterButtonControl";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import xIcon from "../../images/x-icon.svg";

interface iNotficationsListing {
  showNotficationsListingModal: boolean;
  hideNotficationsListingModal: () => void;
  showNotficationDetailModal: (detail: INotificationDetail) => void;
  notfications: INotificationDetail[];
  reloading: boolean;
}

function NotficationsListing(props: iNotficationsListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [filteredData, setFilteredData] = useState<INotificationDetail[]>([]);
  const [filters, setFilter] = useState<IInboxFilter>({
    filterApplied: false,
    Status: "All Messages",
  });
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(
    props.notfications && props.notfications.length < rowLimit
      ? props.notfications.length
      : rowLimit
  );

  useEffect(() => {
    setFilteredData(props.notfications);
    if (props.notfications && props.notfications.length > 0 && props.notfications.length < rowLimit) {
      setOffset(props.notfications.length);
    } else {
      setOffset(rowLimit);
    }

    if (props.notfications && props.notfications.length > 0 && filters.filterApplied) {
      const _filteredData = helper.filterReadableList(
        props.notfications,
        filters
      );
      setFilteredData(_filteredData);
    }

  }, [props.notfications, props.reloading]);

  const renderItem = (item: INotificationDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showNotficationDetailModal(item)}
      >
        <div className="col-12 col-sm-12">
          <div className="mb-1 d-flex align-items-center">
            <img src={dateIcon} className="img-fluid" />
            <span className="mx-1 text-15 color-light-gold">
              {!!item.messageSendDate
                ? moment(item.messageSendDate).format("dddd DD MMM YYYY")
                : ""}
            </span>
          </div>
          <h6
            className={item.isRead ? "mb-1 text-600" : "mb-1 text-600 unread"}
          >
            {currentContext.language === "en"
              ? item.messageTitle
              : item.messageTitleAr}
          </h6>
        </div>
      </a>
    </li>
  );

  const statusFilterOptions = [
    { label: local_Strings.NotificationFilter_All, value: "All Messages" },
    { label: local_Strings.MessageFilter_Read, value: "Read Messages" },
    { label: local_Strings.MessageFilter_UnRead, value: "UnRead Messages" },
  ];

  return (
    <div>
      <Modal
        show={props.showNotficationsListingModal}
        onHide={props.hideNotficationsListingModal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.NotificationsListingTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideNotficationsListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay
            active={props.reloading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          {!props.reloading && (
            <React.Fragment>
              {props.notfications && props.notfications.length > 0 &&
                <form className="filter-box">
                  <div className="row headRow align-items-center justify-content-between">
                    <div className="col-md-5">
                      <FilterDropDownControl
                        label={local_Strings.NotificationsListingFilter}
                        options={statusFilterOptions}
                        value={filters.Status || "All Messages"}
                        onChange={(_value: string) =>
                          setFilter({ ...filters, Status: _value })
                        }
                        initialSelectRequired={false}
                      />
                    </div>

                    <div className="px-3">
                      <FilterButtonControl
                        clearFilter={() => {
                          setFilter({
                            filterApplied: false,
                            Status: "All Messages",
                          });
                          setFilteredData(props.notfications);
                          setOffset(rowLimit);
                        }}
                        applyFilter={() => {
                          setFilter({ ...filters, filterApplied: true });
                          const _filteredData = helper.filterReadableList(
                            props.notfications,
                            filters
                          );
                          setFilteredData(_filteredData);
                        }}
                        showClearFilter={filters.filterApplied}
                      />
                    </div>
                  </div>
                </form>
              }
              <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
                <ul className="box-list" id="dataList">
                  {filteredData &&
                    filteredData.length > 0 &&
                    filteredData[0].id > 0
                    ? filteredData
                      .slice(0, offset)
                      .map((item, index) => renderItem(item, index))
                    : NoResult(local_Strings.OfferList_NoData)}
                </ul>
              </div>
              <FilterMoreButtonControl
                showMore={
                  props.notfications &&
                  props.notfications.length > rowLimit &&
                  offset < filteredData.length
                }
                onClickMore={() => setOffset(offset + 5)}
              />
            </React.Fragment>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NotficationsListing;
