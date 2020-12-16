import React from "react";
import { localStrings as local_Strings } from "../translations/localStrings";

function Footer() {
  return (
    <footer className="footer">
      <div className="belowFooter">
        {local_Strings.footerTxt}

        <a href="#"> {local_Strings.footerTxtTerms}</a>
      </div>
    </footer>
  );
}

export default Footer;
