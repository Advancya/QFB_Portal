import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import CommonSearchControl from "../shared/CommonSearchControl";
import NoResult from "../shared/NoResult";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { GetRmClinetList, GetManagementClinetList } from "../services/cmsService";
import FilterMoreButtonControl from "../shared/FilterMoreButtonControl";
import { useHistory } from "react-router-dom";
import { GetUserLocalData } from "../Helpers/authHelper";
import { getUserRole } from "../services/apiServices";

const ClientPortfolioListing = () => {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [clientList, setClientList] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);

  const [showNoData, setNoData] = useState(false);
  const fetchClinets = async () => {
    setLoading(true);
    const userData = await GetUserLocalData();
    if (userData) {
      setLoading(true);
      const role = await getUserRole(userData.customerId);
      const result = role && role.name === Constant.RM ? await GetRmClinetList(userData.customerId) : await GetManagementClinetList();
      if (result && result.length > 0) {
        setClientList(result);
        setFilteredData(result);
      } else {
        setNoData(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!!currentContext.selectedCIF) {
      fetchClinets();
    }
  }, [currentContext.selectedCIF]);


  const renderItem = (item: any, index: number) => (
    <li className="shown border-0 py-2" key={index}>
      <div className="d-block p-0 cursor-pointer"
        onClick={() => {
          currentContext.selectCIF(item.id);
          history.push(`/${currentContext.language}/Home`);
        }}>
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-7">
            <span className="text-600 ">
              {local_Strings.RMSampleAccount + item["id"]}
            </span>

            <div className="d-flex">
              <h6 className="text-15 mb-0">{item["shortName"] || ""}</h6>
              <span className="status-badge mx-2">
                {local_Strings.RMIsNotRegisterAccount}
                {item["isRegister"].toString() === "true"
                  ? local_Strings.RMIsRegisterAccount
                  : local_Strings.RMIsNotRegisterAccount}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 text-sm-right">
            <a href={`mailto:${item["customerEmail"]}`}>
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
            <a href={`tel:${item["mobile"]}`}>
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
      </div>
    </li>
  );

  return (
    <div className="box p-0">
      <div className="border-bottom p-3">
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-7">
            <h3>{local_Strings.RMLandingClientsPortofoliosLabel}</h3>
          </div>
          <div className="col-md-6 col-lg-5">
            <CommonSearchControl applySearch={(_text) => {
              if (!!_text) {
                const _filteredData = [...clientList];
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
                                _text.toLowerCase()
                              ) !== -1
                        ).length > 0
                    )
                    .slice(0, 10)
                );
              } else {
                setFilteredData(clientList.slice(0, 10));
              }
            }} />
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="box modal-box py-0 modal-box-scrollable maxH-520  ">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list" id="reqList">
            {filteredData &&
              filteredData.length > 0 &&
              !!filteredData[0].mobile
              ? filteredData
                .slice(0, offset)
                .map((item, index) => renderItem(item, index))
              : !showNoData ? null : NoResult(local_Strings.NoDataToShow)}
          </ul>
        </div>
        <FilterMoreButtonControl
          showMore={
            filteredData && filteredData.length > rowLimit && offset < filteredData.length
          }
          onClickMore={() => setOffset(offset + 5)}
        />
      </div>
    </div>
  );
}

export default ClientPortfolioListing;
