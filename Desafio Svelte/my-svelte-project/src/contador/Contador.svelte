<script>
	let contador = 0

    function incrementa(){
        contador++
    }
</script>

<div>
    Valor: {contador}
    <button on:click={incrementa}>Incrementar</button>
    <button on:click={() => contador--}>Decrementar</button>
</div>

<style>
    button {
        color: blue;
    }
</style>