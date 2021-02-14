import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../translations/localStrings";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import AnnonymousTerms from "./Terms/AnnonymousTerms";
import AuthTerms from "./Terms/AuthTerms";

function Footer() {
  const currentContext = useContext(AuthContext);
  local_Strings.setLanguage(currentContext.language);
  const [showAnnonymousTerms, setShowAnnonymousTerms] = useState(false);
  const [showAuthTerms, setShowAuthTerms] = useState(false);

  return (
    <footer className="footer">
      <div className="belowFooter">
        {local_Strings.footerTxt}
        {currentContext && !!currentContext.selectedCIF ?
          <a href="#" onClick={() => setShowAuthTerms(true)}>
            {local_Strings.footerTxtTerms}
          </a>
          :
          <a href="#" onClick={() => setShowAnnonymousTerms(true)}>
            {local_Strings.footerTxtTerms}
          </a>}
        {currentContext && !!currentContext.selectedCIF ?
          <AuthTerms
            showAuthTermsModal={showAuthTerms}
            hideAuthTermsModal={() => setShowAuthTerms(false)}
            showButtons={false}
          /> :
          <AnnonymousTerms
            showAnnonymousTermsModal={showAnnonymousTerms}
            hideAnnonymousTermsModal={() => setShowAnnonymousTerms(false)}
          />
        }
      </div>
    </footer>
  );
}

export default Footer;
