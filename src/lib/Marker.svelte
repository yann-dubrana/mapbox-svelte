<script lang="ts">

    import {createEventDispatcher, getContext, onDestroy, onMount} from "svelte";
    import mapboxgl from "mapbox-gl";
    import {markerEvents as events} from "./events.js";

    export let lat: number;
    export let lng: number;
    export let popupOptions:mapboxgl.PopupOptions = {}
    export let markerOptions: mapboxgl.MarkerOptions = {}

    const dispatch = createEventDispatcher();

    let map: mapboxgl.Map;
    let contextMap: { get: CallableFunction } = getContext('map');

    let id = `popup-${Math.random().toString(36).substring(7)}`;
    let marker: mapboxgl.Marker;
    let popup: mapboxgl.Popup;

    onMount(() => {
        map = contextMap.get();
        marker = new mapboxgl.Marker(markerOptions);

        if($$slots.popup){

            const popupContent = document.getElementById(id);
            if(!popupContent){
                throw new Error('Popup content not found');
            }

            popup = new mapboxgl.Popup(popupOptions)
                .setHTML(popupContent.innerHTML)
                .addTo(map);

            marker.setPopup(popup);
        }

        marker
            .setLngLat({ lng, lat })
            .addTo(map)

        events.forEach(event => {
            marker.on(event, (e) => {
                dispatch(event, e);
            });
        });

    });

    onDestroy(() => {
        if(popup)
            popup.remove();
        if(marker)
            marker.remove();
    });

</script>

<template {id}>
    <slot name="popup"/>
</template>
