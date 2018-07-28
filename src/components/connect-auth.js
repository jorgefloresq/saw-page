import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

//Defines height of columns within rows
let colWire = {
  //border: 'solid',
  height: '33vH',
};

//
let txtConnect = {
  //border: "solid",
  margin: 0,
  paddingTop: "10vh",
  paddingBottom: "5vH"
};

export class ConnectAuth extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid" >
            <Col sm={12} md={12} lg={12} style={colWire}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={4} md={4} lg={4}>
            </Col>
            <Col sm={4} md={4} lg={4} style={colWire}>
              <div>
                <h2 style={txtConnect}>Connect with Spotify</h2>
                <Button onClick={()=> window.location='http://localhost:8888/login'} bsStyle="success" bsSize="large">Connect</Button>
              </div>
            </Col>
            <Col sm={4} md={4} lg={4}> 
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={12} md={12} lg={12} style={colWire}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}