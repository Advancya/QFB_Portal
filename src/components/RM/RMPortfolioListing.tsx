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
interface iRMPortfolioListing {
  showRMPortfolioListingModal: boolean;
  hideRMPortfolioListingModal: () => void;
  showRMDetailsModal: () => void;
  showNewBeneficiaryModal: () => void;
  backRMPortfolioListingModal: () => void;
}
function RMPortfolioListing(rMPortfolioListingProps: iRMPortfolioListing) {
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
  const showMoreRMPortfolioListing = () => {
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
          <div className="col-md-6 col-lg-7">
            <h3>{local_Strings.RMLandingClientsPortofoliosLabel}</h3>
          </div>
          <div className="col-md-6 col-lg-5">
            <CommonSearchControl></CommonSearchControl>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="box modal-box py-0 modal-box-scrollable maxH-520  ">
          <ul className="box-list" id="reqList">
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li className="shown border-0 py-2">
              <a className="d-block p-0">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-7">
                    <span className="text-600 ">
                      {local_Strings.RMSampleAccount} | 56789009
                    </span>

                    <div className="d-flex">
                      <h6 className="text-15 mb-0">Ahmed Hammad Sammer</h6>
                      <span className="status-badge mx-2">
                        {local_Strings.RMIsNotRegisterAccount}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 text-sm-right">
                    <a href="mailto:mm@mm.com">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenEmail}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-envelope text-xs"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <a href="tel:2556789">
                      <span className="icon-badge-text">
                        {local_Strings.WelcomeScreenCall}
                      </span>
                      <span className="icon-badge">
                        <i
                          className="fa fa-mobile text-sm"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
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

export default RMPortfolioListing;
