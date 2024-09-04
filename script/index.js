<<<<<<< HEAD
/*const pokedex = [
=======
/* const pokedex = [
>>>>>>> 3e1b88b70cfda495e3f02229d580e3c1684f5e8f
    {name: "Bulbasaur", category: "Seed", abilities: "Overgrow", type: "Grama / Veneno"},
    {name: "Charmander", category: "Lizard", abilities: "Blaze", type: "Fogo"},
    {name: "Squirtle", category: "Tiny Turtle", abilities: "Torrent", type: "Água"},
    {name: "Vulpix", category: "Fox", abilities: "Flash Fire", type: "Fogo"},
    {name: "Pidgey", category: "Tiny Bird", abilities: "Keen Eye / Tangled Feet", type: "Normal / Voador"},
    {name: "Ekans", category: "Snake", abilities: "Shed Skin / Intimidate", type: "Veneno"},
    {name: "Pikachu", category: "Mouse", abilities: "Static", type: "Elétrico"},
    {name: "Psyduck", category: "Duck", abilities: "Damp / Cloud Nine", type: "Água"},
]

function searchPokemonByName(name) {
    const pokemon = pokedex.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    return pokemon
        ? `Detalhes do Pokémon encontrado:\n\nNome: ${pokemon.name}\nCategoria: ${pokemon.category}\nHabilidades: ${pokemon.abilities}\nTipo: ${pokemon.type}`
        : "Pokémon não encontrado. Verifique o nome e tente novamente.";
}

function searchPokemonByType(type) {
    const result = pokedex.filter(pokemon => pokemon.type.toLowerCase().includes(type.toLowerCase()));
    return result.length === 0
        ? "Nenhum Pokémon encontrado para o tipo especificado. Verifique o tipo e tente novamente."
        : `Resultado da pesquisa para o tipo '${type}':\n\n` +
        result.map(pokemon =>
            `Nome: ${pokemon.name}\nCategoria: ${pokemon.category}\nHabilidades: ${pokemon.abilities}\nTipo: ${pokemon.type}`
        ).join('\n-------------------------\n');
}

function main() {
    while(true) {
        let search = prompt("Bem-vindo ao Pokédex!\n\nEscolha uma das opções abaixo para pesquisar um Pokémon:\n\n1. Buscar por nome\n2. Buscar por tipo\n3. Encerrar");

        switch (search) {
            case '1':
                let name = prompt("Digite o nome do Pokémon que deseja buscar:");
                alert(searchPokemonByName(name));
                break;
            case '2':
                let type = prompt("Digite o tipo do Pokémon (por exemplo: 'Fogo', 'Água', etc.):");
                alert(searchPokemonByType(type));
                break;
            case '3':
                alert("Obrigado por usar a Pokédex! Até a próxima!");
                return;
            default:
                alert("Opção inválida. Por favor, digite '1' para buscar por nome, '2' para buscar por tipo ou '3' para encerrar.");
                break;
        }
    }
}

main(); */