import React, { useContext, useState } from "react";
import InboxDetails from "./InboxDetails";
import InboxListing from "./InboxListing";
import { emptyInboxDetail, IInboxDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { InboxContext } from "../../pages/Homepage";
import { localStrings as local_Strings } from "../../translations/localStrings";

function Inbox() {

  const [message, setMessageDetail] = useState<IInboxDetail>(emptyInboxDetail);
  const currentContext = useContext(AuthContext);
  const InboxMessages = useContext(InboxContext);
  local_Strings.setLanguage(currentContext.language);
  const countUnreadInbox =
    InboxMessages.messages && InboxMessages.messages.length > 0
      ? InboxMessages.messages.filter((i: any) => !i.isRead).length
      : 0;

  const [showInboxListing, setShowInboxListing] = useState(false);
  const [showInboxDetails, setshowInboxDetails] = useState(false);

  return (
    <>
      <a
        className="border border-white rounded-circle p-0 mx-1 "
        href="#"
        onClick={() => setShowInboxListing(true)}
      >
        <i
          className={
            countUnreadInbox > 0
              ? "fa fa-envelope unread text-xs"
              : "fa fa-envelope text-xs"
          }
        />
      </a>
      {InboxMessages.messages &&
        InboxMessages.messages.length > 0 &&
        !!InboxMessages.messages[0].adviceDate && (
          <InboxListing
            showInboxListingModal={showInboxListing}
            hideInboxListingModal={() => setShowInboxListing(false)}
            showInboxDetailsModal={(detail: IInboxDetail) => {
              setShowInboxListing(false);
              setshowInboxDetails(true);
              setMessageDetail(detail);
            }}
          />
        )}
      {message && !!message.adviceDate && (
        <InboxDetails
          item={message}
          showInboxDetailsModal={showInboxDetails}
          hideInboxDetailsModal={() => {
            InboxMessages.refreshInbox();
            setshowInboxDetails(false);
          }}
          backInboxListingModal={() => {
            InboxMessages.refreshInbox();
            setshowInboxDetails(false);
            setShowInboxListing(true);
          }}
        />
      )}
    </>
  );
}

export default Inbox;
