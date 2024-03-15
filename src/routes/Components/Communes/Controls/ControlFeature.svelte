<script lang="ts">

    import {MapCustomControl} from "$lib";

    export let commune;

</script>


{#if commune}
    <MapCustomControl name="area-feature" position="top-right" class="control-size">
        <div class="p-6">
            <h3>{commune.name}</h3>
        </div>
    </MapCustomControl>
{/if}