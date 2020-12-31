import React, { useState } from "react";
import BeneficiariesListing from "./BeneficiariesListing";
import BeneficiariesDetails from "./BeneficiariesDetails";
import NewBeneficiary from "./NewBeneficiaries";
interface iBeneficiaries {
  showBeneficiariesListingModal?: () => void;
}
function Beneficiaries(props: iBeneficiaries) {
  const [showBeneficiariesListing, setShowBeneficiariesListing] = useState(
    false
  );
  const [showBeneficiariesDetails, setshowBeneficiariesDetails] = useState(
    false
  );
  const [showNewBeneficiary, setShowNewBeneficiary] = useState(false);
  const [itemId, setItemId] = useState<number>();

  return (
    <div>

      <BeneficiariesListing
        showBeneficiariesListingModal={showBeneficiariesListing}
        hideBeneficiariesListingModal={() => setShowBeneficiariesListing(false)}
        showBeneficiariesDetailsModal={(itemId: number) => {
          setShowBeneficiariesListing(false);
          setshowBeneficiariesDetails(true);
          setItemId(itemId);
        }}
        backBeneficiariesListingModal={() => setShowBeneficiariesListing(false)}
        showNewBeneficiaryModal={() => {
          setShowBeneficiariesListing(false);
          setShowNewBeneficiary(true);
        }}
      />
      {itemId && itemId > 0 &&
        <BeneficiariesDetails
          showBeneficiariesDetailsModal={showBeneficiariesDetails}
          hideBeneficiariesDetailsModal={() => setshowBeneficiariesDetails(false)}
          backBeneficiariesDetailsgModal={() => {
            setshowBeneficiariesDetails(false);
            setShowBeneficiariesListing(true);
          }}
          showNewBeneficiaryModal={() => {
            setShowBeneficiariesListing(false);
            setShowNewBeneficiary(true);
          }}
          itemId={itemId}
        />
      }
      <NewBeneficiary
        showNewBeneficiaryModal={showNewBeneficiary}
        hideNewBeneficiaryModal={() => setShowNewBeneficiary(false)}
        backNewBeneficiaryModal={() => {
          setShowNewBeneficiary(false);
          setShowBeneficiariesListing(true);
        }}
      />
    </div>
  );
}

export default Beneficiaries;
