import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import Breadcrumb from "../../components/Breadcrumb";
import { GetNotificationsAll } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import NotificationsForm from "../../components/Notifications/NotificationsForm";
import { emptyNotificationsDetail, INotificationsDetail } from "../../Helpers/publicInterfaces";

function NotificationsListing() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<INotificationsDetail[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [formAttributes, setFormAttributes] = useState({
    showForm: false,
    showEditable: false,
    selectedItem: emptyNotificationsDetail,
  })
  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const refreshList = () => {
    GetNotificationsAll()
      .then((responseData: INotificationsDetail[]) => {
        if (responseData) {
          setData(
            responseData.filter((d) => new Date(d.expiryDate) > new Date()).sort((a, b) => moment(b.messageSendDate).diff(moment(a.messageSendDate)))
          );
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  }


  return (
    <div>
      <Breadcrumb pageName={local_Strings.NotificationsListingTitle} />
      <div className="d-flex align-items-center">
        <div className="ib-text">
          <h3 className="mb-2">{local_Strings.NotificationsListingTitle}</h3>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary mt-1" style={{ marginLeft: 50 }}
          onClick={() => setFormAttributes({
            selectedItem: emptyNotificationsDetail,
            showForm: true,
            showEditable: true
          })}
        >
          {local_Strings.NotificationsAddNew}
        </button>
      </div>


      <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
        <ul className="box-list" id="dataList">
          {
            data && data.length > 0 &&
            data.map((item, index) =>

              <li className="shown" key={index}>
                <a
                  href="#"
                  className="row align-items-center"
                  onClick={() => setFormAttributes({
                    selectedItem: item,
                    showForm: true,
                    showEditable: false
                  })}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        {item.messageSendDate
                          ? moment(item.messageSendDate).format("dddd DD MM YYYY")
                          : ""}
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      {local_Strings.NotificationsSubjectLabel + " " +
                        item.messageSubTitle}
                    </h6>
                    <div className="text-15">
                      {local_Strings.NotificationsExpireLabel +  " " + (item.expiryDate
                        ? moment(item.expiryDate).format("DD-MM-YYYY")
                        : "")}
                    </div>
                  </div>
                </a>

              </li>
            )}
        </ul>
      </div>
      <NotificationsForm
        item={formAttributes.selectedItem}
        show={formAttributes.showForm}
        editable={formAttributes.showEditable}
        OnHide={() => setFormAttributes({
          ...formAttributes, showForm: false
        })
        }
        OnBack={() => setFormAttributes({
          ...formAttributes, showForm: false
        })
        }
        refreshList={() => refreshList()}
      />
    </div>
  );
}

export default NotificationsListing;
