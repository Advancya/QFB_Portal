import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  Modal,
  useAccordionToggle,
} from "react-bootstrap";
import arrowUp from "../../images/arrow-up.svg";
import arrowDown from "../../images/arrow-down.svg";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import xIcon from "../../images/x-icon.svg";
import {
  GetBankCashBalancesDashboardData,
  GetCustomerInvestmentDashboardData,
  GetCustomersDepositsAndRatesDashboardData,
  GetFinancingBalancesAndRatesPBAndHCDashboardData,
  GetMMFUNDBalancesDashboardData,
  GetPastDuesPBAndHCDashboardData,
  GetSUKUKBalancesDashboardData,
  GetTreasuryPlacementsBalancesDashboardData,
} from "../../services/cmsService";
import NoResult from "../../shared/NoResult";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown.js";
import * as helper from "../../Helpers/helper";

drilldown(Highcharts);

interface iPositionAnalysis {
  showPositionAnalysisModal: boolean;
  hidePositionAnalysisModal: () => void;
  backPositionAnalysisgModal: () => void;
  showNewBeneficiaryModal: () => void;
}

const PositionAnalysis = (props: iPositionAnalysis) => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showNoCustomerData, setNoCustomerData] = useState(false);
  const [showNoFinanceData, setNoFinanceData] = useState(false);
  const [showNoPastDuesData, setNoPastDuesData] = useState(false);
  const [showNoDepositRateData, setNoDepositRateData] = useState(false);
  const [showNoCashData, setNoCashData] = useState(false);
  const [showNoMMFundData, setNoMMFundData] = useState(false);
  const [showNoSUKUKData, setNoSUKUKData] = useState(false);
  const [showNoTreasuryData, setNoTreasuryData] = useState(false);

  const [activeCard, setCard] = useState(null); // Default Value Added
  const [selectedPeriod, setPeriod] = useState("Weeks"); // Default Value Added
  const [chartData, setChartData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   getCustomerInvestmentData();
  //   setCard("0");
  // }, []);

  useEffect(() => {
    if (props.showPositionAnalysisModal) {
      setCard("99");
      getCustomerInvestmentData();
      setCard("0");
    } else {
      setCard("-1");
    }
  }, [currentContext.language, props.showPositionAnalysisModal]);

  const getCustomerInvestmentData = () => {
    if (activeCard !== "0") {
      setLoading(true);

      GetCustomerInvestmentDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "CustomerInvestmentDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("0");
          } else {
            setChartData(null);
            setNoCustomerData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getFinancingBalancesData = () => {
    if (activeCard !== "1") {
      setLoading(true);

      GetFinancingBalancesAndRatesPBAndHCDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "FinancingBalancesAndRatesPBAndHCDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("1");
          } else {
            setChartData(null);
            setNoFinanceData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getPastDuesDashboardData = () => {
    if (activeCard !== "2") {
      setLoading(true);

      GetPastDuesPBAndHCDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "PastDuesPBAndHCDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("2");
          } else {
            setChartData(null);
            setNoPastDuesData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getCustomersDepositsAndRatesDashboardData = () => {
    if (activeCard !== "3") {
      setLoading(true);

      GetCustomersDepositsAndRatesDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "CustomersDepositsAndRatesDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("3");
          } else {
            setChartData(null);
            setNoDepositRateData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getBankCashBalancesDashboardData = () => {
    if (activeCard !== "4") {
      setLoading(true);

      GetBankCashBalancesDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "BankCashBalancesDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("4");
          } else {
            setChartData(null);
            setNoCashData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getMMFUNDBalancesDashboardData = () => {
    if (activeCard !== "5") {
      setLoading(true);

      GetMMFUNDBalancesDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "MMFUNDBalancesDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("5");
          } else {
            setChartData(null);
            setNoMMFundData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getSUKUKBalancesDashboardData = () => {
    if (activeCard !== "6") {
      setLoading(true);

      GetSUKUKBalancesDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "SUKUKBalancesDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("6");
          } else {
            setChartData(null);
            setNoSUKUKData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  const getTreasuryPlacementsBalancesDashboardData = () => {
    if (activeCard !== "7") {
      setLoading(true);

      GetTreasuryPlacementsBalancesDashboardData(selectedPeriod)
        .then((responseData: any) => {
          if (responseData && responseData.length > 0) {
            const chart_data = helper.prepareManagementData(
              responseData,
              "TreasuryPlacementsBalancesDashboard",
              currentContext.language
            );
            setChartData(chart_data);
            setCard("7");
          } else {
            setChartData(null);
            setNoTreasuryData(true);
          }
        })
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setCard("-1");
    }
  };

  return (
    <Modal
      show={props.showPositionAnalysisModal}
      onHide={props.hidePositionAnalysisModal}
      //    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text"></div>
          <div className="ib-text">
            <h4>{local_Strings.ViewPositionAnalysisTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hidePositionAnalysisModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box">
          <div className="box modal-box m-3 p-3">
            <div className="row">
              <div className="col-lg-4">
                <label>{local_Strings.selectPeriod}</label>
                <select className="form-control"
                  value={selectedPeriod || "Weeks"}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                    setLoading(true);
                    GetCustomerInvestmentDashboardData(e.target.value)
                      .then((responseData: any) => {
                        if (responseData && responseData.length > 0) {
                          const chart_data = helper.prepareManagementData(
                            responseData,
                            "CustomerInvestmentDashboard",
                            currentContext.language
                          );
                          setChartData(chart_data);
                          setCard("0");
                        } else {
                          setChartData(null);
                          setNoCustomerData(true);
                        }
                      })
                      .catch((e: any) => console.log(e))
                      .finally(() => setLoading(false));
                  }}
                >
                  <option value="Weeks">{local_Strings.Last6Weeks}</option>
                  <option value="Months">{local_Strings.Last6Months}</option>
                  <option value="Quarters">{local_Strings.Last6Quarters}</option>
                  <option value="Years">{local_Strings.Last3Years}</option>
                </select>
              </div>
            </div>
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
          <Accordion className="my-3 analysis-accordion" activeKey={activeCard}>
            {/* Customer Investments */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="0"
                  callback={() => getCustomerInvestmentData()}>
                  {local_Strings.CustomerInvestments}
                </ContextAwareToggle>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoCustomerData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* SUKUK Balances */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="6"
                  callback={() => getSUKUKBalancesDashboardData()}>
                  {local_Strings.SUKUKBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoSUKUKData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* Treasury Placements Balances */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="7"
                  callback={() => getTreasuryPlacementsBalancesDashboardData()}>
                  {local_Strings.TreasuryPlacementsBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoTreasuryData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* Bank Cash Balances */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="4"
                  callback={() => getBankCashBalancesDashboardData()}>
                  {local_Strings.BankCashBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoCashData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* Financing Balances and rates PB and HC */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="1"
                  callback={() => getFinancingBalancesData()}>
                  {local_Strings.FinancingBalancesandratesPBandHC}
                </ContextAwareToggle>
              </Card.Header>

              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoFinanceData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* Past Dues PB and HC */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="2"
                  callback={() => getPastDuesDashboardData()}>
                  {local_Strings.PastDuesPBandHC}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoPastDuesData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* Customers Deposits and rates */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="3"
                  callback={() => getCustomersDepositsAndRatesDashboardData()}>
                  {local_Strings.CustomersDepositsandrates}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoDepositRateData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/* MM FUND Balances */}
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="5"
                  callback={() => getMMFUNDBalancesDashboardData()}>
                  {local_Strings.MMFUNDBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <div className="text-center">
                    {chartData ? <HighchartsReact
                      highcharts={Highcharts}
                      options={chartData}
                    /> : !showNoMMFundData ? null :
                        NoResult(local_Strings.NoDataToShow)}
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

          </Accordion>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div className="d-flex align-items-center cursor-pointer" onClick={decoratedOnClick}>
      {children}
      <img
        src={isCurrentEventKey ? arrowUp : arrowDown}
        className="img-fluid mx-2"
      />
    </div>
  );
}

export default PositionAnalysis;
