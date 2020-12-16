import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import offerIcon from "../../images/offer-icon-color.svg";

interface iAuthOffersListing {
  showAuthOffersListingModal: boolean;
  hideAuthOffersListingModal: () => void;
  showAuthOffersDetailsModal: () => void;
}
function AuthOffersListing(authOffersListingProps: iAuthOffersListing) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  return (
    <div>
      <Modal
        show={authOffersListingProps.showAuthOffersListingModal}
        onHide={authOffersListingProps.hideAuthOffersListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon bg-icon">
              <img src={offerIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>Offers Listing</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={authOffersListingProps.hideAuthOffersListingModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <ul className="box-list" id="dataList">
              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
                  </div>
                </a>
              </li>

              <li className="shown">
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={authOffersListingProps.showAuthOffersDetailsModal}
                >
                  <div className="col-12 col-sm-12">
                    <div className="text-15">27 October 2020</div>

                    <h6 className="mb-1 text-600">
                      Qatar First Bank aquires BSN sports’ HQ Building “Varsity
                      Brands” located in Texas
                    </h6>
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

export default AuthOffersListing;
