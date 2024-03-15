<script lang="ts">

    import mapboxgl, {type AnyLayer, type AnyLayout, type AnyPaint, type MapLayerEventType} from "mapbox-gl";
    import {onMount, onDestroy, getContext} from "svelte";
    import {createEventDispatcher} from 'svelte';

    type LayerType =
        "symbol"
        | "line"
        | "background"
        | "circle"
        | "fill-extrusion"
        | "fill"
        | "heatmap"
        | "hillshade"
        | "raster"
        | "custom"
        | "sky";

    const events = [
        'mousedown',
        'mouseup',
        'click',
        'dblclick',
        'mousemove',
        'mouseenter',
        'mouseleave',
        'mouseover',
        'mouseout',
        'contextmenu',
        'touchstart',
        'touchend',
        'touchcancel',
    ];

    export let type: LayerType;
    export let paint: AnyPaint = {};
    export let layout: AnyLayout = {};

    const dispatch = createEventDispatcher();

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let source: string = getContext('source');
    let name = `${source.replace("-source", "")}-${type}-layer`

    onMount(() => {

        map = contextMap.get();

        map.addLayer({
            id: name,
            type: type,
            source: source,
            paint: paint,
            layout: layout
        } as AnyLayer);

        events.forEach(event => {
            map.on(event as keyof MapLayerEventType, name, (e) => {
                dispatch(event, {event: e});
            });
        });

    });


    onDestroy(() => {

        events.forEach(event => {
            map.off(event as keyof MapLayerEventType, name);
        });

        if(map.getLayer(name)){
            map.removeLayer(name);
        }

    });

</script>