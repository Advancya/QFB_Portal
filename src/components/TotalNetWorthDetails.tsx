import React, { useContext, useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import { localStrings as local_Strings } from "../translations/localStrings";
import { AuthContext } from "../providers/AuthProvider";
import Chart from "../images/Chart.png";
import networthIcon from "../images/net-worth-icon.svg";

import Constant from "../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";

import { PortfolioContext } from "../pages/Homepage";

interface iTotalNetWorthDetails {
  showTotalNetWorthDetailsModal: boolean;
  hideTotalNetWorthDetailsModal: () => void;
}

function TotalNetWorthDetails(
  totalNetWorthDetailsProps: iTotalNetWorthDetails
) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const userPortfolio = useContext(PortfolioContext);
  const [isLoading, setLoading] = useState(false);
  const [showTotalNetWorthDetailsModal, showHoldings] = useState(false);

  return (
    <React.Fragment>
      <Modal
        show={totalNetWorthDetailsProps.showTotalNetWorthDetailsModal}
        onHide={totalNetWorthDetailsProps.hideTotalNetWorthDetailsModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="modal-header-text">
            <div className="d-flex align-items-center">
              <div className="ib-text">
                <h4 id="newReqTxt">{local_Strings.PortfolioTotalNetWorth}</h4>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="close"
            onClick={totalNetWorthDetailsProps.hideTotalNetWorthDetailsModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-0 scrollabel-modal-box ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 ">
                  <div className="inner-box">
                    <div className="d-flex align-items-center">
                      <div className="ib-icon">
                        <img src={networthIcon} className="img-fluid" />
                      </div>
                      <div className="ib-text">
                        <h4>{local_Strings.PortfolioTotalNetWorth}</h4>
                        <h5>
                          {"15,450,000.00 " +
                            currentContext.userSettings.currency}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto my-4 text-center">
              <img src={Chart} className="img-fluid " />
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
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default TotalNetWorthDetails;
