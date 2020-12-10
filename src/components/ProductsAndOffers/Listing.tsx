import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";

function ProductsAndOffersListing() {
  const [showClearFilter, setShowClearFilter] = useState(false);

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreProductsAndOffersListing = () => {
    console.log("retrieve more from server");
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="ib-text">
          <h4>ProductsAndOffers messages</h4>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-primary mt-1"
        onClick={() => {}}
      >
        Add New
      </button>
      
      <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
        <ul className="box-list" id="dataList">
          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>

          <li className="shown">
            <a
              href="#"
              className="row align-items-center"
              onClick={() => {}}
            >
              <div className="col-12 col-sm-12">
                <div className="mb-1 d-flex align-items-center">
                  <img src={dateIcon} className="img-fluid" />
                  <span className="mx-1 text-15 color-light-gold">
                    Wednesday 22 Nov 2020
                      </span>
                </div>
                <h6 className="mb-1 text-600">
                  Statement 1234567890 (QAR)
                    </h6>
                <div className="text-15">
                  From 08/08/2020 | To 08/10/2020
                    </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductsAndOffersListing;
