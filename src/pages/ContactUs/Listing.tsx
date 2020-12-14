import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb";
import { GetAllContactUs } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import { emptyContactUs, IContactUs } from "../../Helpers/publicInterfaces";
import CustomHeader from "../../components/header/CustomHeader";
import Footer from "../../components/Footer";

function ContactUsListing() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<IContactUs[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const refreshList = () => {
    GetAllContactUs()
      .then((responseData: IContactUs[]) => {
        if (responseData) {
          setData(
            responseData.sort((a, b) => b.name.localeCompare(a.name))
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
      <CustomHeader />
      <Breadcrumb pageName={""} />
      <div className="d-flex align-items-center">
        <div className="ib-text">
          <h3 className="mb-2">{local_Strings.ContactUsTite}</h3>
        </div>
      </div>


      <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
        <ul className="box-list" id="dataList">
          <li className="shown">
            <div className="row">
              <div className="col-6 col-sm-6">
                <h6 className="mb-1 text-600">
                  {local_Strings.ContactUsNameLabel}
                </h6>

              </div>
              <div className="col-2 col-sm-2">
                <h6 className="mb-1 text-600">
                  {local_Strings.ContactUsMobileLabel}
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
          {
            data && data.length > 0 &&
            data.map((item, index) =>

              <li className="shown" key={index}>
                <div className="row">
                  <div className="col-6 col-sm-6">

                    <h6 className="mb-1">
                      {item.name || ""}
                    </h6>

                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">
                      {item.mobile || ""}
                    </h6>
                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">
                      {item.email || ""}
                    </h6>
                  </div>
                  <div className="col-2 col-sm-2">
                    <h6 className="mb-1">
                      {item.country || ""}
                    </h6>
                  </div>
                </div>
              </li>
            )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsListing;
