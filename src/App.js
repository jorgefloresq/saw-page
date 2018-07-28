import React, { Component } from 'react';
import './App.css';
import { MainMenu } from './components/main-menu';
import queryString from 'query-string';
import { defaultB, dynamic, blurred } from './components/background-styles';
import { getColors } from './colors';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumArt: '',
      artists: '',
      songName: '',
      background: 'Default',
      backgroundStyle: { defaultB }
    };
    this.changeBackground = this.changeBackground.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // function fetches data, changes background and sets states
    this.loadData();
    // load data every 3 seconds
    setInterval(() => {
      this.loadData();
    }, 3000);
  }

  //Changes background colors and evaluates colors if dynamic
  async changeBackground(background, albumArt) {
    // background
    let bg;
    // font color
    let fc;
    // default background selected
    if (background === 'Default') {
      // set background
      bg = { ...defaultB };
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
          ...dynamic,
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
        background: `url(${albumArt})`,
        color: fc,
        ...blurred
      };
    }
    // Set Background states
    this.setState({
      background: background,
      backgroundStyle: bg,
      fontColor: fc
    })
  }
  async loadData() {
    //Initial data fetch
    let data;
    await this.fetchData().then(result => {
      data = result;
    });
    this.changeBackground(this.state.background, data.albumArt);
    this.setState({
      albumArt: data.albumArt,
      artists: data.artists,
      songName: data.songName
    })
  }

  fetchData() {
    //Retrieve URL String
    let parsed = queryString.parse(window.location.search);

    //Stores accesstoken from URL String
    let accessToken = parsed.access_token;

    //Checks if access token is retrieved 
    if (!accessToken)
      return;
    //fetch() receives endpoint and headers as arguments
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(async data => {
        console.log(data);
        // get current song's id
        let id = data.item.id;
        console.log('song changed');
        //Grabs any artist in the artists array and creates string
        let artists = '';
        data.item.artists.forEach(artist => {
          artists += `${artist.name}, `;
        });
        artists = artists.substring(0, artists.length - 2);
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
        <MainMenu
          albumArt={this.state.albumArt}
          artists={this.state.artists}
          songName={this.state.songName}
          backgroundStyle={this.state.backgroundStyle}
          fontColor={this.state.fontColor}
          onChangeBackground={this.changeBackground}
          background={this.state.background}
        />
      </div>
    );
  }
}

export default App;
