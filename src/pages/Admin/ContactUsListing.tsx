import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { GetAllContactUs } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import { IContactUs } from "../../Helpers/publicInterfaces";
import AdminCustomHeader from "../../components/header/AdminCustomHeader";
import Footer from "../../components/Footer";

function ContactUsListing() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<IContactUs[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [currentContext.selectedCIF, currentContext.language]);

  const refreshList = () => {
    GetAllContactUs()
      .then((responseData: IContactUs[]) => {
        if (responseData) {
          const _data = responseData.sort((a, b) =>
            moment(b.createDate).diff(moment(a.createDate))
          );

          setData(_data);
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <AdminCustomHeader />
      <Breadcrumb pageName={""} />
      <div className="main-section">
        <div className="d-flex align-items-center my-3">
          <div className="ib-text">
            <h3 className="mb-2">{local_Strings.ContactUsTite}</h3>
          </div>
        </div>

        <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
          <ul className="box-list" id="dataList">
            <li className="shown">
              <div className="row">
                <div className="col-2 col-sm-2">
                  <h6 className="mb-1 text-600">
                    {local_Strings.ContactUsCreatedDateLabel}
                  </h6>
                </div>
                <div className="col-2 col-sm-2">
                  <h6 className="mb-1 text-600">
                    {local_Strings.ContactUsNameLabel}
                  </h6>
                </div>
                <div className="col-3 col-sm-3">
                  <h6 className="mb-1 text-600">
                    {local_Strings.ContactUsQueryLabel}
                  </h6>
                </div>
                <div className="col-1 col-sm-1">
                  <h6 className="mb-1 text-600">
                    {local_Strings.WelcomeScreenRMMobileLabel}
                  </h6>
                </div>
                <div className="col-2 col-sm-2">
                  <h6 className="mb-1 text-600">
                    {local_Strings.ContactUsEmailAddressLabel}
                  </h6>
                </div>
                <div className="col-2 col-sm-2">
                  <h6 className="mb-1 text-600">
                    {local_Strings.ContactUsCountryLabel}
                  </h6>
                </div>
              </div>
            </li>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <li className="shown" key={index}>
                  <div className="row">
                    <div className="col-2 col-sm-2">
                      <h6 className="mb-1">
                        {item.createDate
                          ? moment(item.createDate).format("dddd DD MM YYYY")
                          : ""}
                      </h6>
                    </div>
                    <div className="col-2 col-sm-2">
                      <h6 className="mb-1">{item.name || ""}</h6>
                    </div>
                    <div className="col-3 col-sm-3">
                      <h6 className="mb-1">{item.query || ""}</h6>
                    </div>
                    <div className="col-1 col-sm-1">
                      <h6 className="mb-1">{item.mobile || ""}</h6>
                    </div>
                    <div className="col-2 col-sm-2">
                      <h6 className="mb-1 text-break">{item.email || ""}</h6>
                    </div>
                    <div className="col-2 col-sm-2">
                      <h6 className="mb-1">{item.country || ""}</h6>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsListing;
