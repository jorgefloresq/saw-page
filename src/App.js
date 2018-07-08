import React, { Component } from 'react';
import logo from './qtip.png';
import './App.css';
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
        <ConnectAuth />
      </div>
    );
  }
}

export default App;
