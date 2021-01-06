import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { useHistory } from "react-router-dom";

import AnnonymousTerms from "./Terms/AnnonymousTerms";
import AuthTerms from "./Terms/AuthTerms";

function Footer() {
  const [showAnnonymousTerms, setShowAnnonymousTerms] = useState(false);

  const handleCloseAnnonymousTerms = () => {
    setShowAnnonymousTerms(false);
  };
  const handleShowAnnonymousTerms = () => {
    setShowAnnonymousTerms(true);
  };

  const [showAuthTerms, setShowAuthTerms] = useState(false);

  const handleCloseAuthTerms = () => {
    setShowAuthTerms(false);
  };
  const handleShowAuthTerms = () => {
    setShowAuthTerms(true);
  };

  return (
    <footer className="footer">
      <div className="belowFooter">
        {local_Strings.footerTxt}
        <a href="#" onClick={handleShowAnnonymousTerms}>
          {local_Strings.footerTxtTerms}
        </a>{" "}
        |{" "}
        <a href="#" onClick={handleShowAuthTerms}>
          {local_Strings.footerTxtTerms}
        </a>
        <AnnonymousTerms
          showAnnonymousTermsModal={showAnnonymousTerms}
          hideAnnonymousTermsModal={handleCloseAnnonymousTerms}
        ></AnnonymousTerms>
        <AuthTerms
          showAuthTermsModal={showAuthTerms}
          hideAuthTermsModal={handleCloseAuthTerms}
        ></AuthTerms>
      </div>
    </footer>
  );
}

export default Footer;
