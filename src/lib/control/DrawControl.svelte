<script lang="ts">

    import {createEventDispatcher, getContext, onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import MapboxDraw from "@mapbox/mapbox-gl-draw";

    import Control from "./model/Control.svelte";

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'auto' = 'top-left';


    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let dispatcher = createEventDispatcher();
    let control: mapboxgl.FullscreenControl;
    const events = ['draw.create', 'draw.delete', 'draw.combine', 'draw.uncombine', 'draw.update', 'draw.selectionchange'];

    onMount(() => {

        map = contextMap.get();

        control = new MapboxDraw({
            controls: {
                point: true,
                polygon: true,
                line_string: true,
                trash: true,
                combine_features: false,
                uncombine_features: false
            },
        });

        events.forEach(event => {
            map.on(event, (e) => {
                dispatcher(event, {event: e});
            });
        });

    });

</script>

<Control {position} bind:control/>