import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";
import { emptyTransactionDetail, ITransactionDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { isTemplateExpression } from "typescript";

interface iTransactionsDetails {
  showTransactionsDetailsModal: boolean;
  hideTransactionsDetailsModal: () => void;
  backTransactionsListingModal: () => void;
  showNewTransactionModal: () => void;
  item: ITransactionDetail;
}

function TransactionsDetails(props: iTransactionsDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);

  return (
    <Modal
      show={props.showTransactionsDetailsModal}
      onHide={props.hideTransactionsDetailsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text">
            <a
              href="#"
              onClick={props.backTransactionsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.TransactionsDetailsTitle}</h4>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={props.hideTransactionsDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="reqList1">
            <li className="pb-3">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">
                    {props.item.requestDate ? moment(props.item.requestDate).format("DD MMMM YYYY") : ""}</h5>
                  <h4>{currentContext.language === "ar" ? props.item.requestSubjectAR : props.item.requestSubject}</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">
                    {currentContext.language === "ar" ? props.item.requestStatusAR : props.item.requestStatus}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className="py-2">
            <div className="row col-lg-9">
              <div className="col-lg-6 form-group">
                <label>{local_Strings.TransactionFromAccountLabel}</label>
                <div className="readonly">
                  {props.item.transferFromAccount || ""}</div>
              </div>
              {props.item.transactionTypeId === 1 && (
                <div className="col-lg-6 form-group">
                  <label>{local_Strings.TransactionToAccountLabel}</label>
                  <div className="readonly">
                    {props.item.transferToAccount || ""}
                  </div>
                </div>)}
              <div className="col-lg-6 form-group">
                <label>{local_Strings.TransactionAmountLabel}</label>
                <div className="readonly">
                  {props.item.amount || ""}</div>
              </div>
              {props.item.transactionTypeId !== 1 && (
                <React.Fragment>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.TransactionCurrencyLabel}</label>
                    <div className="readonly">
                      {props.item.currency || currentContext.userSettings.currency}
                    </div>
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.TransactionBenficiaryLabel}</label>
                    <div className="readonly">{props.item.beneficiaryFullName || ""}</div>
                  </div>
                  <div className="col-lg-6 form-group customDate">
                    <label>{local_Strings.TransactionDateLabel}</label>
                    <div className="readonly date d-flex justify-content-between align-items-center">
                      {props.item.transactionDate ? moment(props.item.transactionDate).format("DD-MM-YYYY") : ""}
                      <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label>{local_Strings.TransactionDescriptionLabel}</label>
                    <div className="readonly">
                      {props.item.description || ""}
                    </div>
                  </div>
                </React.Fragment>)}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TransactionsDetails;
