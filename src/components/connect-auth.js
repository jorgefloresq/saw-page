import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import lyricist from 'lyricist';

//Defines height of columns within rows
let colWire = {
  //border: 'solid',
  height: '33vH',
};

//
let txtConnect = {
  //border: "solid",
  margin: 0,
  paddingTop: "10vh",
  paddingBottom: "5vH"
};

export class ConnectAuth extends Component {
  async componentDidMount() {
    const _lyricist = new lyricist('gVpCQ3qUJnll1jqNteqkbfglCuPF9mdki_TortZigmYnEHkHgicinMsvxtL3t3k6');
    const song = await _lyricist.song(714198, { fetchLyrics: true });
    console.log(song.lyrics);
  }
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid" >
            <Col sm={12} md={12} lg={12} style={colWire}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={4} md={4} lg={4}>
            </Col>
            <Col sm={4} md={4} lg={4} style={colWire}>
              <div>
                <h2 style={txtConnect}>Connect with Spotify</h2>
                <Button onClick={() => {
                  window.location = window.location.href.includes('localhost')
                    ? 'http://localhost:8888/login'
                    : 'https://saw-backend.herokuapp.com/login'
                }
                } bsStyle="success" bsSize="large">Connect</Button>
              </div>
            </Col>
            <Col sm={4} md={4} lg={4}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={12} md={12} lg={12} style={colWire}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}