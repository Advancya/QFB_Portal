import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { emptyInboxDetail, IInboxDetail } from "../../Helpers/publicInterfaces";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import {
  GetInboxByCIFAndType,
  SetInboxItemAsRead,
} from "../../services/cmsService";
import axios from "axios";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import FilterMoreButtonControl from '../../shared/FilterMoreButtonControl';
import { InboxContext } from "../../pages/Homepage";

interface iInboxDetails {
  showInboxDetailsModal: boolean;
  hideInboxDetailsModal: () => void;
  backInboxListingModal: () => void;
  item: IInboxDetail;
}

function InboxDetails(props: iInboxDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const InboxMessages = useContext(InboxContext);
  const [data, setData] = useState<IInboxDetail[]>([emptyInboxDetail]);
  const [filteredData, setFilteredData] = useState<IInboxDetail[]>([emptyInboxDetail]);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(data.length < rowLimit ? data.length : rowLimit);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;

    const requestOne = GetInboxByCIFAndType(
      currentContext.selectedCIF,
      props.item.adviceType
    );
    const requestTwo = SetInboxItemAsRead({ ...props.item, isRead: true });

    axios
      .all([requestOne, requestTwo])
      .then((responseData: any) => {
        if (responseData && responseData.length > 0 && isMounted) {
          const previousItems = (responseData[0] as IInboxDetail[]).filter(
            (i) =>
              i.description !== props.item.description && i.pdfName !== props.item.pdfName
          );

          setData(previousItems);
          setFilteredData(previousItems);
          if (previousItems.length < rowLimit) {
            setOffset(previousItems.length);
          }
          InboxMessages.refreshInbox();
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [props.item.description]);

  const renderItem = (item: IInboxDetail, index: number) => (
    <li className="shown" key={index}>
      <div className="row align-items-center py-2">
        <div className="col-md-8 col-sm-12 ">
          <div className="mb-1 d-flex align-items-center">
            <img src={dateIcon} className="img-fluid" />
            <span className="mx-1 text-15 color-light-gold">
              {item.adviceDate
                ? moment(item.adviceDate).format(
                  "dddd DD MMM YYYY"
                )
                : ""}
            </span>
          </div>
          <h6 className="mb-1 text-600">{item.description || ""}</h6>
          <div className="text-15">{item.dateRange || ""}</div>
        </div>
        <div className="col-md-4 text-right">
          <a className="download-link d-inline-block " target="_blank" href={item.pdfUrl || "#"}>
            <i className="mx-1 fa fa-file color-white"></i>
            <i className="mx-1 fa fa-download color-white"></i>
          </a>
        </div>
      </div>
    </li>
  );

  return (
    <Modal
      show={props.showInboxDetailsModal}
      onHide={props.hideInboxDetailsModal}
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
                onClick={props.backInboxListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.InboxMessageDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideInboxDetailsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <LoadingOverlay
            active={isLoading}
            spinner={
              <PuffLoader
                size={Constant.SpnnerSize}
                color={Constant.SpinnerColor}
              />
            }
          />
          <ul className="box-list mb-0">
            <li className="shown">
              <div className="row align-items-center py-2">
                <div className="col-md-8 col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <img src={dateIcon} className="img-fluid" />
                    <span className="mx-1 text-15 color-light-gold">
                      {props.item.adviceDate
                        ? moment(props.item.adviceDate).format(
                          "dddd DD MMM YYYY"
                        )
                        : ""}
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">{props.item.description || ""}</h6>
                  <div className="text-15">{props.item.dateRange || ""}</div>
                </div>
                <div className="col-md-4 text-right">
                  <a className="download-link d-inline-block " target="_blank" href={props.item.pdfUrl || "#"}>
                    <i className="mx-1 fa fa-file color-white"></i>
                    <i className="mx-1 fa fa-download color-white"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <ul className="box-list" id="dataList">
            <li className="bg-light-gray pt-3 pb-2">
              <h4 className="box-list-sub-header">{local_Strings.InboxMessageDetailsPreviousLabel}</h4>
            </li>
            {filteredData &&
              filteredData.length > 0 &&
              !!filteredData[0].adviceDate ?
              filteredData.slice(0, offset).map((item, index) => renderItem(item, index)
              ) : NoResult(local_Strings.NoDataToShow)}

          </ul>
        </div>
        <FilterMoreButtonControl showMore={data.length > rowLimit &&
          offset < filteredData.length} onClickMore={() => setOffset(offset + 5)} />

      </Modal.Body>
    </Modal>
  );
}

export default InboxDetails;
