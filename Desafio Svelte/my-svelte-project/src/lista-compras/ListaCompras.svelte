<script>
    import ListaItem from './ListaItem.svelte'

    // Sempre que a aplicação for inicializada, a lista de itens vai vir do localStorage
    // com o operador ?? definimos o que vai retornar dessa expressão caso a primeira opção seja nula
    let itens =  JSON.parse(localStorage.getItem("lista-compras")) ?? []

    // Forma de declarar variável reativa no Svelte
    // Sempre que alguns dos valores que essa variável usa (itens, comprado) for modificado, ela é recomputada
    $: itensPendentes = itens.filter(item => !item.comprado).length

    // Forma de criar um bloco de código que vai ser executado de novo sempre que algum valor mudar na variável que é usada dentro dele
    // Dessa forma, sempre que a variável itens for modificada, vai salvá-la no localStorage
    $: {
        localStorage.setItem("lista-compras", JSON.stringify(itens))
    }

    let inputEl = null

    function adicionarItem(event) {
        itens = [...itens, {
            comprado: false,
            descricao: inputEl.value
        }]
        inputEl.value = ""
    }

    function removerItem(item) {
        itens = itens.filter(i => i !== item)
    }
</script>

<h2>Lista de compras</h2>
<form on:submit|preventDefault={adicionarItem}>
    <input bind:this={inputEl} type="text">
    <button type='submit'>Adicionar item</button>
</form>

{#if itens.length === 0}
<div>A lista está vazia</div>
{:else}
    {#each itens as item, i}
    <ListaItem 
    bind:comprado={item.comprado} 
    descricao={item.descricao}
    on:itemremovido={() => removerItem(item)}
    />
    {/each}
{/if}

<div>Itens pendentes: {itensPendentes} </div>

