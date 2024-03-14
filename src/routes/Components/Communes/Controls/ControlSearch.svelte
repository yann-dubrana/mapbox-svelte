<script>
    import Control from "$lib/Control.svelte";

    export let codePostal = "";

    let value = "";

    $: {
        if (/^[0-9]{5}$/g.test(value)) {
            codePostal = value;
        }
    }

</script>

<Control name="search" position="top-right" class="control-size">
    <div class="text-center p-6">
        <label for="codePostal">Code postal</label>
        <input type="text" bind:value placeholder="Code postal"/>
    </div>
</Control>