import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import beneficiaryIconColor from "../../images/beneficiary-icon-color.svg";
import FilterCustomDateControl from "../../shared/FilterCustomDateControl";
import {
  emptyRequestDetail,
  IRequestFilter,
  IRequestDetail,
} from "../../Helpers/publicInterfaces";
import moment from "moment";
import FilterDateControl from "../../shared/FilterDateControl";
import FilterDropDownControl from "../../shared/FilterDropDownControl";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import FilterButtonControl from "../../shared/FilterButtonControl";
import Constant from "../../constants/defaultData";
import * as helper from "../../Helpers/helper";
import FilterButtonControlInline from "../../shared/FilterButtonControlInline";
import CommonSearchControl from "../../shared/CommonSearchControl";

interface IRequestType {
  id: number;
  nameEn: string;
  nameAr: string;
}
interface iRMRequestListing {
  showRMRequestListingModal: boolean;
  hideRMRequestListingModal: () => void;
  showRMDetailsModal: () => void;
  showNewBeneficiaryModal: () => void;
  backRMRequestListingModal: () => void;
}
function RMRequestListing(rMRequestListingProps: iRMRequestListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<IRequestDetail[]>([emptyRequestDetail]);

  const [showClearFilter, setShowClearFilter] = useState(false);
  const [showBeneficiaryDateFilter, setShowBeneficiaryDateFilter] = useState(
    false
  );
  const [filteredData, setFilteredData] = useState<IRequestDetail[]>([
    emptyRequestDetail,
  ]);
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

  const [filters, setFilter] = useState<IRequestFilter>({
    filterApplied: false,
    DateOption: "0",
    StartDate: moment().add(-7, "days").toDate(),
    EndDate: moment().toDate(),
    Status: "0",
    Type: "0",
  });
  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreRMRequestListing = () => {
    console.log("retrieve more from server");
  };
  const requestDateFilterOnchangeHandler = (e: any) => {
    if (e.target.value == 4) {
      setShowBeneficiaryDateFilter(true);
    } else {
      setShowBeneficiaryDateFilter(false);
    }
  };

  return (
    <div className="box p-0">
      <div className="border-bottom p-3">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3>{local_Strings.RMLandingBankPositionsLabel}</h3>
          </div>
          <div className="col-md-4">
            <CommonSearchControl></CommonSearchControl>
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
                setFilteredData(data);
                setOffset(rowLimit);
              }}
              applyFilter={() => {
                setFilter({ ...filters, filterApplied: true });
                console.log(filters);
                const _filteredData = helper.filterRequests(data, filters);
                setFilteredData(_filteredData);
              }}
              showClearFilter={filters.filterApplied}
            />
          </div>
        </div>
      </form>
      <div className="px-3">
        <div className="box modal-box py-0 modal-box-scrollable ">
          <ul className="box-list" id="reqList">
            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>

            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>

            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>

            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>

            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>

            <li className="shown border-0 py-2">
              <a
                className="d-block p-0"
                href="#"
                onClick={rMRequestListingProps.showRMDetailsModal}
              >
                <div className="row align-items-center border-bottom  pb-2 mb-2">
                  <div className="col-sm-8">
                    <h5>{local_Strings.dummyDate}</h5>

                    <h4>{local_Strings.RMSampleTitle} </h4>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="status-badge ">
                      {local_Strings.RequestListingSampleStatus}
                    </span>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <h6 className="text-15 mb-0">
                      {local_Strings.SettingsLandingNameSample}
                    </h6>

                    <span className="color-light-gold">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>
                  </div>
                  <div className="col-sm-4 text-sm-right">
                    <span className="icon-badge-text">
                      {local_Strings.WelcomeScreenCall}
                    </span>
                    <span className="icon-badge">
                      <i
                        className="fa fa-mobile text-sm"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RMRequestListing;
