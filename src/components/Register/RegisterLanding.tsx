import React, { useContext, useState } from "react";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { AuthContext } from "../../providers/AuthProvider";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { initialRegisterationData, IRegisterationData } from "../../Helpers/publicInterfaces";

function RegisterLanding() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  const [showRegisterStep1, setShowRegisterStep1] = useState(false);
  const [showRegisterStep2, setShowRegisterStep2] = useState(false);
  const [showRegisterStep3, setShowRegisterStep3] = useState(false);
  const [registerationData, setRegisterationData] = useState<IRegisterationData>(null);

  return (
    <div className="box register-container min-h-12">
      <div className="box-body py-2">
        <h3> {local_Strings.registerLandingTitle}</h3>
        <p className="my-2">{local_Strings.registerLandingInfo}</p>
        <a
          className="btn btn-primary btn-block mt-1"
          href="#"
          onClick={() => setShowRegisterStep1(true)}
        >
          {local_Strings.registerLandingButton}
        </a>
      </div>
      <RegisterStep1
        showRegisterStep1Modal={showRegisterStep1}
        hideRegisterStep1Modal={() => setShowRegisterStep1(false)}
        showRegisterStep2Modal={(step1_data: IRegisterationData) => {
          setShowRegisterStep1(false);
          setShowRegisterStep2(true);
          setRegisterationData(step1_data);
        }}
      />
      {registerationData && <>
        <RegisterStep2
          showRegisterStep2Modal={showRegisterStep2}
          hideRegisterStep2Modal={() => setShowRegisterStep2(false)}
          backRegisterStep1Modal={() => {
            setShowRegisterStep2(false);
            setShowRegisterStep1(true);
          }}
          showRegisterStep3Modal={(step2_data: IRegisterationData) => {
            setShowRegisterStep2(false);
            setShowRegisterStep3(true);
            setRegisterationData(step2_data);
          }}
          step1_data={registerationData}
        />
        <RegisterStep3
          showRegisterStep3Modal={showRegisterStep3}
          hideRegisterStep3Modal={() => setShowRegisterStep3(false)}
          backRegisterStep2Modal={() => {
            setShowRegisterStep3(false);
            setShowRegisterStep2(true);
          }}
          step2_data={registerationData}
        />
      </>}
    </div>
  );
}

export default RegisterLanding;
