import React, { Component } from 'react';
import { SongInfo } from './song-info';
import '../css/view-art-info.css';

export class ViewArtInfo extends Component {
  render() {
    let textShadow;
    if (this.props.backgroundType === 'Blurred') {
      textShadow = '2px 2px 5px rgb(70, 70, 70)';
    }
    return (
      <div>
        <div className="vai-container">
          <div className="vai-content">
            <div className="vai-art">
              <img src={this.props.albumArt}/>
            </div>
            <div id="textDiv" style={{color: this.props.fontColor, textShadow: textShadow}} className="vai-info">
              <SongInfo 
                songName={this.props.songName}
                artists={this.props.artists}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}