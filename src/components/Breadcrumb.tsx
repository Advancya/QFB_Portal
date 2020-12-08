import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb() {
  return (
    <section id="breadcrumb-section" className="breadcrumb-section">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Portfolio
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}

export default Breadcrumb;
