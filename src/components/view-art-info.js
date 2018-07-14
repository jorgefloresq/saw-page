import React, { Component } from 'react';
import { SongInfo } from './song-info';
import '../css/view-art-info.css';
import { defaultB, dynamic, blurred } from './background-styles';
import * as Vibrant from '@akigami/vibrant';

let darkVibrantRGB = defaultB['background'];
let vibrantRGB = 'black';

export class ViewArtInfo extends Component {
  render() {
    let background = {};
    let color;
    let albumArt = this.props.albumArt;
    if (this.props.background === 'default-background') {
      background = {...defaultB};
      color = 'white';
    }
    else if (this.props.background === 'dynamic-background') {
      background = {...dynamic};
      let v = new Vibrant(albumArt);
      v.getPalette().then(palette => {
        for(let swatch in palette){
          if(swatch === 'DarkVibrant'){
            let r = palette[swatch]._rgb[0];
            let g = palette[swatch]._rgb[1];
            let b = palette[swatch]._rgb[2];
            darkVibrantRGB = 'rgb('+ r +', '+ g +', '+ b +')'
            console.log(swatch, darkVibrantRGB);
          }
          else if(swatch === 'Vibrant'){
            let r = palette[swatch]._rgb[0];
            let g = palette[swatch]._rgb[1];
            let b = palette[swatch]._rgb[2];
            vibrantRGB = "rgb("+ r +", "+ g +", "+ b +")"
            console.log(vibrantRGB);
            
          }
        }
      });
      dynamic['background'] = darkVibrantRGB;
      color = vibrantRGB;
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
            <div id="textDiv" style={{color: color}} className="vai-info">
              <SongInfo/>
            </div>
          </div>
        </div>
        <div id="backgroundDiv" style={background}></div>
      </div>
    );
  }
}