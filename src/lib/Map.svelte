<script lang="ts">

    import {createEventDispatcher, onMount, setContext} from 'svelte';
    import mapboxgl from 'mapbox-gl';

    export let token: string;
    export let configuration: mapboxgl.MapboxOptions;

    let loaded = false;
    export let map: mapboxgl.Map | undefined = undefined;

    const mapEventDispatcher = createEventDispatcher();
    setContext("map", {get: () => {return map}});
    onMount(async () => {

        mapboxgl.accessToken = token;
        map = new mapboxgl.Map(configuration)
        map.on('load', () => {bindHandlers(), loaded = true;});

    });

    function bindHandlers() {

        map.on("zoomend", (e) => {mapEventDispatcher("zoomend", {event:e})});
        map.on("mousemove", (e) => {mapEventDispatcher("mousemove", {event:e})});
        map.on("click", (e) => {mapEventDispatcher("click", {event:e})});

    }

    $: containerId = (!configuration) ? "map" : (typeof configuration.container === 'string') ? configuration.container : configuration.container.id;

</script>

<div id={containerId} class="{$$props.class}"></div>

{#if map && loaded}
    <slot/>
{/if}