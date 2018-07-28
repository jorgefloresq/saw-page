import React, { Component } from 'react';
import './App.css';
import { MainMenu } from './components/main-menu';
import queryString from 'query-string';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      albumArt: '',
      artists: '',
      songName: ''
    }
  }

  componentDidMount() {
    setInterval(() => {
      //Retrieve URL String
      let parsed = queryString.parse(window.location.search);

      //Stores accesstoken from URL String
      let accessToken = parsed.access_token;

      //Checks if access token is retrieved 
      if (!accessToken)
        return;
      //fetch() receives endpoint and headers as arguments
      fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          //Grabs any artist in the artists array and creates string
          let artists = '';
          data.item.artists.forEach(artist => {
            artists += `${artist.name}, `;
          });
          artists = artists.substring(0, artists.length - 2);

          //console.log(data.item.album.images[0].url);
          //console.log(artists);
          //console.log(data.item.name);
          this.setState({
            albumArt: data.item.album.images[0].url,
            artists: artists,
            songName: data.item.name
          });
        });
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        <MainMenu
          albumArt={this.state.albumArt}
          artists={this.state.artists}
          songName={this.state.songName}
        />
      </div>
    );
  }
}

export default App;
