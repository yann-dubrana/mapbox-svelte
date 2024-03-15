<script lang="ts">

    import {onMount, onDestroy, getContext, createEventDispatcher} from "svelte";
    import mapboxgl, {type AnyLayer, type AnyLayout, type AnyPaint, type MapLayerEventType} from "mapbox-gl";
    import {layerEvents as events} from "$lib/events.js";

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

        if(map.getLayer(name)){
            map.removeLayer(name);
        }

    });

</script>