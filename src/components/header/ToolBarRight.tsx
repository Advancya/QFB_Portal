import React from "react";
import { Link } from "react-router-dom";

function ToolBarRight() {
  return (
    <div className="col-md-9">
      <div className="topRight">
        <Link to="/HomePage1">Standard Settlements Instructions</Link>
        <Link to="/HomePage2">Documents Listing</Link>
        <Link to="/HomePage3">Settings</Link>
        <Link to="/HomePage4">Contact Us</Link>
      </div>
    </div>
  );
}

export default ToolBarRight;
