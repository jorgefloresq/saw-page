import React, { Component } from 'react';
import '../css/song-info.css'

export class SongInfo extends Component {
  render() {
  let artists = this.props.artists;
  let songName = this.props.songName;

    return (
      <div>
        <h2 className="song-title">{ songName }</h2>
        <h3 className="song-artist">{ artists }</h3>
      </div>
    );
  }
}