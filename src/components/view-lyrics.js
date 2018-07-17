import React, { Component } from 'react';
import { defaultB, dynamic, blurred } from './background-styles';
import * as Vibrant from '@akigami/vibrant';
import '../css/view-lyrics.css';

//initialize background color with defaut in case of color retrieval delay
let darkVibrantRGB = defaultB['background'];

export class ViewLyrics extends Component {
  render() {
    let background = {};
    let albumArt = this.props.albumArt;
    if (this.props.background === 'default-background') {
      background = {...defaultB};
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
        }
      });
      dynamic['background'] = darkVibrantRGB;
    }
    else {
      background = { 
        background: `url(${this.props.albumArt})`,
        ...blurred
      };      
    }
    return (
      <div>
        <div className="vl-container">
          <div className="vl-content">
            <div className="vl-song-title">Song Title</div>
            <div className="vl-artist">Artist</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
            </p>            
          </div>
        </div>
        <div id="fade" style={background}></div>
      </div>
    );
  }
}