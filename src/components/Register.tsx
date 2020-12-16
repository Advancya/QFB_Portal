import React from "react";
import { localStrings as local_Strings } from "../translations/localStrings";

function Register() {
  return (
    <div className="box register-container min-h-12">
      <div className="box-body py-2">
        <h3> {local_Strings.registerLandingTitle}</h3>
        <p className="my-2">{local_Strings.registerLandingInfo}</p>
        <a className="btn btn-primary btn-block mt-1" href="#" id="">
          {local_Strings.registerLandingButton}
        </a>
      </div>
    </div>
  );
}

export default Register;
