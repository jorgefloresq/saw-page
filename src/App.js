import React, { Component } from 'react';
import logo from './qtip.png';
import { About } from './components/about';
import { ArtImage } from './components/art-image';
import { ConnectAuth } from './components/connect-auth';
import { Lyrics } from './components/lyrics';
import { Options } from './components/options';
import { SideMenu } from './components/side-menu';
import { SongInfo } from './components/song-info';
import { ViewArtInfo } from './components/view-art-info';
import { ViewArt } from './components/view-art';
import { ViewLyrics } from './components/view-lyrics';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="https://www.youtube.com/watch?v=LnJQseodrXM&feature=youtu.be">
          <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/smiling-face-with-sunglasses_1f60e.png"/>  
        </a>
      </div>
    );
  }
}

export default App;
