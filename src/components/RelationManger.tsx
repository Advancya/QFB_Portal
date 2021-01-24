import React, { useContext, useEffect, useRef, useState } from "react";
import phoneIcon from "../images/phone-fill.svg";
import messageIcon from "../images/message.svg";
import cellPhoneIcon from "../images/cell-phone.svg";
import emailIcon from "../images/email.svg";
import { Carousel } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import { GetUserWelcomeData } from "../services/cmsService";
import { localStrings as local_Strings } from "../translations/localStrings";
import { RequestCallback } from "../services/requestService";
import Swal from "sweetalert2";

interface IUserInfo {
  accountOfficer?: string;
  customerShortName?: string;
  id?: string;
  name: string;
  telephone: string;
  rmMobile: string;
  rmEmail: string;
  //callmeBackLink: string;
}

function RelationManger() {
  const [index, setIndex] = useState(0);
  const currentContext = useContext(AuthContext);
  const [carouselItems, setCarouselItems] = useState<IUserInfo[]>([]);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    let isMounted = true;
    const initialLoadMethod = async () => {
      GetUserWelcomeData(currentContext.selectedCIF).then((s) => {
        if (isMounted) {
          setCarouselItems(s);
        }
      });
    }
    if (!!currentContext.selectedCIF) {
      initialLoadMethod();
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

  }, [currentContext.selectedCIF, currentContext.language]);

  return (
    <Carousel
      id="carouselExampleIndicators"
      className="carousel slide"
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
    >
      {carouselItems &&
        carouselItems.length > 0 &&
        carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="box min-h-24">
              <div className="box-header">
                <h3>{local_Strings.WelcomeScreenTitle}</h3>
              </div>
              <ul className="box-list">
                <li>
                  <div className="box-list-details">
                    <h5> {local_Strings.WelcomeScreenRMNameLabel}</h5>
                    <h6 className="">{item.name || ""}</h6>
                  </div>
                </li>
                <li>
                  <div className="box-list-details">
                    <div className="row no-gutters align-items-center">
                      <div className="col-8">
                        <h5> {local_Strings.WelcomeScreenRMPhoneLabel}</h5>
                        <h6 className="">{item.telephone || ""}</h6>
                      </div>
                      <div className="col-4 text-right">
                        <a href="#" className="actionIcon">
                          <img src={phoneIcon} className="img-fluid" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="box-list-details">
                    <div className="row no-gutters align-items-center">
                      <div className="col-6">
                        <h5>{local_Strings.WelcomeScreenRMMobileLabel}</h5>
                        <h6 className="">{item.rmMobile || ""}</h6>
                      </div>
                      <div className="col-6 text-right">
                        <a href="#" className="actionIcon mx-1">
                          {local_Strings.WelcomeScreenSMS}
                          <img src={messageIcon} className="img-fluid" />
                        </a>
                        <a href="#" className="actionIcon mx-1">
                          {local_Strings.WelcomeScreenCall}
                          <img src={cellPhoneIcon} className="img-fluid" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="box-list-details">
                    <div className="row no-gutters align-items-center">
                      <div className="col-10">
                        <h5>{local_Strings.WelcomeScreenEmail}</h5>
                        <h6 className="text-break d-block">
                          {item.rmEmail || ""}
                        </h6>
                      </div>
                      <div className="col-2 text-right">
                        <a href="#" className="actionIcon">
                          <img src={emailIcon} className="img-fluid" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="text-center px-3">
                <a className="btn btn-primary btn-block" href="#"
                  onClick={() => {
                    if (currentContext.userRole === "CUSTOMER") {
                      RequestCallback(
                        item.name || "",
                        currentContext.selectedCIF || "",
                        item.customerShortName || "",
                        item.rmEmail || "",
                        item.rmMobile || ""
                      );
                      Swal.fire({
                        position: "center",
                        icon: "success",                        
                        title: local_Strings.WelcomeScreenPopUpTitle,
                        text: local_Strings.WelcomeScreenPopUpMessage,
                        showConfirmButton: true,
                        cancelButtonText: local_Strings.WelcomeScreenClose,
                      });
                    }
                  }}>
                  {local_Strings.WelcomeScreenCallMeBackLabel}
                </a>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default RelationManger;
