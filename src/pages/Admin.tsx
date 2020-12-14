import React, { useState } from "react";
import AuthCustomHeader from "../components/header/AuthCustomHeader";
import Footer from "../components/Footer";
import ProductsAndOffersListing from "../pages/ProductsAndOffers/Listing";
import NotificationsListing from "../pages/Notifications/Listing";

function Landing() {
  const [showLeftSection, setLeftSection] = useState({
    ProductsAndOffers: true,
    Notifications: false,
  });

  return (
    <div>
      <AuthCustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-container flex-column">
                {showLeftSection.ProductsAndOffers && <ProductsAndOffersListing />}
                {showLeftSection.Notifications && <NotificationsListing />}
              </div>
              <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                <ul className="box-list" id="dataList">
                  <li className="shown">
                    <a
                      href="#"
                      className="row align-items-center"
                      onClick={() => setLeftSection({
                        ProductsAndOffers: true,
                        Notifications: false,
                      })}
                    >
                      <h6 className="mb-1 text-600">
                        Manage Products And Offers
                      </h6>
                    </a>
                  </li>
                  <li className="shown">
                    <a
                      href="#"
                      className="row align-items-center"
                      onClick={() => setLeftSection({
                        ProductsAndOffers: false,
                        Notifications: true,
                      })}
                    >
                      <h6 className="mb-1 text-600">
                        Manage Notifications
                      </h6>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
