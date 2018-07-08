import React, { Component } from 'react';
import { Navbar, Button, Glyphicon } from 'react-bootstrap';
import '../../src/css/options.css';

let navbar = {
  textAlign: 'right',
  background: 'transparent',
  borderStyle: 'none',
  marginBottom: 0
}
let button = {
  margin: 15,
  color: 'white'
}
let style = {
  navbar: navbar,
  button: button
}

export class Options extends Component {
  render() {
    return (
      <div>
        <Navbar style={style.navbar} className="nav-options">
          <Button bsSize="large" bsStyle="primary" style={style.button}>
            <Glyphicon glyph="glyphicon glyphicon-cog" />
          </Button>
        </Navbar>
      </div>
    );
  }
}