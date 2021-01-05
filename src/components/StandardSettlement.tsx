import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

interface iStandardSettlement {
  showStandardSettlementModal?: boolean;
  hideStandardSettlementModal?: () => void;
}
function StandardSettlement(standardSettlementProps: iStandardSettlement) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showStandardSettlement, setShowStandardSettlement] = useState(false);

  const handleCloseStandardSettlement = () => {
    setShowStandardSettlement(false);
  };
  const handleShowStandardSettlement = () => {
    setShowStandardSettlement(true);
  };

  return (
    <span>
      <a href="#" onClick={handleShowStandardSettlement}>
        {local_Strings.topBarRightItem1}
      </a>
      <Modal
        show={showStandardSettlement}
        onHide={handleCloseStandardSettlement}
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
                <h4 id="newReqTxt">{local_Strings.StandardSettlementTitle}</h4>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="close"
            onClick={handleCloseStandardSettlement}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollabel-modal-box">
            <div className="box table-box">
              <table className="table table-striped accordion">
                <thead>
                  <tr className="clickRow">
                    <th colSpan={1}>
                      {local_Strings.TransactionCurrencyLabel}
                    </th>
                    <th>{local_Strings.CorrespondentBank} </th>
                    <th>{local_Strings.Location} </th>

                    <th>{local_Strings.SwiftCode}</th>
                    <th>{local_Strings.IBAN}</th>
                    <th>{local_Strings.NostroAccountNumber}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={1}>QAR </td>
                    <td> Qatar National Bank</td>
                    <td>Doha</td>
                    <td>QNBAQAQA</td>
                    <td>QA56QNBA000000000001800628001</td>
                    <td>0001800628001</td>
                  </tr>
                  <tr>
                    <td>QAR </td>
                    <td> Masraf Al Rayan</td>
                    <td>Doha</td>
                    <td>MAFRQAQA</td>
                    <td>QA81MAFR000000000003001858290</td>
                    <td>3001858290</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>QAR </td>
                    <td>Qatar Islamic Bank</td>
                    <td>Doha</td>
                    <td>QISBQAQA</td>
                    <td>QA94QISB000000000112072510049</td>
                    <td>112072510049</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>USD</td>
                    <td>JP Morgan Chase Bank</td>
                    <td>New York</td>
                    <td>CHASUS33</td>
                    <td>NA</td>
                    <td>799763420</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>GBP</td>
                    <td>JP Morgan Chase Bank</td>
                    <td>London</td>
                    <td>CHASGB2L</td>
                    <td>GB82CHAS60924240256002</td>
                    <td>40256002</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>EUR</td>
                    <td>JP Morgan Chase Bank</td>
                    <td>London</td>
                    <td>CHASGB2L</td>
                    <td>GB12CHAS60924240256001</td>
                    <td>40256001</td>
                  </tr>
                  <tr>
                    <td colSpan={1}>AED</td>
                    <td>Standard Chartered</td>
                    <td>Dubai</td>
                    <td>SCBLAEAD</td>
                    <td>AE630440000002209905301</td>
                    <td>AE630440000002209905301</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </span>
  );
}

export default StandardSettlement;
