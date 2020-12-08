import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";

interface iInboxListing {
  showInboxListingModal: boolean;
  hideInboxListingModal: () => void;
  showInboxDetailsModal: () => void;
}
function InboxListing(inboxListingProps: iInboxListing) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreInboxListing = () => {
    console.log("retrieve more from server");
  };

  return (
    <div>
      <Modal
        show={inboxListingProps.showInboxListingModal}
        onHide={inboxListingProps.hideInboxListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4>Inbox messages</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={inboxListingProps.hideInboxListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <form className="filter-box">
            <div className="row headRow align-items-center justify-content-between">
              <div className="col-sm-5">
                <label>Filter With</label>
                <select className="form-control selectDateDD" id="">
                  <option value="0">Select</option>
                  <option value="1">All Messages</option>
                  <option value="2">Read</option>
                  <option value="3">UnRead</option>
                </select>
              </div>

              <div className="col-sm-2">
                <label>
                  <button
                    id="resetFilter"
                    type="reset"
                    className={
                      showClearFilter
                        ? "resetBtn resetFilter"
                        : "resetBtn resetFilter invisible"
                    }
                    onClick={clearFilter}
                  >
                    Clear Filter <i className="fa fa-close"></i>
                  </button>
                </label>
                <button
                  id="applyFilter"
                  type="button"
                  className="btn btn-primary btn-sm btn-block applyFilter"
                  onClick={applyFilter}
                >
                  Apply
                </button>
              </div>
              <div className="col-sm-9 py-3 customDate d-none" id="">
                <div className="row">
                  <div className="col-lg-4">
                    <label>From</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-lg-4">
                    <label>To</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <ul className="box-list" id="dataList">
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={inboxListingProps.showInboxDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        Wednesday 22 Nov 2020
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      Statement 1234567890 (QAR)
                    </h6>
                    <div className="text-15">
                      From 08/08/2020 | To 08/10/2020
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InboxListing;
