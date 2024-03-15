<script lang="ts">

    import {onMount} from "svelte";
    import Control from "./model/Control.svelte";

    import mapboxgl from "mapbox-gl";
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

    export let zoom: number = 16;
    export let flyTo: boolean = true;
    export let placeholder: string = "Search";
    export let countries: string = '';
    export let minLength: number = 2;
    export let limit: number = 5;

    let control: MapboxGeocoder | null = null;
    onMount(() => {
        control = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            zoom: zoom,
            flyTo: flyTo,
            placeholder: placeholder,
            countries: countries,
            minLength: minLength,
            limit: limit,
        });
    });

</script>

<Control {position} bind:control/>