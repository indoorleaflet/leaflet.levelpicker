# leaflet.levelpicker

A level picker for leaflet. You can view some examples on the [github pages page](http://bmoregeo.github.io/leaflet.levelpicker/index.html).

## Getting Started
### On the server
Install the module with: `npm install leaflet.levelpicker`

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bmoregeo/leaflet.levelpicker/master/dist/leaflet.levelpicker.min.js
[max]: https://raw.github.com/bmoregeo/leaflet.levelpicker/master/dist/leaflet.levelpicker.js

In your web page:

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css" />
<script src="dist/leaflet.levelpicker.min.js"></script>

<script src="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>
<script src="dist/leaflet.levelpicker.min.js"></script>
<script>
    var mapboxUrl= 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    var coordinates = [39.2833, -76.6167];
    var levels = [
            {floor:'1', floorid: '001-1'},
            {floor:'2', floorid: '001-2'},
            {floor:'3', floorid: '001-3'}
        ];

    var map = L.map('map', {
        center: coordinates,
        zoom: 17,
        layers: [L.tileLayer(mapboxUrl, {id: 'examples.map-20v6611k'})],
        zoomControl: false,
        dragging: true
    });

    new L.Control.LevelPicker({ position: 'bottomleft', levels:levels }).addTo(map);


</script>
```

## Documentation
This is a level picker plugin for leaflet. It is used to flip between an ordered list of level objects. As an example,
you could create a base map for each level of a building.

### Input Options

* levels: This is a required parameter for the controller. This should be an array of floor/level objects. The level
attribute is displayed in the controller. Additional attributes  are optional. The level objects should be in the order
of the building. (ie. [{"level": "B1"}, {"level": "1"}, {"level": "M1"}, {"level": "2"}])
```
var levels = [
        {level:'1', levelid: '001-1'},
        {level:'2', levelid: '001-2'},
        {level:'3', levelid: '001-3'}
    ];
```

* position (optional): Follows standard leaflet position option. Defaults to topright.
* levelUpText (optional): The text set on the level up button. Defaults to +.
* levelDownText (optional): The text set on the level down button. Defaults to -.

### Events
This plugin casts the level.change event when the level is changed within the control.  You can access this level
change event using the following code.

```
self.map.on('level.change', function(e) {console.log(e.level)});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Christopher Fricke  
Licensed under the MIT license.
