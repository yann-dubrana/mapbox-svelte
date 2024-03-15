<script lang="ts">

    import {onMount, onDestroy, getContext, setContext} from "svelte";
    import mapboxgl, {type AnySourceData, type AnySourceImpl} from 'mapbox-gl';
    import * as turf from '@turf/turf'

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
            generateId: $$props.generateId || false
        } as AnySourceData);

        update(data)
    });

    onDestroy(() => {

        map.getStyle().layers.forEach(layer => {
            if ("source" in layer && layer.source && layer.source === id) {
                map.removeLayer(layer.id);
            }
        });

        if(map.getSource(id)){
            map.removeSource(id);
        }

    });


    const autofit = () => {

        const bounds: [number, number, number, number] = turf.bbox(data)
        if (!$$props.autofit || !bounds.every(b => b !== Infinity && b !== -Infinity)) {
            return;
        }

        map.fitBounds([bounds[0], bounds[1], bounds[2], bounds[3]], {
            padding: $$props.fitBoundsOptions?.padding || 20,
        });

    }

    const update = (data: AnySourceImpl) => {
        if (!map || !map.getSource(id)) return;
        map.getSource(id).setData(data);
        autofit();
    }

    $: update(data);

</script>

{#if map && map.getSource(id)}
    <slot/>
{/if}
