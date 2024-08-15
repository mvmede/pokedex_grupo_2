const pokedex = [
    {name: "Bulbasaur", category: "Seed", abilities: "Overgrow", type: "Grama / Veneno"},
    {name: "Charmander", category: "Lizard", abilities: "Blaze", type: "Fogo"},
    {name: "Squirtle", category: "Tiny Turtle", abilities: "Torrent", type: "Água"},
    {name: "Vulpix", category: "Fox", abilities: "Flash Fire", type: "Fogo"},
    {name: "", category: "", abilities: "", type: ""},
    {name: "", category: "", abilities: "", type: ""},
    {name: "", category: "", abilities: "", type: ""},
    {name: "", category: "", abilities: "", type: ""},
]

function searchPokemonByName(name){
    const pokemon = pokedex.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    if (pokemon) {
        return pokemon;
    } else {
        return "Pokémon não encontrado."
    }
}

function searchPokemonByType(type){
    const result = pokedex.filter(pokemon => pokemon.type.toLowerCase().includes(type.toLowerCase()));
    if (result.length === 0){
        return "Nenhum pokémon encontrado para o tipo especificado ou tipo inválido."
    } else {
        return result;
    }
}

console.log(searchPokemonByType("Choque"));
console.log(searchPokemonByType("Fogo"));