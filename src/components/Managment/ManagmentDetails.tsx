import moment from "moment";
import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Collapse,
  Modal,
  useAccordionToggle,
} from "react-bootstrap";
import arrowUp from "../../images/arrow-up.svg";
import arrowDown from "../../images/arrow-down.svg";

import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Chart from "../../images/Chart.png";

interface iManagmentDetails {
  showManagmentDetailsModal: boolean;
  hideManagmentDetailsModal: () => void;
  backManagmentDetailsgModal: () => void;
  showNewBeneficiaryModal: () => void;
}
function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div className="d-flex align-items-center" onClick={decoratedOnClick}>
      {children}
      <img
        src={isCurrentEventKey ? arrowUp : arrowDown}
        className="img-fluid mx-2"
      />
    </div>
  );
}
function ManagmentDetails(managmentDetailsProps: iManagmentDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isCollapsible, setCollapsible] = useState(false);

  return (
    <Modal
      show={managmentDetailsProps.showManagmentDetailsModal}
      onHide={managmentDetailsProps.hideManagmentDetailsModal}
      size="lg"
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
          onClick={managmentDetailsProps.hideManagmentDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box">
          <div className="box modal-box m-3 p-3">
            <div className="row">
              <div className="col-lg-4">
                <label>{local_Strings.selectPeriod}</label>
                <select className="form-control">
                  <option value="0">{local_Strings.Last6Weeks}</option>
                  <option value="1">{local_Strings.Last6Months}</option>
                  <option value="2">{local_Strings.Last6Quarters}</option>
                  <option value="3">{local_Strings.Last3Years}</option>
                </select>
              </div>
            </div>
          </div>

          <Accordion defaultActiveKey="0" className="my-3 analysis-accordion">
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="0" callback="">
                  {local_Strings.CustomerInvestments}
                </ContextAwareToggle>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="1" callback="">
                  {local_Strings.FinancingBalancesandratesPBandHC}
                </ContextAwareToggle>
              </Card.Header>

              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="2" callback="">
                  {local_Strings.PastDuesPBandHC}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="3" callback="">
                  {local_Strings.CustomersDepositsandrates}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="4" callback="">
                  {local_Strings.BankCashBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="5" callback="">
                  {local_Strings.MMFUNDBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="6" callback="">
                  {local_Strings.SUKUKBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
                  </div>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <ContextAwareToggle eventKey="7" callback="">
                  {local_Strings.TreasuryPlacementsBalances}
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <div className="text-center">
                    <img src={Chart} className="img-fluid" />
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

export default ManagmentDetails;
