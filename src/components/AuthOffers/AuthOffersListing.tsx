import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import offerIcon from "../../images/offer-icon-color.svg";
import { emptyOfferData, IOfferDetail } from "../../Helpers/publicInterfaces";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import NoResult from "../../shared/NoResult";
import { GetOfferAll } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import xIcon from "../../images/x-icon.svg";

interface iAuthOffersListing {
  showAuthOffersListingModal: boolean;
  hideAuthOffersListingModal: () => void;
  showAuthOffersDetailsModal: (itemID: number) => void;
}

function AuthOffersListing(props: iAuthOffersListing) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(true);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [data, setData] = useState<IOfferDetail[]>([emptyOfferData]);

  useEffect(() => {
    let isMounted = true;

    GetOfferAll()
      .then((responseData: IOfferDetail[]) => {
        if (isMounted && responseData && responseData.length > 0) {
          const _data = responseData.filter(
            (d) => new Date(d.expireDate) > new Date()
          );
          setData(_data);
          if (_data.length < rowLimit) {
            setOffset(_data.length);
          }
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF]);

  const renderItem = (item: IOfferDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => props.showAuthOffersDetailsModal(item.id)}
      >
        <div className="col-12 col-sm-12">
          <div className="text-15 color-grey">
            {moment(item.createdDate).format("DD MMM YYYY")}
          </div>
          <h6 className="mb-1 text-600">
            {currentContext.language === "en"
              ? item.title || ""
              : item.titleAr || ""}
          </h6>
        </div>
      </a>
    </li>
  );

  return (
    <div>
      <Modal
        show={props.showAuthOffersListingModal}
        onHide={props.hideAuthOffersListingModal}
        // size="lg"
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
              <h4>{local_Strings.OffersListingTitle}</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={props.hideAuthOffersListingModal}
          >
            <img src={xIcon} width="15" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
            <ul className="box-list" id="dataList">
              {data && data.length > 0 && data[0].id > 0
                ? data
                    .slice(0, offset)
                    .map((item, index) => renderItem(item, index))
                : NoResult(local_Strings.NoDataToShow)}
            </ul>
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AuthOffersListing;
