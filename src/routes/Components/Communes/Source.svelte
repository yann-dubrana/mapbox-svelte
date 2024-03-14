<script>
import Source from "$lib/Source.svelte";

import FillArea from "./Layers/Fill.svelte";
import LineArea from "./Layers/Line.svelte";
import ControlSearch from "./Controls/ControlSearch.svelte";
import ControlFeature from "./Controls/ControlFeature.svelte";

let codePostal = "";
export let selected = null;

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

<Source name="communes-33650" type="geojson" bind:data>
    <FillArea bind:selected/>
    <LineArea/>
</Source>

<ControlSearch bind:codePostal />
<ControlFeature bind:commune={selected} />

