import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import beneficiaryIconColor from "../../images/beneficiary-icon-color.svg";

interface iRMListing {
  showRMListingModal: boolean;
  hideRMListingModal: () => void;
  showRMDetailsModal: () => void;
  showNewBeneficiaryModal: () => void;
  backRMListingModal: () => void;
}
function RMListing(rMListingProps: iRMListing) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [showBeneficiaryDateFilter, setShowBeneficiaryDateFilter] = useState(
    false
  );

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreRMListing = () => {
    console.log("retrieve more from server");
  };
  const requestDateFilterOnchangeHandler = (e: any) => {
    if (e.target.value == 4) {
      setShowBeneficiaryDateFilter(true);
    } else {
      setShowBeneficiaryDateFilter(false);
    }
  };

  return (
    <div className="box">
      <div className="box modal-box">
        <ul className="box-list" id="reqList">
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={rMListingProps.showRMDetailsModal}
            >
              <div className="col-sm-8">
                <h4>Beneficiary ID | 12345678912345 </h4>
                <h5>Ahmed Mohsen</h5>
              </div>
              <div className="col-8 col-sm-3 text-sm-right">
                <span className="status-badge ">Qatar</span>
              </div>
              <div className="col-4 col-sm-1 text-right">
                <i className="fa fa-chevron-right"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RMListing;
