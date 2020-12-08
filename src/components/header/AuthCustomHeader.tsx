import React from "react";
import ToolBarLeft from "./ToolBarLeft";
import ToolBarRight from "./ToolBarRight";
import Navigation from "./Navigation";
import Logo from "./Logo";

function AuthCustomHeader() {
  return (
    <div>
      <div className="topHeader">
        <div className="container-fluid">
          <div className="row align-items-center">
            <ToolBarLeft></ToolBarLeft>
            <ToolBarRight></ToolBarRight>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <Logo></Logo>
            <Navigation></Navigation>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AuthCustomHeader;
