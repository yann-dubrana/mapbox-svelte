<script>import { getContext, onDestroy, onMount } from "svelte";
import mapboxgl from "mapbox-gl";
export let name;
export let position = "top-right";
let map;
let contextMap = getContext("map");
let id = `${name}-id`;
let currentControl;
class Builder {
  constructor(elementID) {
    this.elementID = elementID;
    this.component = null;
  }
  component;
  onAdd(map2) {
    this.component = document.getElementById(this.elementID);
    if (this.component === null) {
      throw new Error("Component not found");
    }
    return this.component;
  }
  onRemove() {
    this.component?.parentNode?.removeChild(this.component);
  }
}
const remove = () => {
  if (currentControl) {
    map.removeControl(currentControl);
  }
};
onMount(() => {
  map = contextMap.get();
  remove();
  currentControl = new Builder(id);
  map.addControl(currentControl, position);
});
onDestroy(remove);
</script>

<div {id} class="{$$props.class} mapboxgl-ctrl mapboxgl-ctrl-group">
    <slot/>
</div>
