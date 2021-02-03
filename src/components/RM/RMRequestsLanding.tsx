import React, { useContext, useEffect, useState } from "react";
import RMRequestListing from "./RMRequestListing";
import RMRequestDetails from "./RMRequestDetails";
import RMTranactionDetails from "./RMTranactionDetails";
import RMOfferDetails from "./RMOfferDetails";
import {
  GetRmRequestList,
  GetRmTransactionList,
  GetRmOffersList
} from "../../services/cmsService";
import { iRmRequests } from "../../Helpers/publicInterfaces";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import moment from "moment";

const RM = () => {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [isLoading, setLoading] = useState(false);
  const [showRMListing, setShowRMListing] = useState(true);
  const [showRequestDetail, setRequestDetail] = useState(false);
  const [showTransactionDetail, setTransactionDetail] = useState(false);
  const [showOfferRequests, setOfferRequests] = useState(false);
  const [requests, setRequests] = React.useState<iRmRequests[]>([]);
  const [tranactions, setTransactions] = React.useState<iRmRequests[]>([]);
  const [offers, setOffers] = React.useState<iRmRequests[]>([]);
  const [itemId, selectItemId] = useState<number>(0);

  useEffect(() => {
    const initialLoadMethod = async () => {

      await fetchRequestsForRM();
      await fetchTransactionsForRM();
      await fetchOfferRequestForRM();

    };

    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

  }, [currentContext.selectedCIF, currentContext.language]);

  const fetchRequestsForRM = async () => {
    setLoading(true);
    const requestsItems: iRmRequests[] = [];

    GetRmRequestList(currentContext.selectedCIF)
      .then((requests: []) => {
        if (requests && requests.length > 0) {
          for (let index = 0; index < requests.length; index++) {
            requestsItems.push({
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
          setRequests(requestsItems);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const fetchTransactionsForRM = async () => {
    setLoading(true);
    const tranactionItems: iRmRequests[] = [];

    GetRmTransactionList(currentContext.selectedCIF)
      .then((transactions: []) => {
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
          setTransactions(tranactionItems);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  const fetchOfferRequestForRM = async () => {
    setLoading(true);
    const offersItems: iRmRequests[] = [];

    GetRmOffersList(currentContext.selectedCIF)
      .then((offers: []) => {
        if (offers && offers.length > 0) {
          for (let index = 0; index < offers.length; index++) {
            offersItems.push({
              cif: offers[index]["cif"],
              requestCreateDate: offers[index]["requestCreateDate"],
              customerMobile: offers[index]["customerMobile"],
              customerName: offers[index]["customerName"],
              id: offers[index]["id"],
              requestStatus: offers[index]["requestStatus"],
              requestStatusAr: offers[index]["requestStatusAR"],
              requestSubject: offers[index]["requestSubject"],
              requestSubjectAr: offers[index]["requestSubjectAR"],
              type: "Offers",
              requestTypeId: "",
              isRead:
                offers[index]["isRead"] !== null ? offers[index]["isRead"] : false,
            });
          }
          setOffers(offersItems);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {((requests && requests.length > 0)
        || (tranactions && tranactions.length > 0)
        || (offers && offers.length > 0))
        &&
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
          showOfferDetailModal={(itemId: number) => {
            setShowRMListing(false);
            setOfferRequests(true);
            selectItemId(itemId);
          }}
          backRMRequestListingModal={() => setShowRMListing(false)}
          requests={[...requests, ...tranactions, ...offers].sort((a, b) => (
            moment(b.requestCreateDate).toDate().getTime() -
            moment(a.requestCreateDate).toDate().getTime()
          ))
          }
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
              fetchTransactionsForRM();
            }}
            backRMDetailsgModal={() => {
              setTransactionDetail(false);
              setShowRMListing(true);
              fetchTransactionsForRM();
            }}
            itemId={itemId}
          />
          <RMOfferDetails
            showRMDetailsModal={showOfferRequests}
            hideRMDetailsModal={() => {
              setOfferRequests(false);
              fetchOfferRequestForRM();
            }}
            backRMDetailsgModal={() => {
              setOfferRequests(false);
              setShowRMListing(true);
              fetchOfferRequestForRM();
            }}
            itemId={itemId}
          />
        </React.Fragment> : null
      }
    </div>
  );
}

export default RM;
