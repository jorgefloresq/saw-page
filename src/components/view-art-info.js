import React, { Component } from 'react';
import { SongInfo } from './song-info';
import '../css/view-art-info.css';

export class ViewArtInfo extends Component {  
  render() {
    return (
      <div>
        <div className="vai-container">
          <div className="vai-content">
            <div className="vai-art">
              <img src={this.props.albumArt}/>
            </div>
            <div id="textDiv" style={{color: this.props.fontColor}} className="vai-info">
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