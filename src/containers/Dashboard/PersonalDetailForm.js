import React, { PureComponent } from "react";
import {Button , Container, Row, Col } from 'reactstrap';

class PersonalDetailForm extends PureComponent {

  render() {
    return (
      <div >
          <div className="pd-form-heading">
              Application Type
          </div>
            <div style={{width:"400px"}}>
            <Row xs="1" sm="2" md="2">
                <Col>
                    <select className="detail-form-input" required >
                        <option value="" disabled selected>Select KYC type...</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </select>
                </Col>
                <Col>
                    <select className="detail-form-input" required >
                        <option value="" disabled selected>Application Type</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </select>
                </Col>
            </Row>
            </div>
          <div className="pd-form-heading" style={{marginTop:"45px"}}>
                Identity Details
          </div>
          <form>
            <div style={{maxWidth:"200px"}}>
                <Row >
                    <Col>
                        <input className="detail-form-input" placeholder="PanCard Number" />
                    </Col>
                </Row>
            </div>
            <div style={{maxWidth:"618px",marginTop:"15px"}}>
                <Row xs="1" sm="2" md="3" >
                    <Col>
                        <input className="detail-form-input" placeholder="First Name" />
                    </Col>
                    <Col>
                        <input className="detail-form-input" placeholder="Middle Name" />
                    </Col>
                    <Col>
                        <input className="detail-form-input" placeholder="Last Name" />
                    </Col>
                </Row>
            </div>
            <div style={{maxWidth:"832px",marginTop:"15px"}}>
                <Row xs="1" sm="2" md="4" xl="4">
                    <Col>
                        <input className="detail-form-input" placeholder="DOB" />
                    </Col>
                    <Col>
                    <select className="detail-form-input" required >
                        <option value="" disabled selected>Gender</option>
                        <option value="volvo">Male</option>
                        <option value="saab">Female</option>
                        <option value="saab">Other</option>
                    </select>
                    </Col>
                    <Col>
                        <select className="detail-form-input" required >
                            <option value="" disabled selected>Marital Status</option>
                            <option value="volvo">Married</option>
                            <option value="saab">Unmarried</option>
                        </select>
                    </Col>
                    <Col>
                        <input className="detail-form-input" placeholder="Maiden Name" />
                    </Col>
                </Row>
            </div>
            <div style={{maxWidth:"618px",marginTop:"15px"}}>
                <Row xs="1" sm="2" md="3">
                    <Col>
                    <select className="detail-form-input" required >
                        <option value="" disabled selected>Citizenship</option>
                        <option value="volvo">Indian</option>
                        <option value="saab">Foreign</option>
                    </select>
                    </Col>
                    <Col>
                        <select className="detail-form-input" required >
                            <option value="" disabled selected>Residential  Status</option>
                            <option value="volvo">Rural</option>
                            <option value="saab">Urban</option>
                        </select>
                    </Col>
                    <Col>
                        <select className="detail-form-input" required >
                            <option value="" disabled selected>Occupation Type</option>
                            <option value="volvo">op1</option>
                            <option value="saab">op2</option>
                        </select>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop:"20px"}}>
                <Button color="primary" style={{width:"200px"}}>Continue to Contact</Button>
            </div>
            </form>
      </div>
    );
  }
}

export default PersonalDetailForm;
