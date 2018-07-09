import React, { Component } from 'react';
import { Navbar, Button, Modal, ButtonGroup, Glyphicon, Row, Col } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'
import '../../src/css/main-menu.css';
import { ViewArt } from './view-art';
import { ViewArtInfo } from './view-art-info';
import { ViewLyrics } from './view-lyrics';

let navbar = {
  textAlign: 'left',
  background: 'transparent',
  borderStyle: 'none'
};
let separator = {
  margin: 'auto',
  width: 200,
  height: 1.5,
  background: 'white',
  marginTop: 30
}
let style = {
  navbar: navbar,
  separator: separator
};
let viewOptions = [
  { glyph: 'glyphicon glyphicon-stop', text: 'ViewArt' },
  { glyph: 'glyphicon glyphicon-th-list', text: 'ViewArtInfo' },
  { glyph: 'glyphicon glyphicon-th-large', text: 'ViewLyrics' },
];
let backgroundOptions = [
  { glyph: 'glyphicon glyphicon-adjust', text: 'Black background' },
  { glyph: 'glyphicon glyphicon-calendar', text: 'Dynamic background' },
  { glyph: 'glyphicon glyphicon-tasks', text: 'Blurred background' }
];

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    // function binding
    this.toggleModal = this.toggleModal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
    // state object
    this.state = {
      showModal: false,
      view: 'ViewArt'
    };
  }
  toggleModal(toggleValue) {
    this.setState({ showModal: toggleValue });
  }
  changeView(view) {
    this.setState({ view: view });
  }
  changeBackground() {
    // change background
  }
  render() {
    return (
      <div>
        {/* menu */}
        <Menu right>
          {/* view options */}
          <ButtonGroup vertical block bsSize="large" className="side-menu-button-group">
            {
              viewOptions.map( option =>
                <Button onClick={()=> this.changeView(option.text)}>
                  <Row>
                    <Col xs={1}>
                      <Glyphicon glyph={option.glyph}/>
                    </Col>
                    <Col style={{textAlign: 'left'}} xs={10}>
                      {option.text}
                    </Col>
                  </Row>
                </Button>
              )
            }
          </ButtonGroup>
          {/* separator */}
          <div style={style.separator}></div>
          {/* background options */}
          <ButtonGroup vertical block bsSize="large" className="side-menu-button-group">
            {
              backgroundOptions.map( option =>
                <Button onClick={this.changeBackground}>
                  <Row>
                    <Col xs={1}>
                      <Glyphicon glyph={option.glyph}/>
                    </Col>
                    <Col style={{textAlign: 'left'}} xs={10}>
                      {option.text}
                    </Col>
                  </Row>
                </Button>
              )
            }
          </ButtonGroup>
        </Menu>
        {/* content (views) */}
        { this.state.view === 'ViewArt' && <ViewArt/> }
        { this.state.view === 'ViewArtInfo' && <ViewArtInfo/> }
        { this.state.view === 'ViewLyrics' && <ViewLyrics/> }
        {/* about button */}
        <Navbar fixedBottom style={style.navbar} className="nav-about">
          <Button bsStyle="info" onClick={()=> this.toggleModal(true)}>About</Button>
        </Navbar>
        {/* about modal */}
        <Modal show={this.state.showModal} onHide={()=> this.toggleModal(false)} className="modal-about">
          <Modal.Header>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>          
            <p>
              Spotify ArtWork Website for displaying music info, albumart and lyrics.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=> this.toggleModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}