<script lang="ts">

    import {createEventDispatcher, onDestroy, onMount, setContext} from 'svelte';
    import mapboxgl from 'mapbox-gl';

    export let token: string;
    export let configuration: mapboxgl.MapboxOptions;

    let loaded = false;
    export let map: mapboxgl.Map | undefined = undefined;

    const mapEventDispatcher = createEventDispatcher();
    const events = [
        'boxzoomcancel',
        'boxzoomend',
        'boxzoomstart',
        'click',
        'contextmenu',
        'data',
        'dataloading',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'error',
        'idle',
        'load',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'move',
        'moveend',
        'movestart',
        'pitch',
        'pitchend',
        'pitchstart',
        'remove',
        'render',
        'resize',
        'rotate',
        'rotateend',
        'rotatestart',
        'sourcedata',
        'sourcedataloading',
        'styledata',
        'styledataloading',
        'styleimagemissing',
        'touchcancel',
        'touchend',
        'touchmove',
        'touchstart',
        'webglcontextlost',
        'webglcontextrestored',
        'wheel',
        'zoom',
        'zoomend',
        'zoomstart',
    ];

    setContext("map", {
        get: () => {
            return map
        }
    });

    onMount(async () => {

        mapboxgl.accessToken = token;
        map = new mapboxgl.Map(configuration)
        map.on('load', () => {
            bindHandlers();
            loaded = true;
        });

    });

    onDestroy(() => {
        events.forEach((event) => {
            map?.off(event);
        });
        map?.remove();
    });

    function bindHandlers() {
        events.forEach((event) => {
            map?.on(event, (e) => {
                mapEventDispatcher(event, {event: e})
            });
        });
    }

    $: containerId = (!configuration) ? "map" : (typeof configuration.container === 'string') ? configuration.container : configuration.container.id;

</script>

<div id={containerId} class="{$$props.class}"></div>

{#if map && loaded}
    <slot/>
{/if}