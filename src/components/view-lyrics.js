import React, { Component } from 'react';
import '../css/view-lyrics.css';

export class ViewLyrics extends Component {
  render() {
    return (
      <div>
        <div className="vl-container">
          <div className="vl-content" style={{color: this.props.fontColor}} >
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
      </div>
    );
  }
}