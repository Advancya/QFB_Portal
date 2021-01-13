import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import Chart from "../images/Chart.png";
import { AuthContext } from "../providers/AuthProvider";
import { PortfolioContext } from "../pages/Homepage";
import { localStrings as local_Strings } from "../translations/localStrings";
import TotalNetWorthDetails from "./TotalNetWorthDetails";
import xIcon from "../images/x-icon.svg";

const TotalNetWorth = () => {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [showTotalNetWorthDetails, setShowTotalNetWorthDetails] = useState(
    false
  );

  return (
    <div className="col-lg-7 col-container">
      <div className="box box min-h-24">
        <h3>{local_Strings.PortfolioTotalNetWorth}</h3>
        <h2 className="mb-3">
          {(userPortfolio.networth || "0") + " "}
          <small>{currentContext.userSettings.currency}</small>
        </h2>
        <a
          href="#"
          onClick={() => setShowTotalNetWorthDetails(true)}
          className="chart-block"
        >
          <TotalNetWorthDetails />
        </a>
      </div>

      <React.Fragment>
        <Modal
          show={showTotalNetWorthDetails}
          onHide={() => setShowTotalNetWorthDetails(false)}
          // size="lg"
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
              onClick={() => setShowTotalNetWorthDetails(false)}
            >
              <img src={xIcon} width="15" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <TotalNetWorthDetails />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default TotalNetWorth;
