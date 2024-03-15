<script lang="ts">

    import CustomControl from "$lib/control/CustomControl.svelte";

    export let commune;

</script>


{#if commune}
    <CustomControl name="area-feature" position="top-right" class="control-size">
        <div class="p-6">
            <h3>{commune.name}</h3>
        </div>
    </CustomControl>
{/if}