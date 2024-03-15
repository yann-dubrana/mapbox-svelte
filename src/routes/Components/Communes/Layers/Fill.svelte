<script>
import {MapLayer} from "$lib";

export let selected = null;

let type = "fill";
let paint = {"fill-color": "#088","fill-opacity": 0.8};
let onmouseenter = ({detail}) => (detail.event.target.getCanvas().style.cursor = "pointer");
let onmouseleave = ({detail}) => (detail.event.target.getCanvas().style.cursor = "");
let onclick = ({detail}) => {selected = detail.event.features[0].properties};

</script>

<MapLayer {type} {paint} on:mouseenter = {onmouseenter} on:click = {onclick} on:mouseleave = {onmouseleave}/>