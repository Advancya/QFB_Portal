import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import assetsIcon from "../../images/assets-icon.svg";
import liabilitiesIcon from "../../images/liabilities-icon.svg";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import Constant from "../../constants/defaultData";
import { GetManagementBankPoistion } from "../../services/cmsService";
import * as helper from "../../Helpers/helper";
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

  const [data, setData] = React.useState({
    totalAssets: "",
    cashBalance: "",
    privateBankLoansBalances: "",
    privateBankLoansAvreageRate: "",
    pastDuesBalance: "",
    holdingCompanyLoansBalances: "",
    holdingCompanyLoansAvreageRate: "",
    sukukBalance: "",
    sukukNetAverageRate: "",
    mmFundBalance: "",
    mmFundAverageRate: "",
    treasuryPlacements: "",
    treasuryPlacementsAverageRate: "",
    totalInvestmentsinProducts: "",
    customersDeposits: "",
    depositsNetAverageRate: "",
    customersCash: "",
    totalLiabilities: "",
  });

  const fetchData = async () => {
    const result = await GetManagementBankPoistion();
    setData(result[0]);
  };

  React.useEffect(() => {
    if (!!currentContext.selectedCIF) {
      fetchData();
    }
  }, [currentContext.selectedCIF]);

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
                    <h5>{helper.ConvertToQfbNumberFormat(data["totalAssets"] || "")}</h5>
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
                            {helper.ConvertToQfbNumberFormat(data["sukukBalance"] || "")}
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
                          <span className="status-badge-small ">{helper.ConvertToQfbNumberFormat(data["sukukNetAverageRate"] || "") + "%" || ""}</span>
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
                            {helper.ConvertToQfbNumberFormat(data["mmFundBalance"] || "")}
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
                          <span className="status-badge-small ">{helper.ConvertToQfbNumberFormat(data["mmFundAverageRate"] || "") + "%" || ""}</span>
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
                            {helper.ConvertToQfbNumberFormat(
                              data["treasuryPlacements"] || ""
                            )}
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
                          <span className="status-badge-small ">{helper.ConvertToQfbNumberFormat(data["treasuryPlacementsAverageRate"] || "") + "%" || ""}</span>
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
                            {helper.ConvertToQfbNumberFormat(data["pastDuesBalance"] || "")}
                          </h4>
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
                            {helper.ConvertToQfbNumberFormat(
                              data["totalInvestmentsinProducts"] || ""
                            )}
                          </h4>
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
                            {helper.ConvertToQfbNumberFormat(
                              data["holdingCompanyLoansBalances"] || ""
                            )}
                          </h4>
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
                            {helper.ConvertToQfbNumberFormat(
                              data["privateBankLoansBalances"] || ""
                            )}
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
                          <span className="status-badge-small ">{helper.ConvertToQfbNumberFormat(data["privateBankLoansAvreageRate"] || "") + "%" || ""}</span>
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
                    <h5>{helper.ConvertToQfbNumberFormat(
                      data["totalLiabilities"] || ""
                    )}</h5>
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
                            {helper.ConvertToQfbNumberFormat(data["cashBalance"] || "")}
                          </h4>
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
                            {helper.ConvertToQfbNumberFormat(data["customersCash"] || "")}
                          </h4>
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
                            {helper.ConvertToQfbNumberFormat(
                              data["customersDeposits"] || ""
                            )}
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
                          <span className="status-badge-small ">
                            {helper.ConvertToQfbNumberFormat(data["depositsNetAverageRate"] || "") + "%" || ""}</span>
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
