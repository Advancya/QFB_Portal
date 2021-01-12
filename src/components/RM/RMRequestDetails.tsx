import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import iRequest, {
  GetRequestFields,
  GetRequstByID,
  RmUpdateStatus,
} from "../../services/requestService";
import ViewAttachment from '../../shared/AttachmentViewer';
import Swal from 'sweetalert2';

interface iRMDetails {
  showRMDetailsModal: boolean;
  hideRMDetailsModal: () => void;
  backRMDetailsgModal: () => void;
  itemId: number;
}

function RMRequestDetails(props: iRMDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState<any[]>([]);
  const [currentRequest, setCurrentRequest] = useState<iRequest>({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showNoData, setNoData] = useState(false);

  const fetchFormData = async () => {
    setLoading(true);
    const request: iRequest = await GetRequstByID(props.itemId.toString());

    if (request !== null) {
      setLoading(true);

      const data = await GetRequestFields(request[0].requestTypeId?.toString());
      setCurrentRequest(request[0]);
      setFormFields(data);
      setNoData(true);
      setLoading(false);
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
    return returnVlaue !== null ? returnVlaue : "";
  };

  useEffect(() => {
    fetchFormData();
  }, [props.itemId]);

  return (
    <Modal
      show={props.showRMDetailsModal}
      onHide={props.hideRMDetailsModal}
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
            <h4>{local_Strings.RMLandingClientRequestDetailsLabel}</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideRMDetailsModal}
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
                    {moment(currentRequest.requestCreateDate).format("DD/MM/YYYY")}
                  </h5>
                  <h4>
                    {currentContext.language !== "ar"
                      ? currentRequest.requestSubject
                      : currentRequest.requestSubjectAr}
                  </h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  {" "}
                  <span className="status-badge ">
                    {currentContext.language !== "ar"
                      ? currentRequest.requestStatus
                      : currentRequest.requestStatusAr}
                  </span>{" "}
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
          {formFields.map((item, index) =>
            <div key={index} className="py-2 px-3">
              <div className="row">
                <div className="col-lg-8">
                  <label>{
                    currentContext.language === "ar"
                      ? item["details"].split(";")[1]
                      : item["details"].split(";")[0]
                  }
                  </label>
                  {item["details"].split(";")[2] !== "FILE_UPLOAD" ?
                    (
                      item["details"].split(";")[2] ===
                        "MULTILINE_TEXT" || (item["details"].split(";")[2] === "READ_ONLY" &&
                          item["details"].split(";")[3].toString() !==
                          "NULL") ?
                        <Form.Control
                          as="textarea"
                          readOnly={true}
                          defaultValue={getRequestFieldValue(
                            item["details"].split(";")[0].replace(/ /g, ""))
                          }
                        /> :
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getRequestFieldValue(
                              item["details"].split(";")[0].replace(/ /g, ""))
                          }}
                          className="request-detail-control" />
                    )
                    :
                    <ViewAttachment showDelete={false}
                      fileName={getRequestFieldValue("FileName")}
                      fileContent={getRequestFieldValue(
                        "FileContent"
                      )}
                    />
                  }
                </div>
              </div>
            </div>
          )}
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
                <option value="Awaiting Review">
                  {local_Strings.RequestListingFilterStatusOption1}
                </option>
                <option value="Closed">
                  {local_Strings.RequestListingFilterStatusOption2}
                </option>
                <option value="In Progress">
                  {local_Strings.RequestListingFilterStatusOption3}
                </option>
                <option value="Cancelled">
                  {local_Strings.RequestListingFilterStatusOption4}
                </option>
              </select>
            </div>
            <div className="col-lg-4 text-right py-2 px-3">
              <button id="submitOTPBtn" className="btn btn-primary"
              type="submit"
              onClick={async (e) => {
                if (!!selectedStatus) {
                  const result = await RmUpdateStatus(
                    props.itemId.toString(),
                    selectedStatus
                  );
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

export default RMRequestDetails;
