import React, { useState } from "react";
import successIcon from "../../images/ConfirmationIcon.png";
import { localStrings as local_Strings } from "../../translations/localStrings";

interface iResetPasswordStep4 {
  showResetPasswordStep4: boolean;
  hideResetPasswordStep4: () => void;
}
function ResetPasswordStep4(props: iResetPasswordStep4) {
  
  return props.showResetPasswordStep4 ? (

    <div className="box modal-box p-4 ">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-3 text-center">
            <img src={successIcon} className="img-fluid" width="100" />
          </div>
          <div className="col-md-9 text-center text-md-left mt-2">
            <h3>{local_Strings.PasswordResetSuccessTitle}</h3>
            <h6>{local_Strings.PasswordResetSuccessMessage}</h6>
          </div>
        </div>
        <div className="text-center text-md-right mt-3">
          <button
            id="applyReqBtn"
            className="btn btn-primary"
            onClick={props.hideResetPasswordStep4}
          >
            {local_Strings.ConfirmationDone}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ResetPasswordStep4;
