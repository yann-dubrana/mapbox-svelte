<script lang="ts">
    import Control from "./model/Control.svelte";
    import Builder from "./model/builder";
    import type {IControl} from "mapbox-gl";
    import {onMount} from "svelte";

    export let position: string;
    export let name: string;

    let id: string = `${name}-id`;
    let control: IControl;

    onMount(() => {
        control = new Builder(id);
    });

</script>

<Control {position} bind:control>
    <div {id} class="{$$props.class} mapboxgl-ctrl mapboxgl-ctrl-group">
        <slot/>
    </div>
</Control>
