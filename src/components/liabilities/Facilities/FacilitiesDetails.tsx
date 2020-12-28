import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from '../../../translations/localStrings';
import { AuthContext } from "../../../providers/AuthProvider";
import { emptyLoanDetail, ILoanDetail } from "../../../Helpers/publicInterfaces";
import Constant from "../../../constants/defaultData";
import LoadingOverlay from 'react-loading-overlay';
import PuffLoader from "react-spinners/PuffLoader";
import { GetFacilityDetails } from "../../../services/cmsService";
import * as helper from "../../../Helpers/helper";

interface iFacilitiesDetails {
  showFacilitiesDetailsModal: boolean;
  hideFacilitiesDetailsModal: () => void;
  backFacilitiesListingModal: () => void;
  showFacilitiesOutstandingPayment: () => void;
  showFacilitiesHistoricalPayment: () => void;
  facilityNumber: string;
}

function FacilitiesDetails(props: iFacilitiesDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [item, setDetail] = useState<ILoanDetail>(emptyLoanDetail);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    GetFacilityDetails(currentContext.selectedCIF, props.facilityNumber)
      .then((responseData: any) => {
        if (responseData && responseData.length > 0 && isMounted) {
          const _detail = helper.transformingStringToJSON(
            responseData[0], currentContext.language
          );
          setDetail(_detail);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <Modal
      show={props.showFacilitiesDetailsModal}
      onHide={props.hideFacilitiesDetailsModal}
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
              onClick={props.backFacilitiesListingModal}
              className="backToAccountsList"
            >
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div className="ib-text">
            <h4>Facilities</h4>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideFacilitiesDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box">
          <ul className="box-list" id="investmentModalDetails">
            <li className="pb-3 px-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h3 className="text-capitalize">Facility</h3>
                  <h3 className="text-sm">300,000,000</h3>
                </div>
                <div className="col-sm-4 text-sm-right">
                  <strong className="status-badge status-badge-lg color-black text-xs">
                    QAR
                  </strong>
                  <br />
                  <strong className="status-badge status-badge-lg">
                    2.2 %
                  </strong>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4">
            <div className="formGrp">
              <label>Name</label>
              <p>Lorem Ipsum Dolor Sit</p>
            </div>
            <div className="formGrp">
              <label>Location</label>
              <p>Lorem Ipsum Dolor Sit</p>
            </div>
            <div className="formGrp">
              <label>Start Date</label>
              <p>22/11/2020</p>
            </div>
            <div className="formGrp">
              <label>Expected Profit Rate</label>
              <p>100,000</p>
            </div>
            <div className="formGrp">
              <label>Profit Distribution Term</label>
              <p>100,000</p>
            </div>
          </div>
          <div className="text-right px-4">
            <button
              id="viewBuySellTransaction"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showFacilitiesHistoricalPayment}
            >
              View Historical Payments
            </button>
            <a
              id="viewReceivedTransaction"
              href="#"
              className="text-capitalize btn btn-primary maxSizeBtn mx-1"
              onClick={props.showFacilitiesOutstandingPayment}
            >
              View Outstanding Payments
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FacilitiesDetails;
