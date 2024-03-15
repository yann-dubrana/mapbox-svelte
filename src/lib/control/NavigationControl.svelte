<script lang="ts">

    import {onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left';
    export let showCompass: boolean = true;
    export let visualizePitch: boolean = true;
    export let showZoom: boolean = true;

    let control: mapboxgl.NavigationControl;

    onMount(() => {
        control = new mapboxgl.NavigationControl({
            showCompass: showCompass,
            visualizePitch: visualizePitch,
            showZoom: showZoom
        });
    });

</script>

<Control {position} bind:control/>