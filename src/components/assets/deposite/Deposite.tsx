import React, { useContext, useState } from "react";

import depositIcon from "../../../images/deposit-icon.svg";
import { Button, Modal } from "react-bootstrap";
import DepositeListing from "./DepositeListing";
import DepositeDetails from "./DepositeDetails";
import DepositeRecievedProfit from "./DepositeRecievedProfit";
import { AuthContext } from "../../../providers/AuthProvider";
import { PortfolioContext } from "../../../pages/Homepage";
import { localStrings as local_Strings } from "../../../translations/localStrings";
import { IDeposit } from "../../../Helpers/publicInterfaces";

function Deposite() {
  const currentContext = useContext(AuthContext);
  const userPortfolio = useContext(PortfolioContext);
  const [depositItem, selectItemFromList] = useState<IDeposit>(null);

  const [showDepositeListing, setShowDepositeListing] = useState(false);
  const [showDepositeDetails, setshowDepositeDetails] = useState(false);
  const [showDepositeRecievedProfit, setShowDepositeRecievedProfit] = useState(
    false
  );

  return (
    <div className="col-lg-4">
      <div className="inner-box">
        <div className="d-flex align-items-center">
          <div className="ib-icon">
            <img src={depositIcon} className="img-fluid" />
          </div>
          <a
            href="#"
            className="ib-text"
            onClick={() => {
              if (
                !!userPortfolio.totalDeposits &&
                userPortfolio.totalDeposits !== "0"
              ) {
                setShowDepositeListing(true);
              }
            }}
          >
            <h4>{local_Strings.PortfolioAssetsOption3}</h4>
            <h5>
              {(userPortfolio.totalDeposits || "0") +
                " " +
                currentContext.userSettings.currency}
            </h5>
          </a>
        </div>
      </div>

      <DepositeListing
        showDepositeListingModal={showDepositeListing}
        hideDepositeListingModal={() => setShowDepositeListing(false)}
        showDepositeDetailsModal={(depositItem: IDeposit) => {
          setShowDepositeListing(false);
          setshowDepositeDetails(true);
          selectItemFromList(depositItem);
        }}
      />
      {depositItem && !!depositItem && (
        <React.Fragment>
          <DepositeDetails
            showDepositeDetailsModal={showDepositeDetails}
            hideDepositeDetailsModal={() => setshowDepositeDetails(false)}
            backDepositeListingModal={() => {
              setshowDepositeDetails(false);
              setShowDepositeListing(true);
            }}
            showDepositeRecievedProfit={() => {
              setshowDepositeDetails(false);
              setShowDepositeRecievedProfit(true);
            }}
            depositItem={depositItem}
          />
          <DepositeRecievedProfit
            showDepositeRecievedProfitModal={showDepositeRecievedProfit}
            hideDepositeRecievedProfitModal={() =>
              setShowDepositeRecievedProfit(false)
            }
            backDepositeRecievedProfitModal={() => {
              setShowDepositeRecievedProfit(false);
              setshowDepositeDetails(true);
            }}
            depositItem={depositItem}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default Deposite;
