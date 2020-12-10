import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import productsIcon from "../../images/products-icon.png";

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
              <h4>Products and Offers</h4>
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
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <a
                      href="#"
                      onClick={
                        productsAndOffersListingProps.showProductsAndOffersDetailsModal
                      }
                    >
                      Product Number | 123456789
                    </a>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-container">
                <div className="box login-container">
                  <div className="box-header bg-beige">
                    <h3>
                      <a
                        href="#"
                        onClick={
                          productsAndOffersListingProps.showProductsAndOffersDetailsModal
                        }
                      >
                        Product Number | 123456789
                      </a>
                    </h3>
                  </div>
                  <div className="box-body p-3">
                    <div className="box-brief mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </div>
                    <div className="box-date">16/11/2020</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsAndOffersListing;
