<script lang="ts">

    import {onMount} from "svelte";
    import Control from "./model/Control.svelte";

    import mapboxgl from "mapbox-gl";
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

    export let zoom: number = 16;
    export let flyTo: boolean = true;
    export let placeholder: string = "Search";
    export let proximity: any = null;
    export let trackProximity: boolean = true;
    export let collapsed: boolean = false;
    export let clearAndBlurOnEsc: boolean = false;
    export let clearOnBlur: boolean = false;
    export let bbox: any = null;
    export let countries: string = '';
    export let types: string = 'place, poi, address, neighborhood, localadmin, district, postcode, locality, region, country';
    export let minLength: number = 2;
    export let limit: number = 5;
    export let language: string = navigator.language;

    let control: MapboxGeocoder | null = null;
    onMount(() => {
        control = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            zoom: zoom,
            flyTo: flyTo,
            placeholder: placeholder,
            proximity: proximity,
            trackProximity: trackProximity,
            collapsed: collapsed,
            clearAndBlurOnEsc: clearAndBlurOnEsc,
            clearOnBlur: clearOnBlur,
            bbox: bbox,
            countries: countries,
            types: types,
            minLength: minLength,
            limit: limit,
            language: language
        });
    });

</script>

<Control {position} bind:control/>