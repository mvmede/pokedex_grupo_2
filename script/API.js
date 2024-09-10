
function getCards(searchValue) {

    if (searchValue === undefined || searchValue === null) {

        searchValue = document.getElementById("searchInput").value

    }

    const searchValueEncoded = encodeURIComponent("name:" + searchValue)

    fetch("https://api.pokemontcg.io/v2/cards?q=" + searchValueEncoded, {
        method: "GET",
        headers: {
            "X-Api-Key": "8dfce75e-09d7-4350-92f1-99bdabe56493"
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    }).then((data) => {
        const cards = data.data
        document.getElementById("searchResults").innerHTML += `
            <strong>Resultados de pesquisa:</strong> ${cards.length} Cartas
        `
        cards.forEach(element => {

            let attacks = ""
            element.attacks.forEach(attack => {
                attacks += `
                    <p><b>${attack.name}:</b> ${attack.text}</p>
                `
            });

            document.getElementById("cardsResults").innerHTML += `
            
            <div class="card-container">
                <div class="card-image">
                    <img src="${element.images.small}" alt="Imagem da Carta">
                </div>
                <div class="card-details">
                    <h2>${element.name}</h2>
                    <p><strong>Tipo:</strong> ${element.types[0]}</p>
                    ${attacks}
                </div>
                <div class="card-action">
                    <a href="#" class="btn">VER CARTA</a>
                </div>
            </div>

            `
        });
    })
}

document.addEventListener("DOMContentLoaded", () => {

    const urlParameter = new URLSearchParams(window.location.search)
    if (urlParameter.get("q") !== undefined && urlParameter.get("q") !== null) {

        getCards(urlParameter.get("q"))

    }

    const form = document.getElementById("searchForm")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        getCards()
    })
    const botao = document.getElementById("search")
    botao.addEventListener("click", () => {
        getCards()
    })
})
