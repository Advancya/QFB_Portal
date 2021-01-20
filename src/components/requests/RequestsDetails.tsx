import React, { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { IRequestDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import iRequest, {
  GetRequestFields,
  GetRequstByID,
} from "../../services/requestService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import ViewAttachment from "../../shared/AttachmentViewer";
import xIcon from "../../images/x-icon.svg";

interface iRequestsDetails {
  showRequestsDetailsModal: boolean;
  hideRequestsDetailsModal: () => void;
  backRequestsListingModal: () => void;
  showNewRequestModal: () => void;
  item: IRequestDetail;
}

function RequestsDetails(props: iRequestsDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState<any[]>([]);
  const [currentRequest, setCurrentRequest] = useState<iRequest>(null);

  const fetchFormData = async () => {
    setLoading(true);
    const request: iRequest = await GetRequstByID(props.item.id.toString());
    if (request !== null) {
      const data = await GetRequestFields(request[0].requestTypeId?.toString());
      setFormFields(data);
      setCurrentRequest(request[0]);
    }
    setLoading(false);
  };

  const getRequestFieldValue = (fieldName: string) => {
    let returnVlaue: any;
    if (fieldName === "RequestTypeId") {
      returnVlaue = currentRequest.requestTypeId;
    }
    if (fieldName === "RequestCreateDate") {
      returnVlaue = currentRequest.requestCreateDate;
    }
    if (fieldName === "CashAccount") {
      returnVlaue = currentRequest.cashAccount;
    }
    if (fieldName === "ExtraDetails") {
      returnVlaue = currentRequest.extraDetails;
    }
    if (fieldName === "FromDate") {
      returnVlaue =
        currentRequest.fromDate?.toString() !== undefined
          ? moment(currentRequest.fromDate).format("DD-MM-YYYY")
          : "";
    }
    if (fieldName === "ToDate") {
      returnVlaue =
        currentRequest.toDate?.toString() !== undefined
          ? moment(currentRequest.toDate).format("DD-MM-YYYY")
          : "";
    }
    if (fieldName === "FaxNumber") {
      returnVlaue = currentRequest.faxNumber;
    }
    if (fieldName === "LandlineNumber") {
      returnVlaue = currentRequest.landlineNumber;
    }
    if (fieldName === "MobileNumber") {
      returnVlaue = currentRequest.mobileNumber;
    }
    if (fieldName === "PoBoxNumber") {
      returnVlaue = currentRequest.poBoxNumber;
    }
    if (fieldName === "ContactPersonName(underPOA)") {
      returnVlaue = currentRequest.contactPersonNumber;
    }
    if (fieldName === "Country") {
      returnVlaue = currentRequest.country;
    }
    if (fieldName === "City") {
      returnVlaue = currentRequest.city;
    }
    if (fieldName === "Address") {
      returnVlaue = currentRequest.address;
    }
    if (fieldName === "InvestmentName") {
      returnVlaue = currentRequest.investmentName;
    }
    if (fieldName === "DocumentType") {
      returnVlaue = currentRequest.documentType;
    }
    if (fieldName === "DepositContractNumber") {
      returnVlaue = currentRequest.depositContractNumber;
    }
    if (fieldName === "AuditorName/Requestor") {
      return currentRequest.auditorName;
    }
    if (fieldName === "ConfirmationDate") {
      returnVlaue =
        currentRequest.confirmationDate?.toString() !== undefined
          ? moment(currentRequest.confirmationDate).format("DD-MM-YYYY")
          : "";
    }
    if (fieldName === "Currency") {
      returnVlaue = currentRequest.currency;
    }
    if (fieldName === "FileName") {
      returnVlaue = currentRequest.fileName;
    }
    if (fieldName === "FileContent") {
      returnVlaue = currentRequest.fileContent;
    }
    if (fieldName === "Attachments") {
      returnVlaue = currentRequest.fileName;
    }
    if (fieldName === "requestSubject") {
      returnVlaue = currentRequest.requestSubject;
    }
    if (fieldName === "requestStatus") {
      returnVlaue = currentRequest.requestStatus;
    }
    if (fieldName === "requestStatusChangeDate") {
      returnVlaue = currentRequest.requestStatusChangeDate;
    }
    if (fieldName === "Remarks") {
      returnVlaue = currentRequest.remarks;
    }
    if (fieldName === "PoBox") {
      returnVlaue = currentRequest.poBoxNumber;
    }
    if (fieldName === "Email") {
      returnVlaue = currentRequest.email;
    }
    if (fieldName === "StatementType") {
      returnVlaue = currentRequest.statementType;
    }

    return returnVlaue ? returnVlaue : "";
  };

  useEffect(() => {

    if (props.showRequestsDetailsModal) {
      fetchFormData();
    } else {
      setFormFields([]);
      setCurrentRequest(null);
    }
    
  }, [props.item.id, props.showRequestsDetailsModal]);

  return (
    <Modal
      show={props.showRequestsDetailsModal}
      onHide={props.hideRequestsDetailsModal}
      //size="lg"
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
              onClick={props.backRequestsListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>{local_Strings.RequestDetailsTitle}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideRequestsDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="reqList1">
            <li className="py-3 mb-3 border-bottom rounded-0">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">
                    {moment(props.item.requestCreateDate).format("DD/MM/YYYY")}
                  </h5>
                  <h4>
                    {currentContext.language !== "ar"
                      ? props.item.requestSubject
                      : props.item.requestSubjectAR}
                  </h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  {" "}
                  <span className="status-badge ">
                    {currentContext.language !== "ar"
                      ? props.item.requestStatus
                      : props.item.requestStatusAR}
                  </span>{" "}
                </div>
              </div>
            </li>
          </ul>
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          {!isLoading && currentRequest && formFields.map((item, index) => (
            <div key={index} className="py-2 px-3">
              <div className="row">
                <div className="col-lg-8">
                  <label>
                    {currentContext.language === "ar"
                      ? item["details"].split(";")[1]
                      : item["details"].split(";")[0]}
                  </label>
                  {item["details"].split(";")[2] !== "FILE_UPLOAD" ? (
                    item["details"].split(";")[2] === "MULTILINE_TEXT" ||
                    (item["details"].split(";")[2] === "READ_ONLY" &&
                      item["details"].split(";")[3].toString() !== "NULL") ? (
                      <Form.Control
                        as="textarea"
                        readOnly={true}
                        defaultValue={getRequestFieldValue(
                          item["details"].split(";")[0].replace(/ /g, "")
                        )}
                        maxLength={500}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getRequestFieldValue(
                            item["details"].split(";")[0].replace(/ /g, "")
                          ),
                        }}
                        className="request-detail-control"
                      />
                    )
                  ) : (
                    <ViewAttachment
                      showDelete={false}
                      fileName={getRequestFieldValue("FileName")}
                      fileContent={getRequestFieldValue("FileContent")}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RequestsDetails;
