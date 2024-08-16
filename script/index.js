const pokedex = [
    {name: "Bulbasaur", category: "Seed", abilities: "Overgrow", type: "Grama / Veneno"},
    {name: "Charmander", category: "Lizard", abilities: "Blaze", type: "Fogo"},
    {name: "Squirtle", category: "Tiny Turtle", abilities: "Torrent", type: "Água"},
    {name: "Vulpix", category: "Fox", abilities: "Flash Fire", type: "Fogo"},
    {name: "Pidgey", category: "Tiny Bird", abilities: "Keen Eye / Tangled Feet", type: "Normal / Voador"},
    {name: "Ekans", category: "Snake", abilities: "Shed Skin / Intimidate", type: "Veneno"},
    {name: "Pikachu", category: "Mouse", abilities: "Static", type: "Elétrico"},
    {name: "Psyduck", category: "Duck", abilities: "Damp / Cloud Nine", type: "Água"},
]

function searchPokemonByName(name){
    const pokemon = pokedex.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    if (pokemon) {
        return `Detalhes do Pokémon encontrado:\n\nNome: ${pokemon.name}\nCategoria: ${pokemon.category}\nHabilidades: ${pokemon.abilities}\nTipo: ${pokemon.type}`;
    } else {
        return "Pokémon não encontrado. Verifique o nome e tente novamente."
    }
}

function searchPokemonByType(type){
    const result = pokedex.filter(pokemon => pokemon.type.toLowerCase().includes(type.toLowerCase()));
    if (result.length === 0){
        return "Nenhum Pokémon encontrado para o tipo especificado. Verifique o tipo e tente novamente."
    } else {
        return `Resultado da pesquisa para o tipo '${type}':\n\n` + 
            result.map(pokemon =>
                `Nome: ${pokemon.name}\nCategoria: ${pokemon.category}\nHabilidades: ${pokemon.abilities}\nTipo: ${pokemon.type}`
            ).join('\n-------------------------\n');
    }
}

function main() {
    while(true) {
        let search = prompt("Bem-vindo ao Pokédex!\n\nEscolha uma das opções abaixo para pesquisar um Pokémon:\n1. Buscar por nome\n2. Buscar por tipo\n\nDigite 'sair' para encerrar.");

        if (search === '1'){
            let name = prompt("Digite o nome do Pokémon que deseja buscar:");
            alert(searchPokemonByName(name));
        } else if (search === '2'){
            let type = prompt("Digite o tipo do Pókemon (por exemplo: 'Fogo', 'Água', etc.):");
            alert(searchPokemonByType(type));
        } else if (search.toLowerCase() === 'sair'){
            alert("Obrigado por usar a Pokédex! Até a próxima!");
            break;
        } else {
            alert("Opção inválida. Por favor, digite '1' para buscar por nome, '2' para buscar por tipo ou 'sair' para encerrar.")
        }
    }

}

main ();