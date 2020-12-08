import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import excelIcon from "../../../images/excel.svg";

interface iInvestmentsBuyAndSell {
  showInvestmentsBuyAndSellModal: boolean;
  hideInvestmentsBuyAndSellModal: () => void;
  backInvestmentsBuyAndSellModal: () => void;
}
function InvestmentsBuyAndSell(
  investmentsBuyAndSellProps: iInvestmentsBuyAndSell
) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  const applyFilter = () => {
    setShowClearFilter(true);
  };

  const clearFilter = () => {
    setShowClearFilter(false);
  };
  const showMoreInvestmentsBuyAndSell = () => {
    console.log("retrieve more from server");
  };
  const exportToExcel = (tableId: string, anchorId: string) => {
    console.log("exported");
    var table = document.getElementById(tableId)!;
    var html = table.outerHTML;
    var url = "data:application/vnd.ms-excel," + escape(html); // Set your html table into url
    var anchor = document.getElementById(anchorId)!;
    anchor.setAttribute("href", url);
    anchor.setAttribute("download", "qfb-statement.xls"); // Choose the file name
    return false;
  };

  return (
    <Modal
      show={investmentsBuyAndSellProps.showInvestmentsBuyAndSellModal}
      onHide={investmentsBuyAndSellProps.hideInvestmentsBuyAndSellModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="row align-items-center">
            <div className="col-2 col-sm-1 text-center">
              <a
                href="#"
                onClick={
                  investmentsBuyAndSellProps.backInvestmentsBuyAndSellModal
                }
                className="backToAccountsList"
              >
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
            <div className="col-4 col-sm-3">
              <h5>Investment Buy and Sell.</h5>
              <h4>1223245672802900</h4>
            </div>
            <div className="col-4 col-sm-3">
              <h5>Current Balance</h5>
              <h4>3,150,000.00 QAR</h4>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={investmentsBuyAndSellProps.hideInvestmentsBuyAndSellModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <form className="filter-box">
          <div className="row headRow align-items-center">
            <div className="col-sm-3">
              <label>Date</label>
              <select className="form-control selectDateDD" id="">
                <option value="0">Select Date</option>
                <option value="1">Last Week</option>
                <option value="2">Last Month</option>
                <option value="3">Last 3 Months</option>
                <option value="4">Custom Date</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label>Amount</label>
              <select
                className="form-control w-50"
                id="inlineFormCustomSelect2"
              >
                <option>Equal to</option>
                <option value="1">More Than</option>
                <option value="2">Less than</option>
              </select>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Amount"
              />
            </div>
            <div className="col-sm-3">
              <label>Type</label>
              <div className="form-row">
                <div className="custom-control custom-checkbox  custom-control-inline">
                  <input
                    type="checkbox"
                    name="radioType"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label">Buy</label>
                </div>
                <div className="custom-control custom-checkbox custom-control-inline">
                  <input
                    type="checkbox"
                    name="radioType"
                    className="custom-control-input"
                    id="customCheck2"
                  />
                  <label className="custom-control-label">Sell</label>
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <label>
                <button
                  id="resetFilter"
                  type="reset"
                  className={
                    showClearFilter
                      ? "resetBtn resetFilter"
                      : "resetBtn resetFilter invisible"
                  }
                  onClick={clearFilter}
                >
                  Clear Filter <i className="fa fa-close"></i>
                </button>
              </label>
              <button
                id="applyFilter"
                type="button"
                className="btn btn-primary btn-sm btn-block applyFilter"
                onClick={applyFilter}
              >
                Apply
              </button>
            </div>
            <div className="col-sm-9 py-3 customDate d-none" id="">
              <div className="row">
                <div className="col-lg-4">
                  <label>From</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-lg-4">
                  <label>To</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="box table-box">
          <Accordion
            as="table"
            className="table table-striped"
            id="InvestmentsBuyAndSell"
          >
            <thead>
              <tr>
                <th colSpan={1}> Date </th>
                <th colSpan={2}> Amount </th>
                <th colSpan={3}> Description </th>

                <th className="text-right"> </th>
              </tr>
            </thead>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="0" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>
              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="0" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="1" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>

              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="1" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="3" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>
              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="3" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="4" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>

              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="4" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="5" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>
              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="5" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>

            <tbody>
              <Accordion.Toggle as="tr" eventKey="6" className="clickRow">
                <td colSpan={1}> 05/11/2020 </td>
                <td colSpan={2}> 10,000,000.00 QAR </td>
                <td colSpan={3}> FW20310S1RYC - C.C AC NO 000005660930053 </td>

                <td className="caretArrow">
                  <i className="fa fa-caret-right color-gray "></i>
                </td>
              </Accordion.Toggle>

              <tr>
                <td colSpan={9} className="p-0">
                  <Accordion.Collapse eventKey="6" className="collapseRow">
                    <div className="px-3 py-2">
                      <div className="item-row py-2">
                        <div className="color-black">Investment Reference</div>
                        <div className="color-gray">FT12345</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Name</div>
                        <div className="color-gray">
                          Ahmed Mohamed Ahmed Mohamed Ahmed
                        </div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Beneficiary Account</div>
                        <div className="color-gray">QAIBN12345678910</div>
                      </div>
                      <div className="item-row py-2">
                        <div className="color-black">Investment Details</div>
                        <div className="color-gray">
                          Purchase of property in London
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </td>
              </tr>
            </tbody>
          </Accordion>
        </div>
        <div className="actionScrollButtons">
          <a
            id="seeMoreRecords"
            className="btn-block"
            onClick={showMoreInvestmentsBuyAndSell}
          >
            More <i className="fa fa-caret-down"></i>
          </a>
          {/*  <!--<a id="seeLessRecords">Less <i className="fa fa-caret-up"></i></a>--> */}
        </div>
        <div className="exportExcel">
          <a
            href="#"
            id="InvestmentsBuyAndSelldownloadLink"
            className=""
            onClick={() =>
              exportToExcel(
                "InvestmentsBuyAndSell",
                "InvestmentsBuyAndSelldownloadLink"
              )
            }
          >
            <img src={excelIcon} className="img-fluid" /> Export to Excel
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InvestmentsBuyAndSell;
