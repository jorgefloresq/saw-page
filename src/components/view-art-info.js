import React, { Component } from 'react';
import { SongInfo } from './song-info';
import '../css/view-art-info.css';
import { defaultB, dynamic, blurred } from './background-styles';

export class ViewArtInfo extends Component {
  render() {
    let background = {};
    let color;
    if (this.props.background === 'default-background') {
      background = {...defaultB};
      color = 'white';
    }
    else if (this.props.background === 'dynamic-background') {
      background = {...dynamic};
    }
    else {
      background = { 
        background: `url(${this.props.albumArt})`,
        ...blurred
      };      
    }
    return (
      <div>
        <div className="vai-container">
          <div className="vai-content">
            <div className="vai-art">
              <img src={this.props.albumArt}/>
            </div>
            <div style={{color: color}} className="vai-info">
              <SongInfo/>
            </div>
          </div>
        </div>
        <div style={background}></div>
      </div>
    );
  }
}