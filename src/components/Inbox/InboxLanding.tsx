import React, { useContext, useEffect, useRef, useState } from "react";
import InboxDetails from "./InboxDetails";
import InboxListing from "./InboxListing";
import { IInboxDetail } from "../../Helpers/publicInterfaces";
import { AuthContext } from "../../providers/AuthProvider";
import { GetUserWelcomeData } from "../../services/cmsService";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { GetInboxByCIF } from "../../services/cmsService";
import Constant from "../../constants/defaultData";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";

interface iInboxLanding {
  showInboxDetailsModal: () => void;
}
function InboxLanding(inboxLandingProps: iInboxLanding) {
  const [showInboxListing, setShowInboxListing] = useState(false);

  const handleCloseInboxListing = () => {
    setShowInboxListing(false);
  };
  const handleShowInboxListing = () => {
    setShowInboxListing(true);
  };

  const [showInboxDetails, setshowInboxDetails] = useState(false);

  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = () => {
    handleCloseInboxListing();
    setshowInboxDetails(true);
    //inboxListingProps.hideInboxListingModal;
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);

    setShowInboxListing(true);
  };

  const currentContext = React.useContext(AuthContext);
  const [data, setData] = useState<IInboxDetail[]>([
    {
      adviceType: "",
      adviceDate: "",
      dateRange: "",
      description: "",
      pdfName: "",
      isRead: false,
      pdfUrl: "",
    },
  ]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    GetInboxByCIF(currentContext.cif)
      .then((responseData: IInboxDetail[]) => {
        setLoading(true);
        if (isMounted && responseData && responseData.length > 0) {
          setData(responseData);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.cif]);

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
        {data &&
          data.length > 0 &&
          data.slice(0, 3).map((item, index) =>
            <li key={index}>
              <a
                href="#"
                className="d-block"
                onClick={inboxLandingProps.showInboxDetailsModal}
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
      <InboxListing
        showInboxListingModal={showInboxListing}
        hideInboxListingModal={handleCloseInboxListing}
        showInboxDetailsModal={handleShowInboxDetails}
      ></InboxListing>
      <InboxDetails
        showInboxDetailsModal={showInboxDetails}
        hideInboxDetailsModal={handleCloseInboxDetails}
        backInboxListingModal={handleBackInboxDetails}
      ></InboxDetails>
    </div>
  );
}

export default InboxLanding;
