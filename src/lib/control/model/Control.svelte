<script lang="ts">

    import {getContext, onDestroy, onMount} from "svelte";
    import mapboxgl from "mapbox-gl";

    export let control: mapboxgl.Control | mapboxgl.IControl;
    export let position: "top-right" | "top-left" | "bottom-right" | "bottom-left";

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    const remove = () => {
        if(control){
            map.removeControl(control);
        }
    }

    onMount(() => {
        map = contextMap.get();
    });

    onDestroy(remove);

    const add = (ctrl) => {
        if(!map || !ctrl){
            return
        }
        map.addControl(ctrl, position);
    }

    $: add(control)
</script>

<slot/>

