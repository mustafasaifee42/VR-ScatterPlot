import React, { Component } from 'react';
import './App.css';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import ScatterPlot from './ScatterPlot.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }
  render () {
    return (
      <ScatterPlot
        dataFile = '/data.csv'
        XAxes = 'sepal_length'
        YAxes = 'sepal_width'
        ZAxes = 'petal_length'
        radius = 'petal_width'
        colorRange = {['#ff0000', '#00ff00', '#0000ff']}
        colorDomain = {['setosa','versicolor','virginica']}
        />
    );
  }
}

export default App;
