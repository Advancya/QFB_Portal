import React, { useContext, useEffect, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import networthIcon from "../images/net-worth-icon.svg";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { PortfolioContext } from "../pages/Homepage";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import * as helper from "../Helpers/helper";

interface iTotalNetWorthDetails {
  showTotalNetWorthDetailsModal: boolean;
  hideTotalNetWorthDetailsModal: () => void;
}

const TotalNetWorthDetails = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const userPortfolio = useContext(PortfolioContext);
  const [isLoading, setLoading] = useState(true);

  const chart_data = helper.prepareTotalNetWorth(
    userPortfolio,
    currentContext.language === "ar" ? true : false
  );

  const afterChartCreated = (chart) => {
    setLoading(false);
  }

  return userPortfolio && !!userPortfolio.networth ? (
    <div className="box modal-box py-0 mb-0 scrollabel-modal-box ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <div className="inner-box">
              <div className="d-flex align-items-center">
                <div className="ib-icon">
                  <img src={networthIcon} className="img-fluid" />
                </div>
                <div className="ib-text">
                  <h4>{local_Strings.PortfolioTotalNetWorth}</h4>
                  <h5>
                    {userPortfolio.networth +
                      " " +
                      currentContext.userSettings.currency}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center">
        {userPortfolio && !!userPortfolio.customerCode &&
          <PieChart highcharts={Highcharts} options={chart_data} callback={afterChartCreated} />
        }
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
    </div>
  ) : null;
}

export default TotalNetWorthDetails;
