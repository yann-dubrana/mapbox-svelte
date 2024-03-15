<script lang="ts">
    import {env} from "$env/dynamic/public";

    import {type MapboxOptions} from "mapbox-gl";

    import {
        Map,
        MapAttributionControl,
        MapFullscreenControl,
        MapGeolocateControl,
        MapNavigationControl,
        MapScaleControl
    } from "$lib";

    import Legend from "./Components/Legend.svelte";
    import Communes from "./Components/Communes/Source.svelte";

    let token: string = env.PUBLIC_MAPBOX_TOKEN as string;
    let configuration: MapboxOptions = {
        container: "map-demo",
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [0.7051700188074221, 44.403806782279986],
        zoom: 7,
        attributionControl: false
    }

    let map: any;
    let commune: any = null;

    function clearSelection({detail}: CustomEvent) {

        let layers = map.getStyle().layers.filter((layer: any) => layer.id.endsWith("-layer")).map((layer: any) => {
            return layer.id
        });

        let features = map.queryRenderedFeatures(detail.event.point, {layers: layers});
        if (features.length > 0) {
            return
        }

        commune = null;

    }

</script>

<Map bind:map {token} {configuration} class="map-wrapper map-size" on:click={clearSelection}>

    <MapGeolocateControl on:geolocate={({detail}) => {console.log(detail.event)}}/>
    <MapFullscreenControl/>
    <MapNavigationControl/>

    <MapScaleControl/>

    <Legend/>

    <MapAttributionControl>
        <a href="https://optimaize.fr/" target="_blank">© Optim.aize</a>
    </MapAttributionControl>

    <Communes bind:selected={commune}/>

</Map>

<style>

    :global(.p-6) {
        padding: 0.75rem;
    }

    :global(.control-size) {
        width: 220px;
        overflow: hidden;
    }

    :global(.map-size) {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

</style>