import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import {
  GetAllDocuments,
} from "../../services/cmsService";
import {
  IDocumentDetail,
} from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import NoResult from "../../shared/NoResult";
import dateIcon from "../../images/calendar-inactive.png";
import FilterMoreButtonControl from '../../shared/FilterMoreButtonControl';
import DocumentDetails from "./DocumentDetails";

const mime = require("mime");

function DocumentListing() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);  
  const [data, setData] = useState<IDocumentDetail[]>([]);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(rowLimit);
  const [openDocumentListing, showDocumentListing] = useState(false);
  const [openDocumentDetails, showDocumentDetails] = useState(false);
  const [itemId, setItemId] = useState<number>();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    GetAllDocuments()
      .then((responseData: IDocumentDetail[]) => {
        if (isMounted && responseData && responseData.length > 0) {
          const _data = responseData.sort((a, b) => a.orderId - b.orderId);

          setData(_data);
          if (_data.length < rowLimit) {
            setOffset(_data.length);
          }
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

  const renderItem = (item: IDocumentDetail, index: number) => (
    <li className="shown" key={index}>
      <a
        href="#"
        className="row align-items-center"
        onClick={() => {
          setItemId(item.id);
          showDocumentDetails(true);
          showDocumentListing(false);
        }}
      >
        <div className="col-10 col-sm-10">
          <div className="mb-1 d-flex align-items-center">
            <img src={dateIcon} className="img-fluid" />
            <span className="mx-1 text-15 color-light-gold">
              {item.documentDate
                ? moment(item.documentDate).format(
                  "dddd DD MM YYYY"
                )
                : ""}
            </span>
          </div>
          <h6 className="mb-1 text-600">
            {currentContext.language === "en"
              ? item.documentName
              : item.documentNameAr}
          </h6>
        </div>
      </a>
    </li>
  );

  return (
    <React.Fragment>
      <a
        className=""
        href="#"
        onClick={() => showDocumentListing(!openDocumentListing)}
      >
        {local_Strings.topBarRightItem2}
      </a>
      <Modal
        show={openDocumentListing}
        onHide={() => showDocumentListing(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="modal-header-text">
            <div className="d-flex align-items-center">
              <div className="ib-text">
                <h4 id="newReqTxt">{local_Strings.DocumentsListingTitle}</h4>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="close"
            onClick={() => showDocumentListing(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box py-0 mb-4 scrollabel-modal-box">
            <LoadingOverlay
              active={isLoading}
              spinner={
                <PuffLoader
                  size={Constant.SpnnerSize}
                  color={Constant.SpinnerColor}
                />
              }
            />
            <ul className="box-list" id="dataList">
              {data &&
                data.length > 0 &&
                data[0].id > 0 ?
                data.slice(0, offset).map((item, index) =>
                  renderItem(item, index)
                )
                : NoResult(local_Strings.NoDataToShow)}
            </ul>
          </div>
          <FilterMoreButtonControl showMore={data && data.length > rowLimit &&
            offset < data.length} onClickMore={() => setOffset(offset + 5)} />
        </Modal.Body>
      </Modal>
      {itemId && itemId > 0 &&
        <DocumentDetails
          showDocumentDetailsModal={openDocumentDetails}
          hideDocumentDetailsModal={() => {
            showDocumentDetails(false);
            showDocumentListing(false);
          }}
          backDocumentDetailsModal={() => {
            showDocumentDetails(false);
            showDocumentListing(true);
          }}
          itemId={itemId}
        />}
    </React.Fragment>
  );
}

export default DocumentListing;
