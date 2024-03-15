<script lang="ts">
    import {env} from "$env/dynamic/public";

    import {type MapboxOptions} from "mapbox-gl";

    import {
        Map,
        MapAttributionControl,
        MapGeocoderControl,
        MapDrawControl,
        MapFullscreenControl,
        MapGeolocateControl,
        MapNavigationControl,
        MapScaleControl
    } from "$lib";

    import Legend from "./Components/Legend.svelte";
    import Communes from "./Components/Communes/Source.svelte";
    import Marker from "$lib/Marker.svelte";

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
    <MapDrawControl on:draw.create={({detail}) => {console.log(detail.event)}}/>
    <MapScaleControl/>

    <MapGeocoderControl countries={'fr'}/>
    <Legend/>

    <MapAttributionControl>
        <a href="https://optimaize.fr/" target="_blank">© Optim.aize</a>
    </MapAttributionControl>

    <Communes bind:selected={commune}/>

    <Marker lng={0.7551700188074221} lat={44.403806782279986} markerOptions={{color: "#546"}}/>
    <Marker lng={0.7051700188074226} lat={44.403806782279986}>
        <svelte:fragment slot="popup">
            <div class="p-6">
                <h1 class="text-xl font-bold">Popup</h1>
                <p class="text-sm">This is a popup</p>
            </div>
        </svelte:fragment>
    </Marker>

</Map>

<style>

    :global(.p-6) {
        padding: 0.75rem;
    }

    :global(.control-size) {
        min-width: 240px;
        width: 33%;
        max-width: 360px;
        overflow: hidden;
    }

    :global(.map-size) {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

</style>