import React, { useState } from "react";
import AuthCustomHeader from "../components/header/AuthCustomHeader";
import Footer from "../components/Footer";
import ProductsAndOffersListing from "../pages/ProductsAndOffers/Listing";
import NotificationsListing from "../pages/Notifications/Listing";
import OffersListing from "../pages/Offers/Listing";

function Landing() {
  const [showLeftSection, setLeftSection] = useState({
    ProductsAndOffers: true,
    Notifications: false,
    Offers: false,
  });

  return (
    <div>
      <AuthCustomHeader />
      <div>
        <div id="main-section" className="main-section pt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-container flex-column">
                {showLeftSection.ProductsAndOffers && (
                  <ProductsAndOffersListing />
                )}
                {showLeftSection.Notifications && <NotificationsListing />}
                {showLeftSection.Offers && <OffersListing />}
              </div>
              <div className="col-lg-4 col-container flex-column loginSideBoxBoxes">
                <div className="box pb-0 min-h-16">
                  <div className="box-header">
                    <h3>Admin Sections</h3>
                  </div>
                  <ul className="box-list" id="dataList">
                    <li className="shown">
                      <a
                        href="#"
                        className="row align-items-center"
                        onClick={() =>
                          setLeftSection({
                            ProductsAndOffers: true,
                            Notifications: false,
                            Offers: false,
                          })
                        }
                      >
                        <h6 className="mb-1">Manage Products And Offers</h6>
                      </a>
                    </li>
                    <li className="shown">
                      <a
                        href="#"
                        className="row align-items-center"
                        onClick={() =>
                          setLeftSection({
                            ProductsAndOffers: false,
                            Notifications: true,
                            Offers: false,
                          })
                        }
                      >
                        <h6 className="mb-1">Manage Notifications</h6>
                      </a>
                    </li>
                    <li className="shown">
                      <a
                        href="#"
                        className="row align-items-center"
                        onClick={() =>
                          setLeftSection({
                            ProductsAndOffers: false,
                            Notifications: false,
                            Offers: true,
                          })
                        }
                      >
                        <h6 className="mb-1">Manage Offers</h6>
                      </a>
                    </li>
                  </ul>
                </div>
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
