import React, { useContext, useEffect, useState } from "react";
import InboxDetails from "./NotificationsDetails";
import InboxListing from "./NotificationsListing";
import { emptyInboxDetail, IInboxDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { InboxContext } from "../../pages/Homepage";
import { localStrings as local_Strings } from "../../translations/localStrings";
import NotficationsDetails from "./NotificationsDetails";
import NotficationsListing from "./NotificationsListing";

function Notfications() {
  const [showNotficationsListing, setShowNotficationsListing] = useState(false);
  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);
  const currentContext = useContext(AuthContext);
  const InboxMessages = useContext(InboxContext);
  local_Strings.setLanguage(currentContext.language);
  const countUnreadInbox =
    InboxMessages.messages && InboxMessages.messages.length > 0
      ? InboxMessages.messages.filter((i: any) => !i.isRead).length
      : 0;

  const handleCloseNotficationsListing = () => {
    setShowNotficationsListing(false);
  };
  const handleShowNotficationsListing = () => {
    setShowNotficationsListing(true);
  };

  const [showNotficationsDetails, setshowNotficationsDetails] = useState(false);
  const handleCloseNotficationsDetails = () =>
    setshowNotficationsDetails(false);
  const handleShowNotficationsDetails = (detail: IInboxDetail) => {
    handleCloseNotficationsListing();
    setshowNotficationsDetails(true);
    setMessageDetail(detail);
  };
  const handleBackNotficationsDetails = () => {
    setshowNotficationsDetails(false);
    setShowNotficationsListing(true);
  };

  return (
    <>
      <a
        className="border border-white rounded-circle p-0 mx-1 "
        href="#"
        onClick={handleShowNotficationsListing}
      >
        <i
          className={countUnreadInbox > 0 ? "fa fa-bell unread" : "fa fa-bell"}
        />
      </a>

      {InboxMessages.messages &&
        InboxMessages.messages.length > 0 &&
        !!InboxMessages.messages[0].adviceDate && (
          <NotficationsListing
            showNotficationsListingModal={showNotficationsListing}
            hideNotficationsListingModal={handleCloseNotficationsListing}
            showNotficationsDetailsModal={handleShowNotficationsDetails}
          />
        )}
      {message && !!message.adviceDate && (
        <NotficationsDetails
          item={message}
          showNotficationsDetailsModal={showNotficationsDetails}
          hideNotficationsDetailsModal={handleCloseNotficationsDetails}
          backNotficationsListingModal={handleBackNotficationsDetails}
        />
      )}
    </>
  );
}

export default Notfications;
