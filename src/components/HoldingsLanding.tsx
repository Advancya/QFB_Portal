import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";
import * as helper from "../Helpers/helper";
import {
  GetClosedHoldings_1stDrill_Deposit,
  GetClosedHoldings_1stDrill_Investment,
  GetClosedHoldings_2ndDrill_Investment,
  GetLiveHoldings_1stDrill_Deposit,
  GetLiveHoldings_1stDrill_Investment,
  GetLiveHoldings_2ndDrill_Investment
} from "../services/cmsService";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import holdingsIcon from "../images/holdings-icon.svg";
import axios from "axios";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { PortfolioContext } from "../pages/Homepage";

interface IClosedHoldings_1stDrill_Investment {
  investmentAmount: number;
  invRecievedProfit: number;
  subAssetId: string;
  secDescirption: string;
}
const initial_1stDrillInvestmentData = {
  investmentAmount: 0,
  invRecievedProfit: 0,
  subAssetId: "",
  secDescirption: "",
}

interface IClosedHoldings_2ndDrill_Investment {
  amount: number;
  bookingDate: string;
  subAssetTypeDesc: string;
}

const initial_2ndDrillInvestmentData = {
  amount: 0,
  bookingDate: "",
  subAssetTypeDesc: "",
}

function HoldingsLanding() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const userPortfolio = useContext(PortfolioContext);
  const [isLoading, setLoading] = useState(false);
  const [showHoldingsLandingModal, showHoldings] = useState(false);

  const [deposit_live_1stDrill, setDeposit_live_1stDrill] = useState(null);
  const [investment_live_1stDrill, setInvestment_live_1stDrill] = useState(
    null
  );
  const [investment_Live_2ndDrill, setInvestment_Live_2ndDrill] = useState(
    null
  );
  const [isLive2ndDrillShow, setLive2ndDrillShow] = useState(false);

  const [deposit_Closed_1stDrill, setDeposit_Closed_1stDrill] = useState(null);
  const [investment_Closed_1stDrill, setInvestment_Closed_1stDrill] = useState<
    IClosedHoldings_1stDrill_Investment[]
  >([initial_1stDrillInvestmentData]);
  const [investment_Closed_2ndDrill, setInvestment_Closed_2ndDrill] = useState<
    IClosedHoldings_2ndDrill_Investment[]
  >([initial_2ndDrillInvestmentData]);
  const [isClosed2ndDrillShow, setClosed2ndDrillShow] = useState(false);

  useEffect(() => {
    showLiveHoldings();
  }, [currentContext.selectedCIF]);

  const showLiveHoldings = () => {
    if (!investment_live_1stDrill || !deposit_live_1stDrill) {
      setLoading(true);

      const requestOne = GetLiveHoldings_1stDrill_Deposit(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestTwo = GetLiveHoldings_1stDrill_Investment(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      axios
        .all([requestOne, requestTwo])
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_Live_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
              responseData[0],
              "",
              true
            );
            const chart_Live_1stDrill_Investment = helper.prepareInvestmentHoldings1stDrill(
              responseData[1],
              "",
              true
            );

            setDeposit_live_1stDrill(chart_Live_1stDrill_Deposit as any);
            setInvestment_live_1stDrill(chart_Live_1stDrill_Investment as any);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setTimeout(() => setLoading(false), 4000));
    }
  };

  const getLiveHoldings2ndDrill = (name: string, saId: string) => {
    setLoading(true);

    GetLiveHoldings_2ndDrill_Investment(
      currentContext.selectedCIF,
      saId,
      currentContext.userSettings.currency
    )
      .then((responseData: any) => {
        if (responseData.length > 0) {
          const chart_Live_2ndDrill_Investment = helper.prepareInvestmentHoldings2ndDrill(
            responseData,
            name,
            false
          );
          setInvestment_Live_2ndDrill(chart_Live_2ndDrill_Investment as any);
          setLive2ndDrillShow(true);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const getClosedHoldings2ndDrill = (name: string, saId: string) => {
    GetClosedHoldings_2ndDrill_Investment(
      currentContext.selectedCIF,
      saId,
      currentContext.userSettings.currency
    )
      .then((responseData: any) => {
        if (responseData.length > 0) {
          const chart_Closed_2ndDrill_Investment = helper.prepareInvestmentHoldings2ndDrill(
            responseData,
            name,
            false
          );
          setInvestment_Closed_2ndDrill(
            chart_Closed_2ndDrill_Investment as any
          );
          setClosed2ndDrillShow(true);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const showClosedHoldings = () => {
    if (!investment_Closed_1stDrill || !deposit_Closed_1stDrill) {
      setLoading(true);
      const requestOne = GetClosedHoldings_1stDrill_Deposit(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      const requestTwo = GetClosedHoldings_1stDrill_Investment(
        currentContext.selectedCIF,
        currentContext.userSettings.currency
      );
      axios
        .all([requestOne, requestTwo])
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_Closed_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
              responseData[0],
              "",
              true
            );
            const chart_Closed_1stDrill_Investment = helper.prepareInvestmentHoldings1stDrill(
              responseData[1],
              "",
              true
            );
            setDeposit_Closed_1stDrill(chart_Closed_1stDrill_Deposit as any);
            setInvestment_Closed_1stDrill(
              chart_Closed_1stDrill_Investment as any
            );
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setTimeout(() => setLoading(false), 4000));
    }
  };

  const chart_data = helper.prepareTotalNetWorth(
    userPortfolio,
    currentContext.language === "ar" ? true : false
  );

  return (
    <React.Fragment>
      <li className="nav-item active">
        <a
          className="nav-link px-2"
          href="#"
          onClick={() => showHoldings(!showHoldingsLandingModal)}
        >
          <img src={holdingsIcon} className="images-fluid" />
          {local_Strings.navigationItem1}
        </a>
      </li>
      <Modal
        show={showHoldingsLandingModal}
        onHide={() => showHoldings(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="modal-header-text">
            <div className="d-flex align-items-center">
              <div className="ib-text">
                <h4 id="newReqTxt">{local_Strings.FooterItem5}</h4>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="close"
            onClick={() => showHoldings(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <PieChart highcharts={Highcharts} options={chart_data} />
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
        </Modal.Body>
      </Modal>
    </React.Fragment>

  );
}

export default HoldingsLanding;
