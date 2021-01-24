import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import * as helper from "../Helpers/helper";
import {
  GetClosedHoldings_1stDrill_Deposit,
  GetClosedHoldings_1stDrill_Investment,
  GetClosedHoldings_2ndDrill_Investment,
  GetLiveHoldings_1stDrill_Deposit,
  GetLiveHoldings_1stDrill_Investment,
  GetLiveHoldings_2ndDrill_Investment,
} from "../services/cmsService";
import xIcon from "../images/x-icon.svg";
import NoResult from "../shared/NoResult";
import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import holdingsIcon from "../images/holdings-icon.svg";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import PieChart from "highcharts-react-official";
import Highcharts from 'highcharts';

type RefObjectForHighchartsReact = {
  /**
   * Chart reference
   */
  chart: Highcharts.Chart;
  /**
   * React reference
   */
  container: React.RefObject<HTMLDivElement>;
};

const HoldingsLanding = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  let liveInvestmentChart = useRef<RefObjectForHighchartsReact>();
  let closedInvestmentChart = useRef<RefObjectForHighchartsReact>();


  const loadLiveHoldings2ndDrill = (e: any) => {

    const name = e.point.name;
    const saId = e.point.key;

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
            currentContext.language
          );
          setInvestment_Live_2ndDrill(chart_Live_2ndDrill_Investment as any);
          setLive2ndDrillShow(true);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const loadClosedHoldings2ndDrill = (e: any) => {

    const name = e.point.name;
    const saId = e.point.key;

    setLoading(true);
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
            currentContext.language
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

  const [isLoading, setLoading] = useState(false);
  const [showHoldingsLandingModal, showHoldings] = useState(false);
  const [deposit_live_1stDrill, setDeposit_live_1stDrill] = useState(null);
  const [deposit_Closed_1stDrill, setDeposit_Closed_1stDrill] = useState(null);
  const [investment_live_1stDrill, setInvestment_live_1stDrill] = useState(
    {
      chart: {
        type: "pie",
        height: 420,
      },
      title: {
        text: local_Strings.Investment,
      },
      subtitle: {
        text: local_Strings.ClickToViewTheAccumulatedProfitReceived,
      },
      tooltip: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      legend: {
        rtl: currentContext.language === "ar",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          enableMouseTracking: true,
          dataLabels: {
            enabled: true,
            format: `<span style="color:{point.color}">\u25CF </span><span style="font-weight: normal;">{point.amount:.f}</span>`,
            useHTML: true,
          },
          showInLegend: true,
          point: {
            events: {
              legendItemClick: () => false
            }
          },
          events: {
            click: loadLiveHoldings2ndDrill
          }
        },
      },
      series: [],
    }
  );
  const [investment_Closed_1stDrill, setInvestment_Closed_1stDrill] = useState(
    {
      chart: {
        type: "pie",
        height: 420,
      },
      title: {
        text: local_Strings.Investment,
      },
      subtitle: {
        text: local_Strings.ClickToViewTheAccumulatedProfitReceived,
      },
      tooltip: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      legend: {
        rtl: currentContext.language === "ar",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          enableMouseTracking: true,
          dataLabels: {
            enabled: true,
            format: `<span style="color:{point.color}">\u25CF </span><span style="font-weight: normal;">{point.amount:.f}</span>`,
            useHTML: true,
          },
          showInLegend: true,
          point: {
            events: {
              legendItemClick: () => false
            }
          },
          events: {
            click: loadClosedHoldings2ndDrill
          }
        },
      },
      series: [],
    }
  );
  const [showNoDataDepositLive, setNoDataDepositLive] = useState(false);
  const [showNoDataDepositClosed, setNoDataDepositClosed] = useState(false);
  const [showNoDataInvestmentLive, setNoDataInvestmentLive] = useState(false);
  const [showNoDataInvestmentClosed, setNoDataInvestmentClosed] = useState(
    false
  );

  const [isLive2ndDrillShow, setLive2ndDrillShow] = useState(false);
  const [isClosed2ndDrillShow, setClosed2ndDrillShow] = useState(false);
  const [investment_Live_2ndDrill, setInvestment_Live_2ndDrill] = useState(
    null
  );
  const [investment_Closed_2ndDrill, setInvestment_Closed_2ndDrill] = useState(
    null
  );

  useEffect(() => {
    const initialLoadMethod = async () => {
      showLiveHoldings();
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
  }, [currentContext.selectedCIF, currentContext.language]);

  const showLiveHoldings = () => {
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

          if (responseData[0] && responseData[0].length > 0) {
            const chart_Live_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
              responseData[0],
              currentContext.language
            );
            setDeposit_live_1stDrill(chart_Live_1stDrill_Deposit as any);
          } else {
            setNoDataDepositLive(true);
          }

          if (responseData[1] && responseData[1].length > 0) {

            const _investment_live_1stDrill = { ...investment_live_1stDrill };
            _investment_live_1stDrill.title.text = local_Strings.Investment;
            _investment_live_1stDrill.subtitle.text = local_Strings.ClickToViewTheAccumulatedProfitReceived;
            _investment_live_1stDrill.series = helper.prepareInvestmentHoldings1stDrill(
              responseData[1],
              currentContext.language
            );

            setInvestment_live_1stDrill(_investment_live_1stDrill);

          } else {
            setNoDataInvestmentLive(true);
          }
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setTimeout(() => setLoading(false), 4000));
  };

  const showClosedHoldings = () => {
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

          if (responseData[0] && responseData[0].length > 0) {
            const chart_Closed_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
              responseData[0],
              currentContext.language
            );
            setDeposit_Closed_1stDrill(chart_Closed_1stDrill_Deposit as any);
          } else {
            setNoDataDepositClosed(true);
          }

          if (responseData[1] && responseData[1].length > 0) {

            const _investment_Closed_1stDrill = { ...investment_Closed_1stDrill };
            _investment_Closed_1stDrill.title.text = local_Strings.Investment;
            _investment_Closed_1stDrill.subtitle.text = local_Strings.ClickToViewTheAccumulatedProfitReceived;
            _investment_Closed_1stDrill.series = helper.prepareInvestmentHoldings1stDrill(
              responseData[1],
              currentContext.language
            );

            setInvestment_Closed_1stDrill(_investment_Closed_1stDrill);

          } else {
            setNoDataInvestmentClosed(true);
          }
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setTimeout(() => setLoading(false), 4000));
  };

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
        //size="lg"
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
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
            <Tabs
              defaultActiveKey="home"
              className="m-4 nav-pills"
              id="uncontrolled-tab-example"
            >
              <Tab
                eventKey="home"
                className="m-4"
                title={local_Strings.LiveHoldingTab}
                onEntered={() => showLiveHoldings()}
              >
                <div className="border-bottom mb-5">
                  {deposit_live_1stDrill && !isLoading ? (
                    <PieChart
                      highcharts={Highcharts}
                      options={deposit_live_1stDrill}
                    />
                  ) : !showNoDataDepositLive ? null :
                      NoResult(local_Strings.NoLiveHoldingsMesageDeposit)}
                </div>

                {!isLive2ndDrillShow && !isLoading ? (

                  <PieChart
                    highcharts={Highcharts}
                    options={investment_live_1stDrill}
                  />

                ) : !showNoDataInvestmentLive ? null :
                    NoResult(local_Strings.NoLiveHoldingsMesageInvestment)}
                {isLive2ndDrillShow && !isLoading && (
                  <React.Fragment>
                    <a
                      href="#"
                      onClick={() => setLive2ndDrillShow(false)}
                    >
                      <i
                        className="fa fa-undo text-xs" />
                    </a>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={investment_Live_2ndDrill}
                    />
                  </React.Fragment>
                )}
              </Tab>
              <Tab
                eventKey="profile"
                className="m-4"
                title={local_Strings.ExitediveHoldingTab}
                onEntered={() => showClosedHoldings()}
              >
                <div className="border-bottom mb-5">
                  {deposit_Closed_1stDrill && !isLoading ? (
                    <PieChart
                      highcharts={Highcharts}
                      options={deposit_Closed_1stDrill}
                    />
                  ) : !showNoDataDepositClosed ? null :
                      NoResult(local_Strings.NoClosedHoldingsMesageDeposit)}
                </div>                
                {!isClosed2ndDrillShow && !isLoading ? (
                  <PieChart
                    highcharts={Highcharts}
                    options={investment_Closed_1stDrill}
                  />
                ) : !showNoDataInvestmentClosed ? null :
                    NoResult(local_Strings.NoClosedHoldingsMesageInvestment)}
                {isClosed2ndDrillShow && !isLoading && (
                  <React.Fragment>
                    <a
                      href="#"
                      onClick={() => setClosed2ndDrillShow(false)}
                    >
                      <i
                        className="fa fa-undo text-xs" />
                    </a>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={investment_Closed_2ndDrill}
                    />
                  </React.Fragment>
                )}
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default HoldingsLanding;
