import React, { Component } from 'react';
import '../../src/css/view-art.css';
import { defaultB, dynamic, blurred } from './background-styles';

export class ViewArt extends Component {
  render() {
    let background = {};
    if (this.props.background === 'default-background') {
      background = {...defaultB};
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
        <div className="square">
          <div className="content">
          <img src={this.props.albumArt}/>
          </div>
        </div>
        <div style={background}></div>
      </div>
    );
  }
}