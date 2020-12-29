import React, { useContext, useEffect, useState } from "react";
import InboxDetails from "./InboxDetails";
import InboxListing from "./InboxListing";
import { emptyInboxDetail, IInboxDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { InboxContext } from "../../pages/Homepage";
import { localStrings as local_Strings } from "../../translations/localStrings";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";

interface iInboxLanding {
  showInboxDetailsModal: (detail: IInboxDetail) => void;
}

function InboxLanding(props: iInboxLanding) {
  const [showInboxListing, setShowInboxListing] = useState(false);
  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);
  const currentContext = useContext(AuthContext);
  const InboxMessages = useContext(InboxContext);
  const [isLoading, setLoading] = useState(false);
  local_Strings.setLanguage(currentContext.language);

  const handleCloseInboxListing = () => {
    setShowInboxListing(false);
  };
  const handleShowInboxListing = () => {
    setShowInboxListing(true);
  };

  const [showInboxDetails, setshowInboxDetails] = useState(false);
  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = (detail: IInboxDetail) => {
    handleCloseInboxListing();
    setshowInboxDetails(true);
    setMessageDetail(detail);
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);
    setShowInboxListing(true);
  };


  return (
    <div className="box pb-0 min-h-16">
      <div className="box-header">
        <h3>{local_Strings.landingInboxTitle}</h3>
        <a href="#" className="viewLink" onClick={handleShowInboxListing}>
          {local_Strings.landingMore} <i className="fa fa-arrow-right"></i>
        </a>
      </div>
      <LoadingOverlay
        active={isLoading}
        spinner={
          <PuffLoader
            size={Constant.SpnnerSize}
            color={Constant.SpinnerColor}
          />
        }
      />
      <ul className="box-list">
        {InboxMessages.messages &&
          InboxMessages.messages.length > 0 &&
          InboxMessages.messages.slice(0, 3).map((item, index) =>
            <li key={index}>
              <a
                href="#"
                className="d-block"
                onClick={() => props.showInboxDetailsModal(item)}
              >
                <h4>
                  <span className={!item.isRead
                    ? "unread" : ""}>{item.adviceType || ""}</span>
                  <small>{item.adviceDate
                    ? moment(item.adviceDate).format(
                      "DD/MM/YYYY h:mm a"
                    )
                    : ""}</small>
                </h4>
                <p>{item.description || ""}</p>
              </a>
            </li>)
        }
      </ul>
      {InboxMessages.messages && InboxMessages.messages.length > 0
        && !!InboxMessages.messages[0].adviceDate &&
        <InboxListing
          showInboxListingModal={showInboxListing}
          hideInboxListingModal={handleCloseInboxListing}
          showInboxDetailsModal={handleShowInboxDetails}
        />
      }
      {message && !!message.adviceDate &&
        <InboxDetails
          item={message}
          showInboxDetailsModal={showInboxDetails}
          hideInboxDetailsModal={handleCloseInboxDetails}
          backInboxListingModal={handleBackInboxDetails}
        />}
    </div>
  );
}

export default InboxLanding;
