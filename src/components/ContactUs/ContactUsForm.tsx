import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import callIcon from "../../images/call-icon.png";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface iContactUsForm {
  showContactUsFormModal: boolean;
  hideContactUsFormModal: () => void;
}
function ContactUsForm(contactUsFormProps: iContactUsForm) {
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);
  const mapStyles = {
    height: "200px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 41.3773,
        lng: 2.1585,
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682,
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915,
      },
    },
  ];

  return (
    <div>
      <Modal
        show={contactUsFormProps.showContactUsFormModal}
        onHide={contactUsFormProps.hideContactUsFormModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="myModal"
      >
        <Modal.Header>
          <div className="d-flex align-items-center">
            <div className="ib-icon">
              <img src={callIcon} className="img-fluid" />
            </div>
            <div className="ib-text">
              <h4>Contact US</h4>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={contactUsFormProps.hideContactUsFormModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="box modal-box p-0 scrollabel-modal-box">
            <LoadScript googleMapsApiKey="AIzaSyBkzMg4m8KTfJ3yW-EfNSuVgt0OVlze7uI">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
              >
                {locations.map((item) => {
                  return <Marker key={item.name} position={item.location} />;
                })}
              </GoogleMap>
            </LoadScript>
            <div className="container-fluid">
              <div className="row my-4">
                <div className="col-md-8">
                  <Form>
                    <Form.Row>
                      <Col sm={6}>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Mohamed Ahmed"
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId="formCountry">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            as="select"
                            placeholder="Country"
                            custom
                          >
                            <option>Qatar</option>
                            <option>Egypt</option>
                            <option>USA</option>
                            <option>UAE</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col sm={6}>
                        <Form.Group controlId="formMobile">
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="+974 00000000"
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group controlId="formMobile">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="test@test.com"
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col sm={12}>
                        <Form.Group controlId="forQuery">
                          <Form.Label>Query</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="We'll never share your email with anyone else. We'll never share your email with anyone else."
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
                <div className="offset-md-2 col-md-2"></div>
              </div>
              <div className="row my-4">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                  <Button variant="primary" type="submit" className="w-100">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactUsForm;
