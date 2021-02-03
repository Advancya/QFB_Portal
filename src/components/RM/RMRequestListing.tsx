import React, { useContext, useEffect, useState } from "react";
import FilterCustomDateControl from "../../shared/FilterCustomDateControl";
import { IRequestFilter, iRmRequests } from "../../Helpers/publicInterfaces";
import moment from "moment";
import FilterDateControl from "../../shared/FilterDateControl";
import FilterDropDownControl from "../../shared/FilterDropDownControl";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import * as helper from "../../Helpers/helper";
import FilterButtonControlInline from "../../shared/FilterButtonControlInline";
import CommonSearchControl from "../../shared/CommonSearchControl";
import NoResult from "../../shared/NoResult";
import { GetAllRequestTypes } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import {
  RmReadRequest,
  RmReadTransaction,
  RmReadOffer
} from "../../services/requestService";

interface IRequestType {
  id: number;
  nameEn: string;
  nameAr: string;
}
interface iRMRequestListing {
  showRMRequestListingModal: boolean;
  hideRMRequestListingModal: () => void;
  showRequestDetailModal: (itemId: number) => void;
  showTransactionDetailModal: (itemId: number) => void;
  showOfferDetailModal: (itemId: number) => void;
  requests: iRmRequests[];
  backRMRequestListingModal: () => void;
  reloading: boolean;
}

function RMRequestListing(props: iRMRequestListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);

  const [filteredData, setFilteredData] = useState<iRmRequests[]>(null);
  const [requestTypes, setRequestTypes] = useState<IRequestType[]>([
    {
      id: 0,
      nameEn: "",
      nameAr: "",
    },
  ]);
  const statusFilterOptions = [
    {
      label: local_Strings.RequestListingFilterStatusOption1,
      value: "Awaiting Review",
    },
    {
      label: local_Strings.RequestListingFilterStatusOption2,
      value: "Closed",
    },
    {
      label: local_Strings.RequestListingFilterStatusOption3,
      value: "In Progress",
    },
    {
      label: local_Strings.RequestListingFilterStatusOption4,
      value: "Cancelled",
    },
  ];

  const [filters, setFilter] = useState<IRequestFilter>({
    filterApplied: false,
    DateOption: "0",
    StartDate: moment().add(-7, "days").toDate(),
    EndDate: moment().toDate(),
    Status: "0",
    Type: "0",
  });

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

  useEffect(() => {
    setFilteredData(props.requests);
    if (
      props.requests &&
      props.requests.length > 0 &&
      props.requests.length < rowLimit
    ) {
      setOffset(props.requests.length);
    } else {
      setOffset(rowLimit);
    }

    if (filters.filterApplied) {
      const _filteredData = helper.filterRMRequests(
        props.requests,
        filters
      );
      setFilteredData(_filteredData);
    }

  }, [props.requests, props.reloading]);

  const renderItem = (item: iRmRequests, index: number) => (
    <li className="shown border-0 py-2" key={index}>
      <a
        className="d-block p-0"
        href="#"
        onClick={() => {
          if (item["type"] === "Request") {
            RmReadRequest(item["id"]);
            props.showRequestDetailModal(item.id);
          } else if (item["type"] === "Tranasction") {
            RmReadTransaction(item["id"]);
            props.showTransactionDetailModal(item.id);
          } else {
            RmReadOffer(String(item.id));
            props.showOfferDetailModal(item.id);
          }
        }}
      >
        <div className="row align-items-center border-bottom  pb-2 mb-2">
          <div className="col-sm-8">
            <h5>
              <span className={!item.isRead ? "unread" : ""}>
                {moment(item["requestCreateDate"]).format("DD-MM-YYYY")}
              </span>
            </h5>
            <h4>
              {currentContext.language === "ar"
                ? item["requestSubjectAr"] || ""
                : item["requestSubject"] || ""}
            </h4>
          </div>
          <div className="col-sm-4 text-sm-right">
            <span className="status-badge ">
              {currentContext.language === "ar"
                ? item["requestStatusAr"] || ""
                : item["requestStatus"] || ""}
            </span>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-sm-8">
            <h6 className="text-15 mb-0">{item["customerName"] || ""}</h6>
            <span className="color-light-gold">
              {local_Strings.RMSampleAccount + item["cif"] || ""}
            </span>
          </div>
          <div className="col-sm-4 text-sm-right">
            <span className="icon-badge-text">
              {local_Strings.WelcomeScreenCall}
            </span>
            <span className="icon-badge">
              <i className="fa fa-mobile text-sm" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </a>
    </li >
  );

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
    <div className="box p-0">
      <div className="border-bottom p-3">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3>{local_Strings.RMLandingBankPositionsLabel}</h3>
          </div>
          <div className="col-md-4">
            <CommonSearchControl
              applySearch={(_text) => {
                if (!!_text) {
                  const _filteredData = [...props.requests];
                  setFilteredData(
                    _filteredData
                    .filter(
                      (obj) =>
                        obj["cif"].toString().includes(_text) ||
                        obj["customerMobile"].toString().includes(_text)
                    )
                  );
                } else {
                  setOffset(rowLimit);
                  setFilteredData(props.requests);
                }
              }}
            />
          </div>
        </div>
      </div>
      <form className="filter-box p-3 mb-0">
        <div className="row headRow align-items-center">
          <div className="col-sm-4">
            <FilterDateControl
              value={filters.DateOption}
              onChange={(_value: string) =>
                setFilter({ ...filters, DateOption: _value })
              }
            />
          </div>
          <div className="col-sm-4">
            <FilterDropDownControl
              label={local_Strings.RequestListingFilterStatus}
              options={statusFilterOptions}
              value={filters.Status || "0"}
              onChange={(_value: string) =>
                setFilter({ ...filters, Status: _value })
              }
              initialSelectRequired={true}
            />
          </div>
          <div className="col-sm-4">
            <FilterDropDownControl
              label={local_Strings.RequestListingFilterType}
              options={typeFilterOptions}
              value={filters.Type || "0"}
              onChange={(_value: string) =>
                setFilter({ ...filters, Type: _value })
              }
              initialSelectRequired={true}
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
            customClass="col-sm-12"
          />

          <div className="col-sm-12 justify-content-end d-flex align-items-center my-2">
            <FilterButtonControlInline
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
                const _filteredData = helper.filterRMRequests(
                  props.requests,
                  filters
                );
                setFilteredData(_filteredData);
              }}
              showClearFilter={filters.filterApplied}
            />
          </div>
        </div>
      </form>
      <div className="px-3">
        <div className="box modal-box py-0 modal-box-scrollable ">
          <LoadingOverlay
            active={props.reloading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list" id="reqList">
            {filteredData && filteredData.length > 0
              ? filteredData
                .slice(0, offset)
                .map((item, index) => renderItem(item, index))
              : NoResult(local_Strings.NoDataToShow)}
          </ul>
        </div>
        <FilterMoreButtonControl
          showMore={
            filteredData &&
            filteredData.length > rowLimit &&
            offset < filteredData.length
          }
          onClickMore={() => setOffset(offset + 5)}
        />
      </div>
    </div>
  );
}

export default RMRequestListing;
