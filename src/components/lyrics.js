import React, { Component } from 'react';

let style = {
  width: 500,
  height: 500,
  background: 'rgb(65, 68, 75)',
  fontSize: 25,
  lineHeight: 2,
  color: 'white',
  margin: 'auto',
  marginTop: 30,
  padding: 25,
  overflowY: 'auto' 
}

export class Lyrics extends Component {
  render() {
    return (
      <div style={style}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit necessitatibus illum assumenda porro eveniet, voluptatem iusto veritatis, magni quam incidunt rerum eaque quidem. Sed quos officia iusto eaque eveniet!<br/><br/>
        </p>
      </div>
    );
  }
}