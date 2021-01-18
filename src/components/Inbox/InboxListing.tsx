import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import {
  emptyInboxDetail,
  IInboxFilter,
  IInboxDetail,
} from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { InboxContext } from "../../pages/Homepage";
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

interface iInboxListing {
  showInboxListingModal: boolean;
  hideInboxListingModal: () => void;
  showInboxDetailsModal: (detail: IInboxDetail) => void;
}

function InboxListing(props: iInboxListing) {
  const currentContext = useContext(AuthContext);
  const InboxMessages = useContext(InboxContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<IInboxDetail[]>(
    InboxMessages.messages
  );
  const [filters, setFilter] = useState<IInboxFilter>({
    filterApplied: false,
    Status: "0",
  });
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(
    InboxMessages.messages && InboxMessages.messages.length < rowLimit
      ? InboxMessages.messages.length
      : rowLimit
  );

  const renderItem = (item: IInboxDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showInboxDetailsModal(item)}
      >
        <div className="col-12 col-sm-12">
          <div className="mb-1 d-flex align-items-center">
            <img src={dateIcon} className="img-fluid" />
            <span className="mx-1 text-15 color-light-gold">
              {item.adviceDate
                ? moment(item.adviceDate).format("dddd DD MMM YYYY")
                : ""}
            </span>
          </div>
          <h6 className="mb-1 text-600"><span className={!item.isRead
            ? "unread" : ""}>{item.adviceType || ""}</span>
          </h6>

          <div className="text-15">{item.dateRange || ""}</div>
        </div>
      </a>
    </li>
  );

  const statusFilterOptions = [
    { label: local_Strings.MessageFilter_All, value: "All Messages" },
    { label: local_Strings.MessageFilter_Read, value: "Read Messages" },
    { label: local_Strings.MessageFilter_UnRead, value: "UnRead Messages" },
  ];

  //console.log(JSON.stringify(InboxMessages.messages, null, 2));

  return (
    <div>
      <Modal
        show={props.showInboxListingModal}
        onHide={props.hideInboxListingModal}
        //   size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>{local_Strings.InboxMessageListingTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideInboxListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <form className="filter-box">
            <div className="row headRow align-items-center justify-content-between">
              <div className="col-md-5">
                <FilterDropDownControl
                  label={local_Strings.InboxMessageListingFilterWithLabel}
                  options={statusFilterOptions}
                  value={filters.Status || "0"}
                  onChange={(_value: string) =>
                    setFilter({ ...filters, Status: _value })
                  }
                />
              </div>

              <div className="px-3">
                <FilterButtonControl
                  clearFilter={() => {
                    setFilter({
                      filterApplied: false,
                      Status: "0",
                    });
                    setFilteredData(InboxMessages.messages);
                    setOffset(rowLimit);
                  }}
                  applyFilter={() => {
                    setFilter({ ...filters, filterApplied: true });
                    const _filteredData = helper.filterReadableList(
                      InboxMessages.messages,
                      filters
                    );
                    setFilteredData(_filteredData);
                  }}
                  showClearFilter={filters.filterApplied}
                />
              </div>
              <div className="col-sm-9 py-3 customDate d-none" id="">
                <div className="row">
                  <div className="col-lg-4">
                    <label>
                      {local_Strings.InboxMessageListingFilterWithLabel}
                    </label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-lg-4">
                    <label>
                      {local_Strings.InboxMessageListingFilterWithLabel}
                    </label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <ul className="box-list" id="dataList">
              {filteredData &&
                filteredData.length > 0 &&
                !!filteredData[0].adviceDate
                ? filteredData
                  .slice(0, offset)
                  .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.NoDataToShow)}
            </ul>
          </div>
          <FilterMoreButtonControl
            showMore={
              InboxMessages.messages &&
              InboxMessages.messages.length > rowLimit &&
              offset < filteredData.length
            }
            onClickMore={() => setOffset(offset + 5)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InboxListing;
