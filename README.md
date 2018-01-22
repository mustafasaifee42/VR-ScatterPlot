# VR-ScatterPlot

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
