<script lang="ts">

    import {createEventDispatcher, onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'auto' = 'top-left';
    export let fitBoundsOptions: mapboxgl.FitBoundsOptions = {maxZoom: 15};
    export let geolocation: Object = window.navigator.geolocation;
    export let positionOptions: PositionOptions = {enableHighAccuracy: false, timeout: 6000};
    export let showAccuracyCircle: boolean = true;
    export let showUserHeading: boolean = false;
    export let showUserLocation: boolean = true;
    export let trackUserLocation: boolean = false;


    let control: mapboxgl.GeolocateControl;
    let dispatcher = createEventDispatcher();
    const events = [
        'geolocate',
        'error',
        'outofmaxbounds',
        'trackuserlocationstart',
        'trackuserlocationend'
    ];


    onMount(() => {

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
            control.on(event, (e) => {
                dispatcher(event, {event: e});
            });
        });

    });

    export const trigger = () => {
        return control.trigger();
    }

</script>

<Control {position} bind:control/>