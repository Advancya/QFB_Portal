import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import { AuthContext } from "../../providers/AuthProvider";
import xIcon from "../../images/x-icon.svg";
import Constant from "../../constants/defaultData";


interface iAuthTerms {
  showAuthTermsModal: boolean;
  hideAuthTermsModal: () => void;
  showWelcomePage?: () => void;
}

function AuthTerms(authTermsProps: iAuthTerms) {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={authTermsProps.showAuthTermsModal}
      onHide={authTermsProps.hideAuthTermsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.AnonymousTermsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={authTermsProps.hideAuthTermsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {currentContext.language === "en" ? (
          <ResponsiveEmbed aspectRatio="16by9">
            <embed type="text/html" src={Constant.PortalUrl + "/TermsAuthen.html"} />

          </ResponsiveEmbed>
        ) : (
            <ResponsiveEmbed aspectRatio="16by9">
              <embed type="text/html" src={Constant.PortalUrl + "/TermsAuthAr.html"} />
            </ResponsiveEmbed>
          )}
        <div className="text-right">
          <button className="btn btn-sm btn-primary mt-1 mr-2"
            type="submit"
            onClick={(e) => authTermsProps.showWelcomePage()}>
            {local_Strings.AnonymousTermsAccept}
          </button>
          <button className="btn btn-sm btn-primary mt-1 mr-2"
            type="submit"
            onClick={(e) => currentContext.logout()}>
            {local_Strings.AnonymousTermsCancel}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthTerms;
