import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

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
              <h4 id="newReqTxt">
                {local_Strings.ProductsAndOffersDetailsTitle}
              </h4>
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
                    {local_Strings.dummyDate}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {local_Strings.dummyTitle}
                  </h6>
                  <div className="color-gray">{local_Strings.dummyDesc}</div>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-3 mb-5">{local_Strings.dummyContent}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductsAndOffersDetails;
