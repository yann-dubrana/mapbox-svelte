<script lang="ts">

    import {onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "$lib/control/model/Control.svelte";

    type Unit = 'imperial' | 'metric' | 'nautical';

    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-left';
    export let maxWidth: number = 80;
    export let unit: Unit = 'metric';
    export let nautical: boolean = false;

    let control: mapboxgl.ScaleControl;
    onMount(() => {

        control = new mapboxgl.ScaleControl({
            maxWidth: maxWidth,
            unit: unit,
            nautical: nautical
        });

    });

    export const setUnit = (unit: Unit) => {
        if (!control) {
            return;
        }
        control.setUnit(unit);
    }

</script>

<Control {position} bind:control/>
