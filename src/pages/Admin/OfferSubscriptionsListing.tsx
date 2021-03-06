import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { GetAllOfferSubscriptions } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import {
  IOfferSubscriptions,
} from "../../Helpers/publicInterfaces";
import CustomHeader from "../../components/header/CustomHeader";
import Footer from "../../components/Footer";
import dateIcon from "../../images/calendar-inactive.png";
import LoadingOverlay from "react-loading-overlay";
import PuffLoader from "react-spinners/PuffLoader";
import Constant from "../../constants/defaultData";

function OfferSubscriptionsListing() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [data, setData] = useState<IOfferSubscriptions[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  const refreshList = () => {
    GetAllOfferSubscriptions()
      .then((responseData: IOfferSubscriptions[]) => {
        if (responseData) {
          setData(
            responseData.sort((a, b) =>
              moment(b.subscriptionDate).diff(moment(a.subscriptionDate))
            )
          );
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <CustomHeader />
      <Breadcrumb pageName={""} />
      <div className="d-flex align-items-center">
        <div className="ib-text">
          <h3 className="mb-2">{local_Strings.OfferSubscriptionsTite}</h3>
        </div>
      </div>

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
        <ul className="box-list" id="dataList">
          <li className="shown">
            <div className="row">
              <div className="col-6 col-sm-2">
                <h6 className="mb-1 text-600">
                  {local_Strings.OfferSubscriptionsDateLabel}
                </h6>
              </div>
              <div className="col-2 col-sm-4">
                <h6 className="mb-1 text-600">
                  {local_Strings.OfferSubscriptionsRequestLabel}
                </h6>
              </div>
              <div className="col-2 col-sm-2">
                <h6 className="mb-1 text-600">
                  {local_Strings.OfferSubscriptionsOfferLabel}
                </h6>
              </div>
              <div className="col-2 col-sm-2">
                <h6 className="mb-1 text-600">
                  {local_Strings.OfferSubscriptionsAmountLabel}
                </h6>
              </div>
              <div className="col-2 col-sm-2">
                <h6 className="mb-1 text-600">
                  {local_Strings.OfferSubscriptionsCurrencyLabel}
                </h6>
              </div>
            </div>
          </li>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <li className="shown" key={index}>
                <div className="row">
                  <div className="col-6 col-sm-2">
                    <h6 className="mb-1">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        {item.subscriptionDate
                          ? moment(item.subscriptionDate).format(
                            "dddd DD MM YYYY"
                          )
                          : ""}
                      </span>
                    </h6>
                  </div>
                  <div className="col-2 col-sm-4">
                    <h6 className="mb-1">{item.subscriptionRequest || ""}</h6>
                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">{item.offer || ""}</h6>
                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">{item.subscriptionAmount || ""}</h6>
                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">{item.currency || ""}</h6>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default OfferSubscriptionsListing;
