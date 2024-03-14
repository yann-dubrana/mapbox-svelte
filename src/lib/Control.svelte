<script lang="ts">

    import {getContext, onDestroy, onMount} from "svelte";
    import mapboxgl from "mapbox-gl";

    export let name: string;
    export let position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = 'top-right';

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let id = `${name}-id`;
    let currentControl: mapboxgl.Control | mapboxgl.IControl;

    class Builder {

        private component: HTMLElement | null;

        constructor(private readonly elementID: string) {this.component = null}

        onAdd(map:mapboxgl.Map): HTMLElement {
            this.component = document.getElementById(this.elementID);
            if(this.component === null) {
                throw new Error('Component not found');
            }
            return this.component;
        }

        onRemove() {
            this.component?.parentNode?.removeChild(this.component);
        }

    }

    const remove = () => {
        if(currentControl){
            map.removeControl(currentControl);
        }
    }

    onMount(() => {

        map = contextMap.get();

        remove()

        currentControl = new Builder(id)
        map.addControl(currentControl, position);

    });

    onDestroy(remove);

</script>

<div {id} class="{$$props.class} mapboxgl-ctrl mapboxgl-ctrl-group">
    <slot/>
</div>
