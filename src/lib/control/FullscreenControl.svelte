<script lang="ts">

    import {onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'= 'top-left';
    export let container: string = 'body';

    let control: mapboxgl.FullscreenControl;
    onMount(() => {
        control = new mapboxgl.FullscreenControl({container: document.querySelector(container)});
    });

</script>

<Control {position} bind:control />