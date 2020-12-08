import React from "react";
import ToolBarLeft from "./ToolBarLeft";
import ToolBarRight from "./ToolBarRight";
import Navigation from "./Navigation";
import Logo from "./Logo";

function CustomHeader() {
  return (
    <div>
      <div className="topHeader">
        <div className="container-fluid">
          <div className="row align-items-center">
            <ToolBarLeft></ToolBarLeft>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <Logo></Logo>
          </div>
        </div>
      </header>
    </div>
  );
}

export default CustomHeader;
