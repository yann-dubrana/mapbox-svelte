<script lang="ts">

    import {onMount} from "svelte";
    import mapboxgl from 'mapbox-gl';
    import Control from "./model/Control.svelte";

    export let compact: boolean = false;
    export let position: mapboxgl.ControlPosition = "bottom-right";

    let id = "attribution-id";
    let control: mapboxgl.AttributionControl;

    onMount(() => {

        const attributionElement = document.getElementById(id);
        if (!attributionElement) {
            return
        }

        control = new mapboxgl.AttributionControl({
            compact: compact,
            customAttribution: attributionElement.innerHTML
        })

        control = control
    });

</script>

<Control {position} bind:control>
    <template {id} >
        <slot/>
    </template >
</Control>
