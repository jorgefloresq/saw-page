import React, { Component } from 'react';
import { Button, Modal, ButtonGroup, Row, Col } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'
import '../../src/css/main-menu.css';
import { ViewArt } from './view-art';
import { ViewArtInfo } from './view-art-info';
import { ViewLyrics } from './view-lyrics';
import { defaultB, dynamic, blurred } from './background-styles';
import { getColors } from '../colors';
import { Icon } from './icon';

let navbar = {
  background: 'transparent',
  borderStyle: 'none'
};
let separator = {
  margin: 'auto',
  width: '60%',
  height: 3,
  background: 'white',
  marginTop: 30
};
let style = {
  navbar: navbar,
  separator: separator
};
let viewOptions = [
  { icon: 'art', view: 'ViewArt' },
  { icon: 'artInfo', view: 'ViewArtInfo' },
  { icon: 'lyrics', view: 'ViewLyrics' },
];
let backgroundOptions = [
  { icon: 'default', background: 'Default' },
  { icon: 'dynamic', background: 'Dynamic' },
  { icon: 'blurred', background: 'Blurred' }
];

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    // function binding
    this.toggleModal = this.toggleModal.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.handleMenuStateChange = this.handleMenuStateChange.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    // state object
    this.state = {
      showAbout: true,
      showModal: false,
      showMenu: true,
      menuIsOpen: false,
      view: 'ViewArt',
      background: '',
      cursor: 'default'
    };
  }
  // wait counter (wait 3s to hide menu buttons)
  timeout;

  componentDidMount() {
    // mouse move event listener
    document.addEventListener("mousemove", this.handleMouseMove);
    // hide menu buttons
    this.hideButtons();
    console.log("component did mount");
    console.log(this.props.backgroundStyle);
  }

  handleMouseMove() {
    // reset timeout
    clearTimeout(this.timeout);
    // show menu buttons
    this.setState({
      showAbout: true,
      showMenu: true,
      cursor: 'default'
    }, () => {
      // set timeout to hide menu buttons
      this.timeout = this.hideButtons();
    });
  }

  hideButtons() {
    return setTimeout(() => {
      // hide menu buttons
      this.setState({
        showAbout: false,
        showMenu: false,
        cursor: 'none'
      });
    }, 3000);
  }

  handleMenuButton() {
    // open menu
    this.setState({ menuIsOpen: true });
  }

  handleMenuStateChange(state) {
    clearTimeout(this.timeout);
    this.setState({
      // toggle about button
      showAbout: !state.isOpen,
      // toggle menu button
      showMenu: !state.isOpen,
      // change menu isOpen prop
      menuIsOpen: state.isOpen
    }, () => {
      // set timeout to hide menu buttons
      this.timeout = this.hideButtons();
    });
  }

  handleMenuItem(view) {
    this.setState({
      // change view
      view: view,
      // close menu
      menuIsOpen: false,
    });
  }

  toggleModal(toggleValue) {
    // toggle about modal
    this.setState({ showModal: toggleValue });
  }

  render() {
    return (
      <div style={{ cursor: this.state.cursor }}>
        {/* menu button */}
        {this.state.showMenu &&
          <Button bsSize="large" onClick={this.handleMenuButton} className="nav-menu">
            <Icon name="settings" />
          </Button>
        }
        {/* menu */}
        <Menu right isOpen={this.state.menuIsOpen} onStateChange={this.handleMenuStateChange}>
          <div className="side-menu-content">
            {/* view options */}
            <ButtonGroup vertical block bsSize="large" className="side-menu-button-group">
              {
                viewOptions.map(option =>
                  <Button onClick={() => this.handleMenuItem(option.view)}>
                    <Row>
                      <Col xs={12}>
                        {this.state.view === option.view ?
                          <Icon name={option.icon} size={45} color='cyan' /> :
                          <Icon name={option.icon} />
                        }
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
                backgroundOptions.map(option =>
                  <Button onClick={() => { 
                    this.props.onChangeBackground(option.background, this.props.albumArt); 
                    this.setState({
                      menuIsOpen: false

                    }) 
                  }}>
                    <Row>
                      <Col xs={12}>
                        {this.props.background === option.background ?
                          <Icon name={option.icon} size={45} color='cyan' /> :
                          <Icon name={option.icon} />
                        }
                      </Col>
                    </Row>
                  </Button>
                )
              }
            </ButtonGroup>
            <div style={{ height: 50 }}></div>
          </div>
        </Menu>
        {/* content (views) */}
        {this.state.view === 'ViewArt' &&
          <ViewArt
            fontColor={this.props.fontColor}
            albumArt={this.props.albumArt}
          />
        }
        {this.state.view === 'ViewArtInfo' &&
          <ViewArtInfo
            fontColor={this.props.fontColor}
            albumArt={this.props.albumArt}
            artists={this.props.artists}
            songName={this.props.songName}
          />
        }
        {this.state.view === 'ViewLyrics' &&
          <ViewLyrics
            fontColor={this.props.fontColor}
            albumArt={this.props.albumArt}
            artists={this.props.artists}
            songName={this.props.songName}
          />
        }
        {/* about button */}
        {this.state.showAbout && !this.state.menuIsOpen &&
          <Button onClick={() => this.toggleModal(true)} className="nav-about">
            <Icon name="about" />
          </Button>
        }
        {/* about modal */}
        <Modal show={this.state.showModal} onHide={() => this.toggleModal(false)} className="modal-about">
          <Modal.Header>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Spotify ArtWork Website for displaying music info, albumart and lyrics.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div id="backgroundDiv" style={this.props.backgroundStyle}></div>
      </div>
    );
  }
}