import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { IProductAndOffersDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import moment from "moment";
import xIcon from "../../images/x-icon.svg";

interface iProductsAndOffersDetails {
  showProductsAndOffersDetailsModal: boolean;
  hideProductsAndOffersDetailsModal: () => void;
  backProductsAndOffersListingModal: () => void;
  item: IProductAndOffersDetail;
}

function ProductsAndOffersDetails(props: iProductsAndOffersDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);

  return (
    <Modal
      show={props.showProductsAndOffersDetailsModal}
      onHide={props.hideProductsAndOffersDetailsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="d-flex align-items-center">
          <div className="modal-header-text">
            <a
              href="#"
              onClick={props.backProductsAndOffersListingModal}
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
        <button
          type="button"
          className="close"
          onClick={props.hideProductsAndOffersDetailsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list mb-0">
            <li className="py-3 px-4 mb-3 border-bottom rounded-0">
              <div className="row align-items-center py-2">
                <div className="col-md-12 col-sm-12 ">
                  <div className="text-xs color-gray">
                    {props.item.createdDate
                      ? moment(props.item.createdDate).format("dddd DD MM YYYY")
                      : ""}
                  </div>
                  <h6 className="mb-1 text-600 text-18 ">
                    {(currentContext.language === "en"
                      ? props.item.name
                      : props.item.nameAr) +
                      " | " +
                      props.item.id}
                  </h6>
                </div>
              </div>
            </li>
          </ul>
          <div
            className="color-gray p-3 mb-5"
            dangerouslySetInnerHTML={{
              __html:
                currentContext.language === "en"
                  ? props.item.details
                  : props.item.detailsAr,
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductsAndOffersDetails;
