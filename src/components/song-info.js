import React, { Component } from 'react';

export class SongInfo extends Component {
  render() {
  let artist = "Artist";
  let songTitle = "Song Title";

    return (
      <div>
        <h2>{ songTitle }</h2>
        <h3>{ artist }</h3>
      </div>
    );
  }
}