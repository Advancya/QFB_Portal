import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { useHistory } from "react-router-dom";

import AnnonymousTerms from "./AnnonymousTerms/AnnonymousTerms";

function Footer() {
  const [showAnnonymousTerms, setShowAnnonymousTerms] = useState(false);

  const handleCloseAnnonymousTerms = () => {
    setShowAnnonymousTerms(false);
  };
  const handleShowAnnonymousTerms = () => {
    setShowAnnonymousTerms(true);
  };

  return (
    <footer className="footer">
      <div className="belowFooter">
        {local_Strings.footerTxt}

        <a href="#" onClick={handleShowAnnonymousTerms}>
          {" "}
          {local_Strings.footerTxtTerms}
        </a>
        <AnnonymousTerms
          showAnnonymousTermsModal={showAnnonymousTerms}
          hideAnnonymousTermsModal={handleCloseAnnonymousTerms}
        ></AnnonymousTerms>
      </div>
    </footer>
  );
}

export default Footer;
