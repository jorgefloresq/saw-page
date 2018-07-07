import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Image} from 'react-bootstrap';

export class ArtImage extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <Image src="https://f4.bcbits.com/img/a2351616332_16.jpg"/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}