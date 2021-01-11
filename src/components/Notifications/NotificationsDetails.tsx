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
import dumyimg from "../../images/NewsImg.jpg";
import xIcon from "../../images/x-icon.svg";

import {
  GetInboxByCIFAndType,
  SetInboxItemAsRead,
} from "../../services/cmsService";
import axios from "axios";
import * as helper from "../../Helpers/helper";
import NoResult from "../../shared/NoResult";
import FilterMoreButtonControl from "../../shared/FilterMoreButtonControl";
import { InboxContext } from "../../pages/Homepage";

interface iNotficationsDetails {
  showNotficationsDetailsModal: boolean;
  hideNotficationsDetailsModal: () => void;
  backNotficationsListingModal: () => void;
  item: IInboxDetail;
}

function NotficationsDetails(props: iNotficationsDetails) {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const InboxMessages = useContext(InboxContext);
  const [data, setData] = useState<IInboxDetail[]>([emptyInboxDetail]);
  const [filteredData, setFilteredData] = useState<IInboxDetail[]>([
    emptyInboxDetail,
  ]);
  const rowLimit: number = Constant.RecordPerPage;
  const [offset, setOffset] = useState<number>(
    data.length < rowLimit ? data.length : rowLimit
  );
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
              i.description !== props.item.description &&
              i.pdfName !== props.item.pdfName
          );

          setData(previousItems);
          setFilteredData(previousItems);
          if (previousItems.length < rowLimit) {
            setOffset(previousItems.length);
          }
          InboxMessages.refresh();
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
                ? moment(item.adviceDate).format("dddd DD MMM YYYY")
                : ""}
            </span>
          </div>
          <h6 className="mb-1 text-600">{item.description || ""}</h6>
          <div className="text-15">{item.dateRange || ""}</div>
        </div>
        <div className="col-md-4 text-right">
          <a
            className="download-link d-inline-block "
            target="_blank"
            href={item.pdfUrl || "#"}
          >
            <i className="mx-1 fa fa-file color-white"></i>
            <i className="mx-1 fa fa-download color-white"></i>
          </a>
        </div>
      </div>
    </li>
  );

  return (
    <Modal
      show={props.showNotficationsDetailsModal}
      onHide={props.hideNotficationsDetailsModal}
      //  size="lg"
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
                onClick={props.backNotficationsListingModal}
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.NotificationsDetailsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={props.hideNotficationsDetailsModal}
        >
          <img src={xIcon} width="15" />
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
                <div className="col-sm-12 ">
                  <div className="mb-1 d-flex align-items-center">
                    <span className="mx-1 text-15 color-grey">
                      {props.item.adviceDate
                        ? moment(props.item.adviceDate).format("DD/MM/YYYY")
                        : ""}
                    </span>
                  </div>
                  <h6 className="mb-1 text-600">
                    {props.item.description || ""}
                  </h6>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-3">
            <p className="color-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <img src={dumyimg} className="img-fluid rounded w-50" />
            <ul className="color-grey m-3">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NotficationsDetails;
