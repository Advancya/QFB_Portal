import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import assetsIcon from "../../images/assets-icon.svg";
import liabilitiesIcon from "../../images/liabilities-icon.svg";

import {
  emptyRequestDetail,
  IRequestFilter,
  IRequestDetail,
} from "../../Helpers/publicInterfaces";
import moment from "moment";

import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import Constant from "../../constants/defaultData";

interface IRequestType {
  id: number;
  nameEn: string;
  nameAr: string;
}
interface iManagmentRequestListing {
  showManagmentRequestListingModal: boolean;
  hideManagmentRequestListingModal: () => void;
  showManagmentDetailsModal: () => void;
  showNewBeneficiaryModal: () => void;
  backManagmentRequestListingModal: () => void;
}
function ManagmentRequestListing(
  managmentRequestListingProps: iManagmentRequestListing
) {
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
  const showMoreManagmentRequestListing = () => {
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
          <div className="col-md-7">
            <h3>{local_Strings.ManagementLandingItem1Title}</h3>
          </div>
          <div className="col-md-5 text-right">
            <button
              id="submitOTPBtn"
              className="btn btn-primary"
              onClick={managmentRequestListingProps.showManagmentDetailsModal}
            >
              {local_Strings.ViewPositionAnalysisTitle}
            </button>
          </div>
        </div>
      </div>

      <div className="py-3">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-6">
              <div className="inner-box col-sm-11 col-lg-8 mb-3">
                <div className="d-flex align-items-center">
                  <div className="ib-icon">
                    <img src={assetsIcon} className="img-fluid" />
                  </div>
                  <a href="#" className="ib-text">
                    <h4>{local_Strings.ManagementLandingAssetsTitle}</h4>
                    <h5>3,150,000.00 QAR</h5>
                  </a>
                </div>
              </div>
              <div className="box modal-box py-0">
                <ul className="box-list my-2" id="reqList">
                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub1} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub2} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub3} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub4} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub5} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub7} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="inner-box col-sm-11 col-lg-8 mb-3">
                <div className="d-flex align-items-center">
                  <div className="ib-icon">
                    <img src={liabilitiesIcon} className="img-fluid" />
                  </div>
                  <a href="#" className="ib-text">
                    <h4>{local_Strings.ManagementLandingLiabilitiesTitle}</h4>
                    <h5>3,150,000.00 QAR</h5>
                  </a>
                </div>
              </div>
              <div className="box modal-box py-0">
                <ul className="box-list my-2" id="reqList">
                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub1} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub2} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub3} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub4} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub5} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="shown border-0 py-2">
                    <a className="d-block p-0">
                      <div className="row align-items-center  ">
                        <div className="col-sm-6">
                          <h4>{local_Strings.BankPositionsTotalAssetSub7} </h4>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                          <h4 className="justify-content-end">
                            100,0000,00 QAR{" "}
                          </h4>
                        </div>
                      </div>

                      <div className="row align-items-center">
                        <div className="col-sm-9">
                          <h6 className="text-15 mb-0">
                            {local_Strings.NetAverageRate}
                          </h6>
                        </div>
                        <div className="col-sm-3 text-sm-right">
                          <span className="status-badge-small ">2%</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagmentRequestListing;
