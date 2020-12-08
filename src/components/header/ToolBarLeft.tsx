import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ToolBarLeft() {
  return (
    <div className="col-md-3 text-left">
      <div className="topLeftIcons">
        <Link to="/HomePage">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <a href="#">AR</a>
      </div>
    </div>
  );
}

export default ToolBarLeft;
