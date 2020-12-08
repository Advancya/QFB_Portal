import React, { useState } from "react";
import phoneIcon from "../images/phone-fill.svg";
import messageIcon from "../images/message.svg";
import cellPhoneIcon from "../images/cell-phone.svg";
import emailIcon from "../images/email.svg";
import { Carousel } from "react-bootstrap";

function RelationManger() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      id="carouselExampleIndicators"
      className="carousel slide"
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
    >
      <Carousel.Item>
        <div className="box min-h-24">
          <div className="box-header">
            <h3>Relation Manager</h3>
          </div>
          <ul className="box-list">
            <li>
              <div className="box-list-details">
                <h5>RM Name</h5>
                <h4 className="">Ahmed Mohamed Shokry</h4>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-8">
                    <h5>Phone Number</h5>
                    <h4 className="">+974 00000000</h4>
                  </div>
                  <div className="col-4 text-right">
                    <a href="#" className="actionIcon">
                      <img src={phoneIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-6">
                    <h5>Mobile Number</h5>
                    <h4 className="">+974 00000000</h4>
                  </div>
                  <div className="col-6 text-right">
                    <a href="#" className="actionIcon mx-1">
                      SMS
                      <img src={messageIcon} className="img-fluid" />
                    </a>
                    <a href="#" className="actionIcon mx-1">
                      CALL
                      <img src={cellPhoneIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-9">
                    <h5>Email</h5>
                    <h4 className="">ahmedmohamed@gmail.com</h4>
                  </div>
                  <div className="col-3 text-right">
                    <a href="#" className="actionIcon">
                      <img src={emailIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="text-center px-3">
            <a className="btn btn-primary btn-block" href="#">
              CALL ME BACK
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="box min-h-24">
          <div className="box-header">
            <h3>Relation Manager</h3>
          </div>
          <ul className="box-list">
            <li>
              <div className="box-list-details">
                <h5>RM Name</h5>
                <h4 className="">Ahmed Mohamed Shokry</h4>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-8">
                    <h5>Phone Number</h5>
                    <h4 className="">+974 00000000</h4>
                  </div>
                  <div className="col-4 text-right">
                    <a href="#" className="actionIcon">
                      <img src={phoneIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-6">
                    <h5>Mobile Number</h5>
                    <h4 className="">+974 00000000</h4>
                  </div>
                  <div className="col-6 text-right">
                    <a href="#" className="actionIcon mx-1">
                      SMS
                      <img src={messageIcon} className="img-fluid" />
                    </a>
                    <a href="#" className="actionIcon mx-1">
                      CALL
                      <img src={cellPhoneIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="box-list-details">
                <div className="row no-gutters align-items-center">
                  <div className="col-9">
                    <h5>Email</h5>
                    <h4 className="">ahmedmohamed@gmail.com</h4>
                  </div>
                  <div className="col-3 text-right">
                    <a href="#" className="actionIcon">
                      <img src={emailIcon} className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="text-center px-3">
            <a className="btn btn-primary btn-block" href="#">
              CALL ME BACK
            </a>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default RelationManger;
