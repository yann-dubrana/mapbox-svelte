<script>
    import {MapCustomControl} from "$lib";

    export let codePostal = "";

    let value = "";

    $: {
        if (/^[0-9]{5}$/g.test(value)) {
            codePostal = value;
        }
    }

</script>

<MapCustomControl name="search" position="top-right" class="control-size">
    <div class="text-center p-6">
        <label for="codePostal">Code postal</label>
        <input type="text" bind:value placeholder="Code postal"/>
    </div>
</MapCustomControl>