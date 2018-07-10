import React, { Component } from 'react';
import '../css/song-info.css'

export class SongInfo extends Component {
  render() {
  let artist = "Artist";
  let songTitle = "Song Title";

    return (
      <div>
        <h2 className="song-title">{ songTitle }</h2>
        <h3 className="song-artist">{ artist }</h3>
      </div>
    );
  }
}