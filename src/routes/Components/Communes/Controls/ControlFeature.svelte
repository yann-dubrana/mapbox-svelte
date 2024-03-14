<script>

import Control from "$lib/Control.svelte";
export let commune;

</script>


{#if commune}
    <Control name="area-feature" position="top-right" class="control-size">
        <div class="p-6">
            <h3>{commune.name}</h3>
        </div>
    </Control>
{/if}