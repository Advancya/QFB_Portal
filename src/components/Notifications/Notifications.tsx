import React, { useContext, useEffect, useState } from "react";
import NotficationsDetails from "./NotificationsDetails";
import NotficationsListing from "./NotificationsListing";
import {
  initialINotification,
  INotificationDetail
} from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { GetNotificationsByCIF } from "../../services/cmsService";

function Notfications() {
  const [showNotficationsListing, setShowNotficationsListing] = useState(false);

  const [notfications, setNotficationsListing] = useState<INotificationDetail[]>(null);
  const [notfication, setMessageDetail] = useState<INotificationDetail>(initialINotification);

  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const countUnreadNotfications = notfications && notfications.length > 0
    ? notfications.filter((i: any) => !i.isRead).length
    : 0;

  const [showNotficationDetail, setNotficationDetail] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    
    if (!!currentContext.selectedCIF) {
      refreshNotifications();
    }

  }, [currentContext.selectedCIF, currentContext.language]);

  const refreshNotifications = async () => {

    if (!!currentContext.selectedCIF) {
      setLoading(true);

      const responseData: INotificationDetail[] = await GetNotificationsByCIF(
        currentContext.selectedCIF
      );

      if (responseData && responseData.length > 0) {
        setNotficationsListing(responseData.sort((a, b) => (a.id > b.id ? -1 : 1)));
      }

      setLoading(false);
    }
  };

  return (
    <>
      <a
        className="border border-white rounded-circle p-0 mx-1 "
        href="#"
        onClick={() => setShowNotficationsListing(true)}
      >
        <i
          className={notfications && notfications.filter((i: any) => !i.isRead).length > 0 ? "fa fa-bell unread" : "fa fa-bell"}
        />
      </a>
      {notfications &&
        notfications.length > 0 &&
        <NotficationsListing
          showNotficationsListingModal={showNotficationsListing}
          hideNotficationsListingModal={() => setShowNotficationsListing(false)}
          showNotficationDetailModal={(detail: INotificationDetail) => {
            setShowNotficationsListing(false);
            setNotficationDetail(true);
            setMessageDetail(detail);
          }}
          notfications={notfications}
          reloading={isLoading}
        />}
      {notfication && notfication.id > 0 && (
        <NotficationsDetails
          item={notfication}
          showNotficationDetailModal={showNotficationDetail}
          hideNotficationDetailModal={() => {
            refreshNotifications();
            setNotficationDetail(false);
          }}
          backNotficationsListingModal={() => {
            refreshNotifications();
            setNotficationDetail(false);
            setShowNotficationsListing(true);
          }}
        />
      )}
    </>
  );
}

export default Notfications;
