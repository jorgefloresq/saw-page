import React, { Component } from 'react';
import { Navbar, Button, Modal } from 'react-bootstrap';
import '../../src/css/about.css';

let navbar = {
  textAlign: 'left',
  background: 'transparent',
  borderStyle: 'none'
}
let button = {
  margin: 15
}
let style = {
  navbar: navbar,
  button: button
}

export class About extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div>
        <Navbar fixedBottom style={style.navbar} className="nav-about">
          <Button bsStyle="info" style={style.button} onClick={this.handleShow}>About</Button>
        </Navbar>
        <Modal show={this.state.show} onHide={this.handleClose} className="modal-about">
          <Modal.Header>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>          
            <p>
              Spotify ArtWork Website for displaying music info, albumart and lyrics.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>      
    );
  }
}