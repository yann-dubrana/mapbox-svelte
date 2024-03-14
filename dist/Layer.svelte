<script>import mapboxgl, {} from "mapbox-gl";
import { onMount, onDestroy, getContext } from "svelte";
import { createEventDispatcher } from "svelte";
const events = [
  "mousedown",
  "mouseup",
  "click",
  "dblclick",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "contextmenu",
  "touchstart",
  "touchend",
  "touchcancel"
];
export let type;
export let paint = {};
export let layout = {};
const dispatch = createEventDispatcher();
let map;
let contextMap = getContext("map");
let source = getContext("source");
let name = `${source.replace("-source", "")}-${type}-layer`;
onMount(() => {
  map = contextMap.get();
  map.addLayer({
    id: name,
    type,
    source,
    paint,
    layout
  });
  events.forEach((event) => {
    map.on(event, name, (e) => {
      dispatch(event, { event: e });
    });
  });
});
onDestroy(() => {
  if (map.getLayer(name)) {
    map.removeLayer(name);
  }
});
</script>