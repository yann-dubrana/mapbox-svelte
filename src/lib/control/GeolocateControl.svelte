<script lang="ts">

    import {createEventDispatcher, getContext, onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import {geolocateEvents as events} from "../events.js";
    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left';
    export let fitBoundsOptions: mapboxgl.FitBoundsOptions = {maxZoom: 15};
    export let geolocation: any = window.navigator.geolocation;
    export let positionOptions: PositionOptions = {enableHighAccuracy: false, timeout: 6000};
    export let showAccuracyCircle: boolean = true;
    export let showUserHeading: boolean = false;
    export let showUserLocation: boolean = true;
    export let trackUserLocation: boolean = false;

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let dispatcher = createEventDispatcher();
    let control: mapboxgl.GeolocateControl;


    onMount(() => {

        map = contextMap.get();

        control = new mapboxgl.GeolocateControl({
            fitBoundsOptions: fitBoundsOptions,
            geolocation: geolocation,
            positionOptions: positionOptions,
            showAccuracyCircle: showAccuracyCircle,
            trackUserLocation: trackUserLocation,
            showUserHeading: showUserHeading,
            showUserLocation: showUserLocation
        });

        events.forEach(event => {
            map.on(event, (e) => {
                dispatcher(event, {event: e});
            });
        });

    });

    export const trigger = () => {
        return control.trigger();
    }

</script>

<Control {position} bind:control/>