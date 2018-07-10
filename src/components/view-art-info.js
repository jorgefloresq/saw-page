import React, { Component } from 'react';
import { SongInfo } from './song-info';
import '../css/view-art-info.css';

export class ViewArtInfo extends Component {
  render() {
    return (
      <div className="vai-container">
        <div className="vai-content">
          <div className="vai-art">
            <img src="https://f4.bcbits.com/img/a2351616332_16.jpg"/>
          </div>
          <div className="vai-info">
            <SongInfo/>
          </div>
        </div>
      </div>
    );
  }
}