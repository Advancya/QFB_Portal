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
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown.js";
import {
  ILiveHoldings_1stDrill_Investment,
  IClosedHoldings_1stDrill_Investment,
} from "../Helpers/publicInterfaces";

drilldown(Highcharts);

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
  const liveInvestmentChart = useRef<RefObjectForHighchartsReact>();

  const [isLoading, setLoading] = useState(false);
  const [showHoldingsLandingModal, showHoldings] = useState(false);
  const [deposit_live_1stDrill, setDeposit_live_1stDrill] = useState(null);
  const [deposit_Closed_1stDrill, setDeposit_Closed_1stDrill] = useState(null);
  const [investment_live_1stDrill, setInvestment_live_1stDrill] = useState(
    null
  );
  const [investment_Closed_1stDrill, setInvestment_Closed_1stDrill] = useState(
    null
  );
  const [showNoDataDepositLive, setNoDataDepositLive] = useState(false);
  const [showNoDataDepositClosed, setNoDataDepositClosed] = useState(false);
  const [showNoDataInvestmentLive, setNoDataInvestmentLive] = useState(false);
  const [showNoDataInvestmentClosed, setNoDataInvestmentClosed] = useState(
    false
  );

  useEffect(() => {
    const initialLoadMethod = async () => {
      showLiveHoldings();
    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }
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

            if (responseData[0] && responseData[0].length > 0) {
              const chart_Live_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
                responseData[0],
                currentContext.language
              );
              setDeposit_live_1stDrill(chart_Live_1stDrill_Deposit as any);
            } else {
              setNoDataDepositLive(true);
            }

            const _investment_live_1stDrill = responseData[1] as ILiveHoldings_1stDrill_Investment[];

            if (_investment_live_1stDrill && _investment_live_1stDrill.length > 0) {
              const drillDownRequests = [];
              _investment_live_1stDrill.forEach(
                (item: ILiveHoldings_1stDrill_Investment) => {
                  drillDownRequests.push(
                    GetLiveHoldings_2ndDrill_Investment(
                      currentContext.selectedCIF,
                      item.subAssetId,
                      currentContext.userSettings.currency
                    )
                  );
                }
              );

              const chart_Live_1stDrill_Investment = helper.prepareInvestmentHoldings1stDrill(
                _investment_live_1stDrill,
                local_Strings.Investment,
                currentContext.language
              );

              axios.all(drillDownRequests).then((drillDownResponseData: any) => {
                if (drillDownResponseData && drillDownResponseData.length > 0) {
                  _investment_live_1stDrill.forEach(
                    (item: ILiveHoldings_1stDrill_Investment, index: number) => {
                      if (drillDownResponseData[index].length > 0) {
                        const chart_Closed_2ndDrill_Investment = helper.prepareInvestmentHoldings2ndDrill(
                          drillDownResponseData[index],
                          item.secDescirption,
                          false
                        );
                        chart_Live_1stDrill_Investment.drilldown.series.push({
                          id: item.subAssetId,
                          name: item.secDescirption,
                          data: chart_Closed_2ndDrill_Investment,
                        });
                      }
                    }
                  );

                  setInvestment_live_1stDrill(
                    chart_Live_1stDrill_Investment as any
                  );
                }
              });

            } else {
              setNoDataInvestmentLive(true);
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setTimeout(() => setLoading(false), 4000));
    }
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

            if (responseData[0] && responseData[0].length > 0) {
              const chart_Closed_1stDrill_Deposit = helper.prepareDepositHoldings1stDrill(
                responseData[0],
                currentContext.language
              );
              setDeposit_Closed_1stDrill(chart_Closed_1stDrill_Deposit as any);
            } else {
              setNoDataDepositClosed(true);
            }

            const _investment_closed_1stDrill = responseData[1] as IClosedHoldings_1stDrill_Investment[];
            if (_investment_closed_1stDrill && _investment_closed_1stDrill.length > 0) {

              const drillDownRequests = [];
              _investment_closed_1stDrill.forEach(
                (item: IClosedHoldings_1stDrill_Investment) => {
                  drillDownRequests.push(
                    GetClosedHoldings_2ndDrill_Investment(
                      currentContext.selectedCIF,
                      item.subAssetId,
                      currentContext.userSettings.currency
                    )
                  );
                }
              );

              const chart_Closed_1stDrill_Investment = helper.prepareInvestmentHoldings1stDrill(
                responseData[1],
                local_Strings.Investment,
                currentContext.language
              );

              axios.all(drillDownRequests).then((drillDownResponseData: any) => {
                if (drillDownResponseData && drillDownResponseData.length > 0) {
                  _investment_closed_1stDrill.forEach(
                    (
                      item: IClosedHoldings_1stDrill_Investment,
                      index: number
                    ) => {
                      if (drillDownResponseData[index].length > 0) {
                        const chart_Live_2ndDrill_Investment = helper.prepareInvestmentHoldings2ndDrill(
                          drillDownResponseData[index],
                          item.secDescirption,
                          false
                        );
                        chart_Closed_1stDrill_Investment.drilldown.series.push({
                          id: item.subAssetId,
                          name: item.secDescirption,
                          data: chart_Live_2ndDrill_Investment,
                        });
                      }
                    }
                  );

                  setInvestment_Closed_1stDrill(
                    chart_Closed_1stDrill_Investment as any
                  );
                }
              });

            } else {
              setNoDataInvestmentClosed(true);
            }
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setTimeout(() => setLoading(false), 4000));
    }
  };

  Highcharts.setOptions({
    lang: {
      drillUpText: local_Strings.DrillBackButtonText,
    },
  });

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
                {deposit_live_1stDrill ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={deposit_live_1stDrill}
                  />
                ) : !showNoDataDepositLive ? null :
                    NoResult(local_Strings.NoLiveHoldingsMesageDeposit)}
                {investment_live_1stDrill ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={investment_live_1stDrill}
                    ref={liveInvestmentChart}
                    immutable={true}
                    callback={(chart) => {
                      // chart.options.plotOptions.column.events.click
                      //   = (e) => {
                      //     //liveInvestmentChart.current.chart.addSeriesAsDrilldown(e.point, []);
                      //     chart.title.attr({ text: e.point.name });
                      //   }
                      chart.options.plotOptions.column.events.afterAnimate = (
                        e
                      ) => {
                        chart.title.attr({ text: e.target.name });
                        if (e.target.name !== local_Strings.Investment) {
                          chart.subtitle.attr({ text: "" });
                        } else {
                          chart.subtitle.attr({ text: local_Strings.ChartDrillDownHint });
                        }
                      };
                    }}
                  />
                ) : !showNoDataInvestmentLive ? null :
                    NoResult(local_Strings.NoLiveHoldingsMesageInvestment)}
              </Tab>
              <Tab
                eventKey="profile"
                className="m-4"
                title={local_Strings.ExitediveHoldingTab}
                onEntered={() => showClosedHoldings()}
              >
                {deposit_Closed_1stDrill ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={deposit_Closed_1stDrill}
                  />
                ) : !showNoDataDepositClosed ? null :
                    NoResult(local_Strings.NoClosedHoldingsMesageInvestment)}

                {investment_Closed_1stDrill ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={investment_Closed_1stDrill}
                    callback={(chart) => {
                      chart.options.plotOptions.column.events.afterAnimate = (
                        e
                      ) => {
                        chart.title.attr({ text: e.target.name });
                        if (e.target.name !== local_Strings.Investment) {
                          chart.subtitle.attr({ text: "" });
                        } else {
                          chart.subtitle.attr({ text: local_Strings.ChartDrillDownHint });
                        }
                      };
                    }}
                  />
                ) : !showNoDataInvestmentClosed ? null :
                    NoResult(local_Strings.NoClosedHoldingsMesageDeposit)}
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default HoldingsLanding;
