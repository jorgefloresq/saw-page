import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class ConnectAuth extends Component {
  render() {
    return (
      <div>
        <h2>Connect with Spotify</h2>
        <Button bsStyle="success" bsSize="large" >Connect</Button>
      </div>
    );
  }
}