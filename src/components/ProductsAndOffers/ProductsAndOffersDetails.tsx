import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";

interface iProductsAndOffersDetails {
  showProductsAndOffersDetailsModal: boolean;
  hideProductsAndOffersDetailsModal: () => void;
  backProductsAndOffersListingModal: () => void;
}
function ProductsAndOffersDetails(
  productsAndOffersDetailsProps: iProductsAndOffersDetails
) {
  const showMoreProductsAndOffersDetails = () => {
    console.log("retrieve more from server");
  };

  return (
    <Modal
      show={productsAndOffersDetailsProps.showProductsAndOffersDetailsModal}
      onHide={productsAndOffersDetailsProps.hideProductsAndOffersDetailsModal}
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
                onClick={
                  productsAndOffersDetailsProps.backProductsAndOffersListingModal
                }
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">Product And offers Details</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={
            productsAndOffersDetailsProps.hideProductsAndOffersDetailsModal
          }
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list mb-0">
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-12 col-sm-12 ">
                  <div className="text-xs color-gray">
                    Wednesday 22 Nov 2020
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    Statement 1234567890 (QAR)
                  </h6>
                  <div className="color-gray">
                    This is one line description text
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-3 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur.
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductsAndOffersDetails;
