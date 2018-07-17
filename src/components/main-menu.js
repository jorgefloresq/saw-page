import React, { Component } from 'react';
import { Navbar, Button, Modal, ButtonGroup, Glyphicon, Row, Col } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'
import '../../src/css/main-menu.css';
import { ViewArt } from './view-art';
import { ViewArtInfo } from './view-art-info';
import { ViewLyrics } from './view-lyrics';
import * as Vibrant from '@akigami/vibrant';
import { defaultB, dynamic, blurred } from './background-styles';

let navbar = {
  background: 'transparent',
  borderStyle: 'none'
};
let separator = {
  margin: 'auto',
  width: 200,
  height: 1.5,
  background: 'white',
  marginTop: 30
};
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
  { glyph: 'glyphicon glyphicon-adjust', background: 'Default' },
  { glyph: 'glyphicon glyphicon-calendar', background: 'Dynamic' },
  { glyph: 'glyphicon glyphicon-tasks', background: 'Blurred' }
];

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    // function binding
    this.toggleModal = this.toggleModal.bind(this);
    this.handleMenuButton = this.handleMenuButton.bind(this);
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
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
      background: defaultB,
      fontColor: 'white',
      albumArt: 'https://i.scdn.co/image/26321d3457df376afade43b63104119b6ca6db60'
    };
  }
  // wait counter (wait 3s to hide menu buttons)
  timeout;

  componentDidMount() {
      // mouse move event listener
    document.addEventListener("mousemove", this.handleMouseMove);
    // hide menu buttons
    this.hideButtons();
  }

  handleMouseMove() {
    // reset timeout
    clearTimeout(this.timeout);
    // show menu buttons
    this.setState({
      showAbout: true,
      showMenu: true
    }, ()=> {
      // set timeout to hide menu buttons
      this.timeout = this.hideButtons();
    });    
  }

  hideButtons() {
    return setTimeout(()=> {
      // hide menu buttons
      this.setState({ 
        showAbout: false,
        showMenu: false
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
     }, ()=> {
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

  async changeBackground(background) {
    // background
    let bg;
    // font color
    let fc;
    // default background selected
    if (background === 'Default') {
      // set background
      bg = {...defaultB};
      // set font color (view art info)
      fc = 'white';
    }
    // dynamic background selected
    else if (background === 'Dynamic') {
      // background color
      let darkVibrantRGB;
      // font accent color
      let vibrantRGB;
      // create new vibrant
      let v = new Vibrant(this.state.albumArt);
      // get album art's color palette
      await v.getPalette().then(palette => {
        for(let swatch in palette){
          if(swatch === 'DarkVibrant'){
            let r = palette[swatch]._rgb[0];
            let g = palette[swatch]._rgb[1];
            let b = palette[swatch]._rgb[2];
            darkVibrantRGB = 'rgb('+ r +', '+ g +', '+ b +')';
            console.log(swatch, darkVibrantRGB);
          }
          else if(swatch === 'Vibrant'){
            let r = palette[swatch]._rgb[0];
            let g = palette[swatch]._rgb[1];
            let b = palette[swatch]._rgb[2];
            vibrantRGB = "rgb("+ r +", "+ g +", "+ b +")";
            console.log(`vibrantRGB: ${vibrantRGB}`);
          }
        }
      });
      // set background
      bg = {
        ...dynamic,
        background: darkVibrantRGB
      };
      // set font color (view art info)
      fc = vibrantRGB;
    }
    // blurred background selected
    else {
      // set background
      bg = { 
        background: `url(${this.state.albumArt})`,
        ...blurred
      };      
    }
    // change background
    this.setState({ 
      // set background
      background: bg,
      // set font color
      fontColor: fc,
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
      <div>
        {/* menu button */}
        { this.state.showMenu && 
          <Button bsSize="large" onClick={this.handleMenuButton} className="nav-menu">
            <Glyphicon glyph="glyphicon glyphicon-menu-hamburger"/>
          </Button>
        }
        {/* menu */}
        <Menu right isOpen={this.state.menuIsOpen} onStateChange={this.handleMenuStateChange}>
          {/* view options */}
          <ButtonGroup vertical block bsSize="large" className="side-menu-button-group">
            {
              viewOptions.map( option =>
                <Button onClick={()=> this.handleMenuItem(option.text)}>
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
                <Button onClick={()=> {this.changeBackground(option.background)}}>
                  <Row>
                    <Col xs={1}>
                      <Glyphicon glyph={option.glyph}/>
                    </Col>
                    <Col style={{textAlign: 'left'}} xs={10}>
                      {option.background}
                    </Col>
                  </Row>
                </Button>
              )
            }
          </ButtonGroup>
        </Menu>
        {/* content (views) */}
        { this.state.view === 'ViewArt' && <ViewArt fontColor={this.state.fontColor} albumArt={this.state.albumArt}/> }
        { this.state.view === 'ViewArtInfo' && <ViewArtInfo fontColor={this.state.fontColor} albumArt={this.state.albumArt}/> }
        { this.state.view === 'ViewLyrics' && <ViewLyrics fontColor={this.state.fontColor} albumArt={this.state.albumArt}/> }
        {/* about button */}
        <Navbar fixedBottom style={{...style.navbar, textAlign: 'left'}} className="nav-about">
          { this.state.showAbout && !this.state.menuIsOpen &&
            <Button bsStyle="info" onClick={()=> this.toggleModal(true)}>About</Button>
          }
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
        <div id="backgroundDiv" style={this.state.background}></div>
      </div>
    );
  }
}