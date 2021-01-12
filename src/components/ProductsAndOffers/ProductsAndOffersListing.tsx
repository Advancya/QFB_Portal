import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import productsIcon from "../../images/products-icon.png";
import { GetProductsAndOffersAll } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  emptyProductAndOffersData,
  IProductAndOffersDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import NoResult from "../../shared/NoResult";
import Swal from "sweetalert2";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import xIcon from "../../images/x-icon.svg";

interface iProductsAndOffersListing {
  showProductsAndOffersListingModal: boolean;
  hideProductsAndOffersListingModal: () => void;
  showProductsAndOffersDetailsModal: (item: IProductAndOffersDetail) => void;
}
function ProductsAndOffersListing(props: iProductsAndOffersListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [data, setData] = useState<IProductAndOffersDetail[]>([]);
  const [isLoading, setLoading] = useState(false);
  const rowLimit: number = 6;
  const [offset, setOffset] = useState<number>(rowLimit);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    GetProductsAndOffersAll()
      .then((responseData: IProductAndOffersDetail[]) => {
        if (isMounted && responseData && responseData.length > 0) {
          const _data = responseData.sort((a, b) =>
            moment(b.createdDate).diff(moment(a.createdDate))
          );
          setData(_data);
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  const renderItem = (item: IProductAndOffersDetail, index: number) => (
    <div className="col-md-6 col-lg-4 col-container" key={index}>
      <a
        href="#"
        onClick={() => props.showProductsAndOffersDetailsModal(item)}
        className="box login-container"
      >
        <div className="box-header bg-beige">
          <h3>
            {local_Strings.productAndOffersListingLabel} | {item.id}
          </h3>
        </div>
        <div className="box-body p-3">
          <div className="box-brief mb-3">
            {currentContext.language === "en" ? item.name : item.nameAr}
          </div>
          <div className="box-date">
            {item.createdDate
              ? moment(item.createdDate).format("DD/MM/YYYY")
              : ""}
          </div>
        </div>
      </a>
    </div>
  );

  return (
    <div>
      <Modal
        show={props.showProductsAndOffersListingModal}
        onHide={props.hideProductsAndOffersListingModal}
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
            onClick={props.hideProductsAndOffersListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-4 scrollabel-modal-box">
            <div className="row">
              {data && data.length > 0 && data[0].id > 0
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.NoDataToShow)}
            </div>
            <FilterMoreButtonControl
              showMore={data && data.length > rowLimit && offset < data.length}
              onClickMore={() => setOffset(offset + 5)}
            />
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsAndOffersListing;
