import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import { RmOfferUpdateStatus } from "../../services/transactionService";
import Swal from "sweetalert2";
import { GetOfferSubscriptionById } from "../../services/cmsService";
import xIcon from "../../images/x-icon.svg";

interface iRMDetails {
  showRMDetailsModal: boolean;
  hideRMDetailsModal: () => void;
  backRMDetailsgModal: () => void;
  itemId: number;
}

function RMOfferDetails(props: iRMDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);

  const [item, setDetail] = useState<any>({});
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchFormData = async () => {
    setLoading(true);
    const responseData = await GetOfferSubscriptionById(props.itemId);

    if (responseData && responseData.length > 0) {
      setDetail(responseData[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    setSelectedStatus("");
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
            <h4>{local_Strings.RequestDetailsTitle}</h4>
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
            <li className="py-3 mb-3 border-bottom rounded-0">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5 className="mb-2">
                    {item.subscriptionDate
                      ? moment(item.subscriptionDate).format("DD MMMM YYYY")
                      : ""}
                  </h5>
                  <h4>
                    {local_Strings.RequestNumber + item.id}
                  </h4>
                  <h4>
                    {local_Strings.CustomerSampleAccount + item.cif}
                  </h4>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <span className="status-badge">
                    {currentContext.language === "ar"
                      ? item.requestStatusAr
                      : item.requestStatus}
                  </span>
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
          <div className="py-2">
            <div className="row col-lg-9">
              <div className="col-lg-6 form-group">
                <label>{local_Strings.OfferSubscriptionAmountLabel}</label>
                <div className="readonly">{item.subscriptionAmount || ""}</div>
              </div>              
              <div className="col-lg-6 form-group">
                <label>{local_Strings.OfferSelectCurrencyLabel}</label>
                <div className="readonly">{item.currency || ""}</div>
              </div>              
            </div>
          </div>
          <div className="row py-2 px-3">
            <div className="col-lg-4">
              <label>{local_Strings.RMDetailsChangeRequestStatusLabel}</label>
              <select
                className="form-control"
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
              <button
                id="submitOTPBtn"
                className="btn btn-primary"
                type="submit"
                disabled={selectedStatus === ""}
                onClick={async (e) => {
                  if (!!selectedStatus) {
                    setLoading(true);
                    const result = await RmOfferUpdateStatus(
                      props.itemId.toString(),
                      selectedStatus
                    );
                    setLoading(false);
                    if (result) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: local_Strings.ConfirmationTitle,
                        html: local_Strings.ConfirmationDesc,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout,
                      });
                      props.backRMDetailsgModal();
                    } else {
                      Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: local_Strings.GenericErrorMessage,
                        showConfirmButton: false,
                        timer: Constant.AlertTimeout,
                      });
                    }
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: local_Strings.formValidationMessage,
                      showConfirmButton: false,
                      timer: Constant.AlertTimeout,
                    });
                  }
                }}
              >
                {local_Strings.RMDetailsbutton}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RMOfferDetails;
