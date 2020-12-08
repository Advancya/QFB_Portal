import React from "react";
import Facilities from "./Facilities/Facilities";
import Guarantees from "./Guarantees/Guarantees";
function LiabilitiesLanding() {
  return (
    <div className="col-lg-5 col-container">
      <div className="box box min-h-24">
        <h3>Liabilities</h3>
        <h2 className="mb-4">
          3,600,000.00 <small>QAR</small>
        </h2>
        <Facilities></Facilities>
        <Guarantees></Guarantees>
      </div>
    </div>
  );
}

export default LiabilitiesLanding;
