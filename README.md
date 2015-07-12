# leaflet.levelpicker

A level picker for leaflet.

## Getting Started
### On the server
Install the module with: `npm install leaflet.levelpicker`

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bmoregeo/leaflet.levelpicker/master/dist/leaflet.levelpicker.min.js
[max]: https://raw.github.com/bmoregeo/leaflet.levelpicker/master/dist/leaflet.levelpicker.js

In your web page:

```html
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
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Christopher Fricke  
Licensed under the MIT license.
