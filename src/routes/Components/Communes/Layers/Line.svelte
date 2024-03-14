<script>
    import Layer from "$lib/Layer.svelte";

    let type = "line";
    let paint = {"line-color": "#f00", "line-width": 2};

</script>

<Layer {type} {paint}/>