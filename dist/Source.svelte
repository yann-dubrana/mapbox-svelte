<script>import mapboxgl, {} from "mapbox-gl";
import { onMount, onDestroy, getContext, setContext } from "svelte";
export let name;
export let type;
export let data;
let map;
let contextMap = getContext("map");
let id = `${name}-source`;
setContext(`source`, id);
onMount(() => {
  map = contextMap.get();
  map.addSource(id, {
    type,
    data,
    generateId: true
  });
  update(data);
});
onDestroy(() => {
  map.getStyle().layers.forEach((layer) => {
    if ("source" in layer && layer.source && layer.source === id) {
      map.removeLayer(layer.id);
    }
  });
  map.removeSource(id);
});
const update = (data2) => {
  if (!map || !map.getSource(id))
    return;
  map.getSource(id).setData(data2);
};
$:
  update(data);
</script>

{#if map && map.getSource(id)}
    <slot/>
{/if}
