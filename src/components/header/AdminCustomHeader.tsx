import React from "react";
import ToolBarLeft from "./ToolBarLeft";
import AdminToolBarRight from "./AdminToolBarRight";
import AdminNavigation from "./AdminNavigation";
import Logo from "./Logo";

function AdminCustomHeader() {
  return (
    <div>
      <div className="topHeader">
        <div className="container-fluid">
          <div className="row align-items-center">
            <ToolBarLeft></ToolBarLeft>
            <AdminToolBarRight></AdminToolBarRight>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <Logo></Logo>
            <AdminNavigation></AdminNavigation>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminCustomHeader;
