import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import productsIcon from "../../images/products-icon.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iProductsAndOffersListing {
  showProductsAndOffersListingModal: boolean;
  hideProductsAndOffersListingModal: () => void;
  showProductsAndOffersDetailsModal: () => void;
}
function ProductsAndOffersListing(
  productsAndOffersListingProps: iProductsAndOffersListing
) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  return (
    <div>
      <Modal
        show={productsAndOffersListingProps.showProductsAndOffersListingModal}
        onHide={productsAndOffersListingProps.hideProductsAndOffersListingModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={productsIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>{local_Strings.productAndOffersLandingTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={
              productsAndOffersListingProps.hideProductsAndOffersListingModal
            }
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-4 scrollabel-modal-box">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <a
                  href="#"
                  onClick={
                    productsAndOffersListingProps.showProductsAndOffersDetailsModal
                  }
                  className="box login-container"
                >
                  <div className="box-header bg-beige">
                    <h3>
                      {local_Strings.productAndOffersListingLabel} | 123456789
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      {local_Strings.dummyDesc}
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsAndOffersListing;
