import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";

interface iInboxDetails {
  showInboxDetailsModal: boolean;
  hideInboxDetailsModal: () => void;
  backInboxListingModal: () => void;
}
function InboxDetails(inboxDetailsProps: iInboxDetails) {
  const showMoreInboxDetails = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={inboxDetailsProps.showInboxDetailsModal}
      onHide={inboxDetailsProps.hideInboxDetailsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <a
                href="#"
                onClick={inboxDetailsProps.backInboxListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">Message Details</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={inboxDetailsProps.hideInboxDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list mb-0">
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <ul className="box-list" id="dataList">
            <li className="bg-light-gray pt-3 pb-2">
              <h4 className="box-list-sub-header">Previous Statements</h4>
            </li>
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>{" "}
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>{" "}
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>{" "}
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>{" "}
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>{" "}
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      Wednesday 22 Nov 2020
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">Statement 1234567890 (QAR)</h6>
                  <div className="text-15">From 08/08/2020 | To 08/10/2020</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block ">
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InboxDetails;
