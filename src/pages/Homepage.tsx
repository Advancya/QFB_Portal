import React, { useState } from "react";
import Footer from "../components/Footer";
import AuthCustomHeader from "../components/header/AuthCustomHeader";
import Breadcrumb from "../components/Breadcrumb";
import AssetsLanding from "../components/assets/AssetsLanding";
import LiabilitiesLanding from "../components/liabilities/LiabilitiesLanding";
import TotalNetWorth from "../components/TotalNetWorth";
import RelationManger from "../components/RelationManger";
import InboxLanding from "../components/Inbox/InboxLanding";
import InboxDetails from "../components/Inbox/InboxDetails";
import InboxListing from "../components/Inbox/InboxListing";

function HomePage() {
  const [showInboxDetails, setshowInboxDetails] = useState(false);

  const handleCloseInboxDetails = () => setshowInboxDetails(false);
  const handleShowInboxDetails = () => {
    setshowInboxDetails(true);
    //inboxListingProps.hideInboxListingModal;
  };
  const handleBackInboxDetails = () => {
    setshowInboxDetails(false);
  };

  return (
    <div>
      <AuthCustomHeader />
      <Breadcrumb />
      <section id="main-section" className="main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="main-container">
                <AssetsLanding />
                <div className="row">
                  <LiabilitiesLanding />
                  <TotalNetWorth />
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sidebar-container">
                <InboxLanding showInboxDetailsModal={handleShowInboxDetails} />
                <RelationManger />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <InboxDetails
        showInboxDetailsModal={showInboxDetails}
        hideInboxDetailsModal={handleCloseInboxDetails}
        backInboxListingModal={handleBackInboxDetails}
      ></InboxDetails>
    </div>
  );
}

export default HomePage;
