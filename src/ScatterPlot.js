import React, { Component } from 'react';
import 'aframe';
import * as d3 from 'd3';
import { csv } from 'd3-request';
import {Entity, Scene} from 'aframe-react';
class ScatterPlot extends Component {
   constructor(props){
      super(props)
      this.state = {
          dataFile: this.props.dataFile,
          XAxes: this.props.XAxes,
          YAxes: this.props.YAxes,
          ZAxes: this.props.ZAxes,
          radius: this.props.radius,
          colorRange: this.props.colorRange,
          colorDomain: this.props.colorDomain,
          projection: false,
      }
      this.createScatterPlot = this.createScatterPlot.bind(this)
    }
  
  componentWillMount() {
    csv(this.state.dataFile, (error, data) => {
      data = data.map(d => {
        d['sepal_length'] = +d['sepal_length'];
        d['sepal_width'] = +d['sepal_width'];
        d['petal_length'] = +d['petal_length'];
        d['petal_width'] = +d['petal_width'];
        return d
      })
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          data: data,
        });
      }
    });
  }
  componentDidUpdate() {
      this.createScatterPlot()
    }
  createScatterPlot(){
    let xScale = d3.scaleLinear()
      .domain([d3.min(this.state.data, (d) =>  d[this.state.XAxes]), d3.max(this.state.data, (d) =>  d[this.state.XAxes])])
      .range([-5,10])

    let yScale = d3.scaleLinear()
      .domain([d3.min(this.state.data, (d) =>  d[this.state.YAxes]), d3.max(this.state.data, (d) =>  d[this.state.YAxes])])
      .range([-5,10])

    let zScale = d3.scaleLinear()
      .domain([d3.min(this.state.data, (d) =>  d[this.state.ZAxes]), d3.max(this.state.data, (d) =>  d[this.state.ZAxes])])
      .range([-5,10])

    let rScale = d3.scaleSqrt()
      .domain([d3.min(this.state.data, (d) =>  d[this.state.radius]), d3.max(this.state.data, (d) =>  d[this.state.radius])])
      .range([0.05,0.15])

    let xTick = [], yTick = [], zTick = [],n = 10;

    for (var i = 0; i <= n; i++) {
      let xDomain = (d3.max(this.state.data, (d) =>  d[this.state.XAxes]) - d3.min(this.state.data, (d) =>  d[this.state.XAxes]))/n
      let yDomain = (d3.max(this.state.data, (d) =>  d[this.state.YAxes]) - d3.min(this.state.data, (d) =>  d[this.state.YAxes]))/n
      let zDomain = (d3.max(this.state.data, (d) =>  d[this.state.ZAxes]) - d3.min(this.state.data, (d) =>  d[this.state.ZAxes]))/n
      xTick.push(d3.min(this.state.data, (d) =>  d[this.state.XAxes]) + i*xDomain);
      yTick.push(d3.min(this.state.data, (d) =>  d[this.state.YAxes]) + i*yDomain);
      zTick.push(d3.min(this.state.data, (d) =>  d[this.state.ZAxes]) + i*zDomain);
    }
    d3.selectAll('a-scene')
	      .selectAll('a-entity.xTick')
        .data(xTick)
        .enter()
        .append("a-entity")
        .attr('class','xTick')
        .attr("line", (d,i) => {
          return `start: ${xScale(d)}, -5, 10; end: ${xScale(d)}, -5, 10.25}; color: #000; opacity: 1`
        });
    d3.selectAll('a-scene')
	      .selectAll('a-entity.xTickText')
        .data(xTick)
        .enter()
        .append("a-entity")
        .attr('class','xTickText')
        .attr("text", d => `value: ${d.toFixed(2)}; anchor: left; width: 5; color: black`)
        .attr("material",'color:#000')
        .attr("position", d => `${xScale(d)}, -5, 10.3`)
    d3.selectAll('a-scene')
	      .selectAll('a-entity.yTick')
        .data(yTick)
        .enter()
        .append("a-entity")
        .attr('class','yTick')
        .attr("line", (d,i) => {
          return `start: -5, ${yScale(d)}, 10; end: -5, ${yScale(d)}, 10.25}; color: #000; opacity: 1`
        })
    d3.selectAll('a-scene')
	      .selectAll('a-entity.yTickText')
        .data(yTick)
        .enter()
        .append("a-entity")
        .attr('class','yTickText')
        .attr("text", d => `value: ${d.toFixed(2)}; anchor: left; width: 5; color: black`)
        .attr("material",'color:#000')
        .attr("position", d => `-5, ${yScale(d) + 0.15}, 10.6`)
        .attr('rotation','0 90 0')
    d3.selectAll('a-scene')
	      .selectAll('a-entity.zTick')
        .data(zTick)
        .enter()
        .append("a-entity")
        .attr('class','zTick')
        .attr("line", (d,i) => {
          return `start: 10, -5, ${zScale(d)}; end: 10.25, -5, ${zScale(d)}; color: #000; opacity: 1`
        })
    d3.selectAll('a-scene')
	      .selectAll('a-entity.zTickText')
        .data(zTick)
        .enter()
        .append("a-entity")
        .attr('class','zTickText')
        .attr("text", d => `value: ${d.toFixed(2)}; anchor: left; width: 5; color: black`)
        .attr("material",'color:#000')
        .attr("position", d => `10.1, -5, ${zScale(d) - 0.2}`)
    //Drawing Axes Box
    /*
    d3.selectAll('a-scene')
            .append("a-plane")
            .attr('class','planes')
            .attr('height', '15')
            .attr('width', '15')
            .attr('color', '#999')
            .attr('opacity','0.5')
            .attr('position',`${xScale(0) + 7.5} ${yScale(0) + 7.5} ${zScale(0)}` )
    d3.selectAll('a-scene')
            .append("a-plane")
            .attr('class','planes')
            .attr('height', '10')
            .attr('width', '15')
            .attr('color', '#999')
            .attr('rotation', '-90 0 0')
            .attr('opacity','0.5')
            .attr('position',`${xScale(0) + 7.5} ${yScale(0)} ${zScale(0) + 5}` )
    d3.selectAll('a-scene')
            .append("a-plane")
            .attr('class','planes')
            .attr('height', '15')
            .attr('width', '10')
            .attr('color', '#eee')
            .attr('rotation', '0 90 0')
            .attr('opacity','0.5')
            .attr('position',`${xScale(0)} ${yScale(0) + 7.5} ${zScale(0) + 5}` )
    */

    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, -5, -5; end: -5, 10.1, -5; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, -5, -5; end: 10.1, -5, -5; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, -5, -5; end: -5, -5, 10.1; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: 10.1, 10.1, -5; end: -5, 10.1, -5; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: 10.1, 10.1, -5; end: 10.1, -5, -5; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, 10.1, 10.1; end: -5, -5, 10.1; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, 10.1, 10.1; end: -5, 10.1, -5; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: -5, -5, 10.1; end: 10.1, -5, 10.1; color: #000')
    d3.selectAll('a-scene')
            .append("a-entity")
            .attr('class','links')
            .attr("line", 'start: 10.1, -5, -5; end: 10.1, -5, 10.1; color: #000')
    //--------------------------------------//

    //Projection lines
/*
    let prijectionLineXY = d3.selectAll('a-scene')
	      .selectAll('a-entity.line_xy')
        .data(this.state.data)
        .enter()
        .append("a-entity")
        .attr('class',(d,i) => {
          return `line_xy ${i}_line_xy`
        })
        .attr("line", (d,i) => {
          return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(d[this.state.XAxes])}, ${yScale(0)}, ${zScale(d[this.state.ZAxes])}; color: white; opacity: 0`
        })
    let prijectionLineYZ = d3.selectAll('a-scene')
	      .selectAll('a-entity.line_yz')
        .data(this.state.data)
        .enter()
        .append("a-entity")
        .attr('class',(d,i) => {
          return `line_yz ${i}_line_yz`
        })
        .attr("line", (d,i) => {
          return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(0)}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; color: white; opacity: 0`
        })
    let prijectionLineXZ = d3.selectAll('a-scene')
	      .selectAll('a-entity.line_xz')
        .data(this.state.data)
        .enter()
        .append("a-entity")
        .attr('class',(d,i) => {
          return `line_xz ${i}_line_xz`
        })
        .attr("line", (d,i) => {
          return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(0)}; color: white; opacity: 0`
        })
*/
    //------------------------------------------------//

    let prijectionLineYZ = d3.selectAll('a-scene')
	      .selectAll('a-entity.line_yz')
        .data(this.state.data)
        .enter()
        .append("a-entity")
        .attr('class',(d,i) => {
          return `line_yz ${i}_line_yz`
        })
        .attr("line", (d,i) => {
          return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(d[this.state.XAxes])}, -5, ${zScale(d[this.state.ZAxes])}; color: ${this.state.colorRange[this.state.colorDomain.indexOf(d.species)]}; opacity: 0.15`
        })

    d3.selectAll('a-scene')
	      .selectAll('a-sphere')
        .data(this.state.data)
        .enter()
        .append("a-sphere")
        .attr('class',(d,i) => {
          return `dot dot_${i}`
        })
        .attr('color',d => {
          return this.state.colorRange[this.state.colorDomain.indexOf(d.species)]
        })
        .attr('radius',d => {
          return rScale(d[this.state.radius])
        })
        .attr("position", (d,i) => {
          return xScale(d[this.state.XAxes]) + ' ' + yScale( d[this.state.YAxes]) + ' ' + zScale(d[this.state.ZAxes])
        })
        .attr('opacity','0.8')
    
    //Projections
    let circleXY = d3.selectAll('a-scene')
	      .selectAll('a-circle.xy')
        .data(this.state.data)
        .enter()
        .append("a-circle")
        .attr('class',(d,i) => {
          return `xy xy_${i}`
        })
        .attr('color',d => {
          return this.state.colorRange[this.state.colorDomain.indexOf(d.species)]
        })
        .attr('radius', d =>{
          return rScale(d[this.state.radius])
        })
        .attr("position", (d,i) => {
          return xScale(d[this.state.XAxes]) + ' ' + yScale( d[this.state.YAxes]) + ' -5'
        })
        .attr('opacity','0')
    
    let circleYZ = d3.selectAll('a-scene')
	      .selectAll('a-circle.yz')
        .data(this.state.data)
        .enter()
        .append("a-circle")
        .attr('class',(d,i) => {
          return `yz yz_${i}`
        })
        .attr('color',d => {
          return this.state.colorRange[this.state.colorDomain.indexOf(d.species)]
        })
        .attr('radius',d =>{
          return rScale(d[this.state.radius])
        })
        .attr("position", (d,i) => {
          return '-5 ' + yScale( d[this.state.YAxes]) + ' ' + zScale(d[this.state.ZAxes])
        })
        .attr('rotation','0 90 0')
        .attr('opacity','0')
    
    let circleXZ = d3.selectAll('a-scene')
	      .selectAll('a-circle.xz')
        .data(this.state.data)
        .enter()
        .append("a-circle")
        .attr('class',(d,i) => {
          return `xz xz_${i}`
        })
        .attr('color',d => {
          return this.state.colorRange[this.state.colorDomain.indexOf(d.species)]
        })
        .attr('radius',d =>{
          return rScale(d[this.state.radius])
        })
        .attr("position", (d,i) => {
          return xScale(d[this.state.XAxes]) + ' -5 ' + zScale(d[this.state.ZAxes])
        })
        .attr('rotation','-90 0 0')
        .attr('opacity','0')
    
    //-------------------------------------------------------------//

    d3.selectAll('#button2')
      .on('click',() => {
        d3.selectAll('a-sphere.dot')
          .attr('opacity',1)
        d3.selectAll('a-circle')
          .attr('opacity',0)
        d3.selectAll('a-entity.line_yz')
          .attr("line", (d,i) => {
            return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(d[this.state.XAxes])}, -5, ${zScale(d[this.state.ZAxes])}; color: ${this.state.colorRange[this.state.colorDomain.indexOf(d.species)]}; opacity: 0.15`
          })
      })
    
    d3.selectAll('#button1')
      .on('click',() => {
        d3.selectAll('a-sphere.dot')
          .attr('opacity',0)
        d3.selectAll('a-circle')
          .attr('opacity',1)
        d3.selectAll('a-entity.line_yz')
          .attr("line", (d,i) => {
            return `start: ${xScale(d[this.state.XAxes])}, ${yScale(d[this.state.YAxes])}, ${zScale(d[this.state.ZAxes])}; end: ${xScale(d[this.state.XAxes])}, -5, ${zScale(d[this.state.ZAxes])}; color: ${this.state.colorRange[this.state.colorDomain.indexOf(d.species)]}; opacity: 0`
          })
      })
  }
  render() {
    if (!this.state.data) {
      return <svg />;
    }
    else {
    return (
      <Scene class = {'scene'} ref={node => this.node = node}>

         <Entity primitive="a-sky" color="#fafafa" height="100" width="100" />
          <a-entity text="value: 3D Scatter Plot: Iris Dataset; anchor: left; width: 20; color: black" position='15 5 0'></a-entity>
          <a-entity id='button1'>
            <a-box color="tomato" depth="0.1" height="2" width="5" position='17.5 3 0'></a-box>
            <a-entity text="value: 2D Projection; anchor: left; width: 15; color: white" position='15.5 3 0.1'></a-entity>
          </a-entity>
          <a-entity id='button2'>
            <a-box color="tomato" depth="0.1" height="2" width="5" position='17.5 0.8 0'></a-box>
            <a-entity text="value: 3D Plot; anchor: left; width: 15; color: white" position='15.5 0.8 0.1'></a-entity>
          </a-entity>
          <Entity primitive="a-camera" position="10 0 20" rotation='0 15 0'>
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.8 0.8 0.8', to: '1 1 1', dur: 1000}}/>
        </Entity>
      </Scene>
      )
    }
  }
}
export default ScatterPlot