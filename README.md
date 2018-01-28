# VR-ScatterPlot
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)
VR-ScatterPlot is a reusable scatter plot visualization components for Virtual Reality. It combines d3 with react and a-frame to generate scatter plot.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Installation

This project uses yarn. Install it as described here [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/) if you haven't already.

To install this project, simply clone the repo and run yarn

### Local Development
In the project directory, you can run:
```
yarn start
```
Runs the app in the development mode.

```
<ScatterPlot
  dataFile = '/data.csv'
  XAxes = 'sepal_length'
  YAxes = 'sepal_width'
  YAxes = 'petal_length'
  radius = 'petal_width'
  colorRange = {['#ff0000', '#00ff00', '#0000ff']}
  colorDomain = {['setosa','versicolor','virginica']}
/>
```

#### Properties

Name|Type|Description
--- | --- | ---
dataFile|String|Path to the data file. **File should be in csv format (Required)**
XAxes|String|Column title from which the data that needs to be used for X-Axes is taken. **(Required)**
YAxes|String|Column title from which the data that needs to be used for Y-Axes is taken. **(Required)**
YAxes|String|Column title from which the data that needs to be used for Z-Axes is taken. **(Required)**
radius|String|Column title from which the data that needs to be used for radius for dots is taken. **(Required)**
colorRange|Array|Colors for dots for ordinal scale. No. of element in array in `colorRange` should be same as `colorDomain`. **(Required)**
colorDomain|Array|Domain for colors for ordinal scale. No. of element in array in `colorRange` should be same as `colorDomain`. **(Required)**
