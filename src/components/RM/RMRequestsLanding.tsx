import React, { useContext, useEffect, useState } from "react";
import RMRequestListing from "./RMRequestListing";
import RMRequestDetails from "./RMRequestDetails";
import RMTranactionDetails from "./RMTranactionDetails";
import {
  GetRmRequestList,
  GetRmTransactionList,
} from "../../services/cmsService";
import { iRmRequests } from "../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";

const RM = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [showRMListing, setShowRMListing] = useState(true);
  const [showRequestDetail, setRequestDetail] = useState(false);
  const [showTransactionDetail, setTransactionDetail] = useState(false);
  const [requestList, setRequestList] = React.useState<iRmRequests[]>([]);
  const [itemId, selectItemId] = useState<number>(0);
  useEffect(() => {

    if (!!currentContext.selectedCIF) {
      fetchRequestsForRM();
    }

  }, [currentContext.selectedCIF]);

  const fetchRequestsForRM = async () => {
    setLoading(true);
    const items: iRmRequests[] = [];
    const tranactionItems: iRmRequests[] = [];
    setRequestList([]);

    const requests = await GetRmRequestList(currentContext.selectedCIF);
    if (requests && requests.length > 0) {
      for (let index = 0; index < requests.length; index++) {
        items.push({
          cif: requests[index]["cif"],
          requestCreateDate: requests[index]["crequestCreateDate"],
          customerMobile: requests[index]["customerMobile"],
          customerName: requests[index]["customerName"],
          id: requests[index]["id"],
          requestStatus: requests[index]["requestStatus"],
          requestStatusAr: requests[index]["requestStatusAr"],
          requestSubject: requests[index]["requestSubject"],
          requestSubjectAr: requests[index]["requestSubjectAr"],
          type: "Request",
          requestTypeId: requests[index]["requestTypeId"],
          isRead:
            requests[index]["isRead"] !== null
              ? requests[index]["isRead"]
              : false,
        });
      }
    }
    const transactions = await GetRmTransactionList(currentContext.selectedCIF);
    if (transactions && transactions.length > 0) {
      for (let index = 0; index < transactions.length; index++) {
        tranactionItems.push({
          cif: transactions[index]["cif"],
          requestCreateDate: transactions[index]["transactionDate"],
          customerMobile: transactions[index]["customerMobile"],
          customerName: transactions[index]["customerName"],
          id: transactions[index]["id"],
          requestStatus: transactions[index]["requestStatus"],
          requestStatusAr: transactions[index]["requestStatusAR"],
          requestSubject: transactions[index]["requestSubject"],
          requestSubjectAr: transactions[index]["requestSubjectAR"],
          type: "Tranasction",
          requestTypeId: transactions[index]["requestTypeId"],
          isRead:
            transactions[index]["isRead"] !== null
              ? transactions[index]["isRead"]
              : false,
        });
      }
    }

    setRequestList([...items, ...tranactionItems]);
    setLoading(false);
  };

  return (
    <div>
      {requestList && requestList.length > 0 &&
        <RMRequestListing
          showRMRequestListingModal={showRMListing}
          hideRMRequestListingModal={() => setShowRMListing(false)}
          showRequestDetailModal={(itemId: number) => {
            setShowRMListing(false);
            setRequestDetail(true);
            selectItemId(itemId);
          }}
          showTransactionDetailModal={(itemId: number) => {
            setShowRMListing(false);
            setTransactionDetail(true);
            selectItemId(itemId);
          }}
          backRMRequestListingModal={() => setShowRMListing(false)}
          requests={requestList}
          reloading={isLoading}
        />
      }
      {itemId && itemId > 0 ?
        <React.Fragment >
          <RMRequestDetails
            showRMDetailsModal={showRequestDetail}
            hideRMDetailsModal={() => {
              setRequestDetail(false);
              fetchRequestsForRM();
            }}
            backRMDetailsgModal={() => {
              setRequestDetail(false);
              setShowRMListing(true);
              fetchRequestsForRM();
            }}
            itemId={itemId}
          />
          <RMTranactionDetails
            showRMDetailsModal={showTransactionDetail}
            hideRMDetailsModal={() => {
              setTransactionDetail(false);
              fetchRequestsForRM();
            }}
            backRMDetailsgModal={() => {
              setTransactionDetail(false);
              setShowRMListing(true);
              fetchRequestsForRM();
            }}
            itemId={itemId}
          />
        </React.Fragment> : null
      }
    </div>
  );
}

export default RM;
