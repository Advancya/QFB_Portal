import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { RmTranasctionUpdateStatus } from "../../services/transactionService";
import ViewAttachment from '../../shared/AttachmentViewer';
import Swal from 'sweetalert2';
import { emptyTransactionDetail, ITransactionDetail } from "../../Helpers/publicInterfaces";
import { GetTransactionById } from "../../services/cmsService";
import xIcon from "../../images/x-icon.svg";

interface iRMDetails {
  showRMDetailsModal: boolean;
  hideRMDetailsModal: () => void;
  backRMDetailsgModal: () => void;
  itemId: number;
}

function RMTranactionDetails(props: iRMDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState<any[]>([]);
  const [item, setDetail] = useState<ITransactionDetail>(emptyTransactionDetail);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showNoData, setNoData] = useState(false);

  const fetchFormData = async () => {
    setLoading(true);
    const transaction = await GetTransactionById(props.itemId);

    if (transaction && transaction.length > 0) {
      setDetail(transaction[0]);
      setNoData(false);
    } else {
      setNoData(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFormData();
  }, [props.itemId]);

  return (
    <Modal
      show={props.showRMDetailsModal}
      onHide={props.hideRMDetailsModal}
      //size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text"></div>
          <div className="ib-text">
            <h4>{local_Strings.TransactionsDetailsTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideRMDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="reqList1">
            <li className="pb-3">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">
                    {item.requestDate ? moment(item.requestDate).format("DD MMMM YYYY") : ""}</h5>
                  <h4>{currentContext.language === "ar" ? item.requestSubjectAR : item.requestSubject}</h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">
                    {currentContext.language === "ar" ? item.requestStatusAR : item.requestStatus}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <LoadingOverlay
            active={isLoading}
            spinner={<PuffLoader
              size={Constant.SpnnerSize}
              color={Constant.SpinnerColor}
            />}
          />
          <div className="py-2">
            <div className="row col-lg-9">
              <div className="col-lg-6 form-group">
                <label>{local_Strings.TransactionFromAccountLabel}</label>
                <div className="readonly">
                  {item.transferFromAccount || ""}</div>
              </div>
              {item.transactionTypeId === 1 && (
                <div className="col-lg-6 form-group">
                  <label>{local_Strings.TransactionToAccountLabel}</label>
                  <div className="readonly">
                    {item.transferToAccount || ""}
                  </div>
                </div>)}
              <div className="col-lg-6 form-group">
                <label>{local_Strings.TransactionAmountLabel}</label>
                <div className="readonly">
                  {item.amount || ""}</div>
              </div>
              {item.transactionTypeId !== 1 && (
                <React.Fragment>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.TransactionCurrencyLabel}</label>
                    <div className="readonly">
                      {item.currency || currentContext.userSettings.currency}
                    </div>
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>{local_Strings.TransactionBenficiaryLabel}</label>
                    <div className="readonly">{item.beneficiaryFullName || ""}</div>
                  </div>
                  <div className="col-lg-6 form-group customDate">
                    <label>{local_Strings.TransactionDateLabel}</label>
                    <div className="readonly date d-flex justify-content-between align-items-center">
                      {item.transactionDate ? moment(item.transactionDate).format("DD/MM/YYYY") : ""}
                      <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label>{local_Strings.TransactionDescriptionLabel}</label>
                    <div className="readonly">
                      {item.description || ""}
                    </div>
                  </div>
                </React.Fragment>)}
            </div>
          </div>
          <div className="row py-2 px-3">

            <div className="col-lg-4">
              <label>{local_Strings.RMDetailsChangeRequestStatusLabel}</label>
              <select className="form-control"
                value={selectedStatus || ""}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
              >
                <option value="">{local_Strings.SelectItem}</option>
                <option value="In Progress">
                  {local_Strings.RequestListingFilterStatusOption3}
                </option>
                <option value="Cancelled">
                  {local_Strings.RequestListingFilterStatusOption4}
                </option>
                <option value="Closed">
                  {local_Strings.RequestListingFilterStatusOption2}
                </option>
              </select>
            </div>
            <div className="col-lg-4 text-right py-2 px-3">
              <button id="submitOTPBtn" className="btn btn-primary"
                type="submit"
                onClick={async (e) => {
                  if (!!selectedStatus) {
                    setLoading(true);
                    const result = await RmTranasctionUpdateStatus(
                      props.itemId.toString(),
                      selectedStatus
                    );
                    setLoading(false);
                    if (result) {
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: local_Strings.ConfirmationTitle,
                        html: local_Strings.ConfirmationDesc,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout
                      });
                      props.backRMDetailsgModal();
                    } else {
                      Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: local_Strings.GenericErrorMessage,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout
                      });
                    }
                  } else {

                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: local_Strings.formValidationMessage,
                      showConfirmButton: false,
                      timer: Constant.AlertTimeout
                    });
                  }
                }}>
                {local_Strings.RMDetailsbutton}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  );
}

export default RMTranactionDetails;
