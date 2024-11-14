/!\ This is not a great version, not sure if any type of source is supported. mapbow-svelte-5 based on runes is on the way. /!\

## Svelte MapBox

A simple, lightweight, and flexible Svelte wrapper for MapBox. It's designed to be as simple as possible to use, and to be as flexible as possible to use.

It includes mapbox-gl-geocoder and mapbox-gl-draw as built-in components.

## Installing

```
npm i mapbox-svelte
```

### Basic Usage (Map)

The container component is the map, and there are a variety of components which go on the map.

```js
<script>
import {env} from "$env/dynamic/public";
import {Map} from "mapbox-svelte";


let token = env.PUBLIC_MAPBOX_TOKEN as string;
let configuration = {
    container: "map-demo",
    style: "mapbox://styles/mapbox/satellite-streets-v11",
    center: [0.7051700188074221, 44.403806782279986],
    zoom: 7,
    attributionControl: false
}

let map;
const click = ({detail}) => {console.log(detail)}

</script>

<Map bind:map {token} {configuration} class="map-wrapper map-size" on:click={click}>

    //components go here

</Map>

```

### Sources

Sources are the data that you want to display on the map. They can be a variety of types, including GeoJSON, images, and vector tiles.
```js
<script>
    import {MapSource} from "$lib";

    let autofit = false;
    let data = {"type": "FeatureCollection", "features": []}
    
</script>

<MapSource name="city" type="geojson" bind:data {autofit} fitBoundsOptions={{"padding": 180}}>
    //Layers goes here
</MapSource>

//Control and custom controls goes here
 ```

### Layers

Layers are the visual representation of the data from the source. They can be a variety of types, including fill, line, symbol, circle, and raster.

```js
<script>
    import {MapLayer} from "mapbox-svelte";

    let type = "line";
    let paint = {"line-color": "#f00", "line-width": 2};

</script>

<MapLayer {type} {paint}/>
```

All events are passed to the svelte component for easy binding.
```js
<script>
    import {MapLayer} from "mapbox-svelte";

    export let selected = null;

    let type = "fill";
    let paint = {"fill-color": "#088","fill-opacity": 0.8};
    let onmouseenter = ({detail}) => (detail.event.target.getCanvas().style.cursor = "pointer");
    let onmouseleave = ({detail}) => (detail.event.target.getCanvas().style.cursor = "");
    let onclick = ({detail}) => {selected = detail.event.features[0].properties};

</script>

<MapLayer {type} {paint} on:mouseenter = {onmouseenter} on:click = {onclick} on:mouseleave = {onmouseleave}/>
```

### Markers & Popups

By default, markers are typical map pins to which you can pass an options object.

```js
<Marker lng={0.7551700188074221} lat={44.403806782279986} markerOptions={{color: "#546"}}/>
```

You may also create a marker with a popup insert as a slot.

```js
<Marker lng={0.7051700188074226} lat={44.403806782279986}>
    <svelte:fragment slot="popup">
        <div class="p-6">
            <h1 class="text-xl font-bold">Popup</h1>
            <p class="text-sm">This is a popup</p>
        </div>
    </svelte:fragment>
</Marker>
```
### Controls

Controls are the UI elements that allow the user to interact with the map. They can be a variety of types, including navigation, geolocation, and scale. You can also create custom controls.

All control implements their position, and some of the options that mapbox provide. Events are also mapped.

```js
<script>

    import {
    MapDrawControl,
    MapFullscreenControl,
    MapGeocoderControl,
    MapGeolocateControl,
    MapNavigationControl
} from "mapbox-svelte";

</script>

<MapGeolocateControl/>
<MapFullscreenControl/>
<MapNavigationControl/>
<MapDrawControl/>
<MapGeocoderControl countries={'fr'}/>
```

### Custom Controls

You can also create custom controls.

```js
<script>
    import {MapCustomControl} from "$lib";
    let value = "";
    
</script>

<MapCustomControl name="search" position="top-right" class="control-size">
    <div class="text-center p-6">
        <label for="Label">Label</label>
        <input type="text" bind:value placeholder="value"/>
    </div>
</MapCustomControl>
```
## Demo

To see the basic demo:

Make sure you copy the `.env` file to `.env.local` and then populate it with your mapbox key.

`
npm run dev
`
