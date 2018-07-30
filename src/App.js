import React, { Component } from 'react';
import './App.css';
import { MainMenu } from './components/main-menu';
import queryString from 'query-string';
import { getColors } from './colors';
import { ConnectAuth } from './components/connect-auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumArt: '',
      artists: '',
      songName: '',
      background: 'Default',
      backgroundStyle: { background: 'rgb(31, 37, 43)' },
      loggedIn: false
    };
    this.changeBackground = this.changeBackground.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    let accessToken = this.getToken();
    if (accessToken) {
      this.setState({ loggedIn: true });
      // function fetches data, changes background and sets states
      this.loadData(accessToken);
      // load data every 3 seconds
      setInterval(() => {
        this.loadData(accessToken);
      }, 3000);
    }
    else {
      this.setState({ loggedIn: false });
    }
  }

  //Changes background colors and evaluates colors if dynamic
  async changeBackground(background, albumArt) {
    // background
    let bg;
    // font color
    let fc;
    // define background height
    let height = '100vh';
    // default background selected
    if (background === 'Default') {
      // set background
      bg = { 
        height: height,
        background: 'rgb(31, 37, 43)'
       };
      // set font color
      fc = 'white';
    }
    // dynamic background selected
    else if (background === 'Dynamic') {
      await getColors(albumArt).then(colors => {
        //assign colors from array
        let mainColor = colors[0];
        let secondaryColor = colors[1];
        // set background
        bg = {
          height: height,
          background: mainColor
        };
        // set font color (view art info)
        fc = secondaryColor;
      });
    }
    // blurred background selected
    else {
      fc = 'white';
      // set background
      bg = {
        height: height,
        background: `url(${albumArt}) center center / cover`,
        color: fc,
        filter: 'blur(10px)'
      };
    }  
    // Set Background states
    this.setState({
      background: background,
      backgroundStyle: bg,
      fontColor: fc
    });
  }

  async loadData(accessToken) {
    //Initial data fetch
    let data;
    await this.fetchData(accessToken).then(result => {
      data = result;
    });
    // change background
    await this.changeBackground(this.state.background, data.albumArt);
    // update state
    this.setState({
      albumArt: data.albumArt,
      artists: data.artists,
      songName: data.songName
    });
  }

  getToken() {
    //Retrieve URL String
    let parsed = queryString.parse(window.location.search);
    //Stores accesstoken from URL String
    let accessToken = parsed.access_token;
    return accessToken;
  }

  fetchData(accessToken) {
    //fetch() receives endpoint and headers as arguments
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    .then(response => response.json())
    .then(async data => {
      console.log(data);
      // get current song's id
      let id = data.item.id;
      //Grabs any artist in the artists array and creates string
      let artists = '';
      data.item.artists.forEach(artist => {
        artists += `${artist.name}, `;
      });
      // concatenate artists
      artists = artists.substring(0, artists.length - 2);
      // get album art
      let albumArt = data.item.album.images[0].url;
      return {
        albumArt: albumArt,
        artists: artists,
        songName: data.item.name,
        id: id
      };
    });
  }
  render() {
    return (
      <div className="App">
        { this.state.loggedIn ?
          <MainMenu
            albumArt={this.state.albumArt}
            artists={this.state.artists}
            songName={this.state.songName}
            backgroundStyle={this.state.backgroundStyle}
            fontColor={this.state.fontColor}
            onChangeBackground={this.changeBackground}
            background={this.state.background}
            backgroundType={this.state.background}
          /> :
          <ConnectAuth />
        }
      </div>
    );
  }
}

export default App;
