<script lang="ts">

    import {createEventDispatcher, getContext, onDestroy, onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'auto' = 'top-left';
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

    const events = [
        'geolocate',
        'error',
        'outofmaxbounds',
        'trackuserlocationstart',
        'trackuserlocationend'
    ];


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

    onDestroy(() => {
        events.forEach(event => {
            map?.off(event);
        });
    });

    export const trigger = () => {
        return control.trigger();
    }

</script>

<Control {position} bind:control/>