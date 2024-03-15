<script>
import {MapSource} from "$lib";

import FillArea from "./Layers/Fill.svelte";
import LineArea from "./Layers/Line.svelte";
import ControlSearch from "./Controls/ControlSearch.svelte";
import ControlFeature from "./Controls/ControlFeature.svelte";


export let selected = null;

let autofit = false;
let codePostal = "";

let data = {"type": "FeatureCollection", "features": []}

const loadData = (codePostal) => {

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=code,nom,contour`)
        .then(response => response.json())
        .then(communes => {
            data.features = communes.map(commune => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": commune.nom,
                        "code": commune.code
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": commune.contour.coordinates
                    }
                }
            });
        });
}

$: {
    loadData(codePostal);
}


</script>

<MapSource name="communes-33650" type="geojson" bind:data {autofit} fitBoundsOptions={{"padding": 180}}>
    <FillArea bind:selected/>
    <LineArea/>
</MapSource>

<ControlSearch bind:codePostal />
<ControlFeature bind:commune={selected} />

