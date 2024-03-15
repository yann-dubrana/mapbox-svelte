<script lang="ts">

    import {createEventDispatcher, onDestroy, onMount, setContext} from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import {mapEvents as events} from './events.js';

    export let token: string;
    export let configuration: mapboxgl.MapboxOptions;

    let loaded = false;
    export let map: mapboxgl.Map | undefined = undefined;

    const mapEventDispatcher = createEventDispatcher();


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

{#if mapboxgl.supported()}
    {#if map && loaded}
        <slot/>
    {/if}
{:else}
    <p>Mapbox GL is not supported</p>
{/if}
