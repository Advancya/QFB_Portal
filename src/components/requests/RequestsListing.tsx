import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import requestIcon from "../../images/request-icon-color.svg";
import FilterDateControl from "../../shared/FilterDateControl";
import FilterCustomDateControl from "../../shared/FilterCustomDateControl";
import FilterDropDownControl from "../../shared/FilterDropDownControl";
import FilterButtonControl from "../../shared/FilterButtonControl";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  emptyRequestDetail,
  IRequestFilter,
  IRequestDetail,
} from "../../Helpers/publicInterfaces";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import { GetAllRequestTypes } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetUserLocalData } from "../../Helpers/authHelper";
import xIcon from "../../images/x-icon.svg";

interface IRequestType {
  id: number;
  nameEn: string;
  nameAr: string;
}

interface iRequestsListing {
  showRequestsListingModal: boolean;
  hideRequestsListingModal: () => void;
  showRequestsDetailsModal: (detail: IRequestDetail) => void;
  showNewRequestModal: () => void;
  requests: IRequestDetail[];
  reloading: boolean;
}

function RequestsListing(props: iRequestsListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [filteredData, setFilteredData] = useState<IRequestDetail[]>([
    emptyRequestDetail,
  ]);
  const [filters, setFilter] = useState<IRequestFilter>({
    filterApplied: false,
    DateOption: "0",
    StartDate: moment().add(-7, "days").toDate(),
    EndDate: moment().toDate(),
    Status: "0",
    Type: "0",
  });
  const [requestTypes, setRequestTypes] = useState<IRequestType[]>([
    {
      id: 0,
      nameEn: "",
      nameAr: "",
    },
  ]);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      const userData = await GetUserLocalData();
      if (userData) {
        if (isMounted && userData.customerId === currentContext.selectedCIF) {
          setAllowEdit(true);
        }
      }
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  useEffect(() => {
    setFilteredData(props.requests);
    if (props.requests && props.requests.length > 0 && props.requests.length < rowLimit) {
      setOffset(props.requests.length);
    } else {
      setOffset(rowLimit);
    }
  }, [props.requests, props.reloading]);

  useEffect(() => {
    let isMounted = true;

    GetAllRequestTypes()
      .then((responseData: IRequestType[]) => {
        if (responseData && responseData.length > 0 && isMounted) {
          setRequestTypes(responseData);
        }
      })
      .catch((e: any) => console.log(e));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const renderItem = (item: IRequestDetail, index: number) => (
    <li className="shown" key={index}>
      {" "}
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showRequestsDetailsModal(item)}
      >
        <div className="col-sm-8">
          <h5>{moment(item.requestCreateDate).format("DD/MM/YYYY")}</h5>
          <h4>
            {currentContext.language !== "ar"
              ? item.requestSubject
              : item.requestSubjectAR}
          </h4>
        </div>
        <div className="col-8 col-sm-3 text-sm-right">
          {" "}
          <span className="status-badge ">
            {currentContext.language !== "ar"
              ? item.requestStatus
              : item.requestStatusAR}
          </span>{" "}
        </div>
        <div className="col-4 col-sm-1 text-right">
          {" "}
          <i className="fa fa-chevron-right"></i>{" "}
        </div>
      </a>{" "}
    </li>
  );

  const statusFilterOptions = [
    {
      label: local_Strings.RequestListingFilterStatusOption1,
      value: "Awaiting acknowledgement",
    },
    { label: local_Strings.RequestListingFilterStatusOption2, value: "Closed" },
    {
      label: local_Strings.RequestListingFilterStatusOption3,
      value: "In Progress",
    },
    {
      label: local_Strings.RequestListingFilterStatusOption4,
      value: "Cancelled",
    },
  ];

  const typeFilterOptions = [];
  requestTypes &&
    requestTypes.length > 0 &&
    requestTypes[0].id > 0 &&
    requestTypes.forEach((r: IRequestType) =>
      typeFilterOptions.push({
        label:
          currentContext.language === "en" ? r.nameEn || "" : r.nameAr || "",
        value: String(r.id),
      })
    );

  return (
    <div>
      <Modal
        show={props.showRequestsListingModal}
        onHide={props.hideRequestsListingModal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon bg-icon">
              <img src={requestIcon} className="img-fluid" />
            </div>
            <div className="ib-text d-flex align-items-center">
              <h4>{local_Strings.RequestListingTitle}</h4>
              {allowEdit && currentContext.userRole === Constant.Customer && (
                <a
                  className="btnOutlineWhite"
                  href="#"
                  onClick={props.showNewRequestModal}
                  id="newRequestBtn"
                >
                  <i className="fa fa-plus-circle"></i>
                  {local_Strings.RequestListingAddButton}
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideRequestsListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <form className="filter-box">
            <div className="row headRow align-items-center">
              <div className="col-sm-3">
                <FilterDateControl
                  value={filters.DateOption}
                  onChange={(_value: string) =>
                    setFilter({ ...filters, DateOption: _value })
                  }
                />
              </div>
              <div className="col-sm-3">
                <FilterDropDownControl
                  label={local_Strings.RequestListingFilterStatus}
                  options={statusFilterOptions}
                  value={filters.Status || "0"}
                  onChange={(_value: string) =>
                    setFilter({ ...filters, Status: _value })
                  }
                />
              </div>
              <div className="col-sm-3">
                <FilterDropDownControl
                  label={local_Strings.RequestListingFilterType}
                  options={typeFilterOptions}
                  value={filters.Type || "0"}
                  onChange={(_value: string) =>
                    setFilter({ ...filters, Type: _value })
                  }
                />
              </div>
              <div className="col-sm-3">
                <FilterButtonControl
                  clearFilter={() => {
                    setFilter({
                      filterApplied: false,
                      DateOption: "0",
                      StartDate: moment().toDate(),
                      EndDate: moment().toDate(),
                      Status: "0",
                      Type: "0",
                    });
                    setFilteredData(props.requests);
                    setOffset(rowLimit);
                  }}
                  applyFilter={() => {
                    setFilter({ ...filters, filterApplied: true });
                    console.log(filters);
                    const _filteredData = helper.filterRequests(props.requests, filters);
                    setFilteredData(_filteredData);
                  }}
                  showClearFilter={filters.filterApplied}
                />
              </div>
              <FilterCustomDateControl
                onStartDateChange={(_value: string) =>
                  setFilter({ ...filters, StartDate: moment(_value).toDate() })
                }
                onEndDateChange={(_value: string) =>
                  setFilter({ ...filters, EndDate: moment(_value).toDate() })
                }
                StartDate={filters.StartDate}
                EndDate={filters.EndDate}
                showCustomDateFilter={filters.DateOption === "4"}
              />
            </div>
          </form>

          <div className="box modal-box">
            <ul className="box-list" id="reqList">
              {filteredData &&
                filteredData.length > 0 &&
                !!filteredData[0].requestSubject
                ? filteredData
                  .slice(0, offset)
                  .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.NoDataToShow)}
            </ul>
          </div>

          <FilterMoreButtonControl
            showMore={
              props.requests &&
              filteredData &&
              props.requests.length > rowLimit &&
              offset < filteredData.length
            }
            onClickMore={() => setOffset(offset + 5)}
          />
          <LoadingOverlay
            active={props.reloading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RequestsListing;
