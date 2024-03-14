<script lang="ts">

    import mapboxgl, {type AnySourceData, type AnySourceImpl} from 'mapbox-gl';
    import {onMount, onDestroy, getContext, setContext} from "svelte";

    export let name: string;
    export let type: "geojson" | "video" | "image" | "canvas" | "vector" | "raster" | "raster-dem" | "custom";
    export let data: AnySourceImpl;

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let id = `${name}-source`;
    setContext(`source`, id);

    onMount(() => {
        map = contextMap.get();

        map.addSource(id, {
            type: type,
            data: data,
            generateId: true
        } as AnySourceData);

        update(data)
    });

    onDestroy(() => {

        map.getStyle().layers.forEach(layer => {
            if ("source" in layer && layer.source && layer.source === id) {
                map.removeLayer(layer.id);
            }
        });

        map.removeSource(id);

    });


    const update = (data: AnySourceImpl) => {
        if(!map || !map.getSource(id)) return;
        map.getSource(id).setData(data);
    }

    $: update(data);

</script>

{#if map && map.getSource(id)}
    <slot/>
{/if}
