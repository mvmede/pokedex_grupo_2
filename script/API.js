// Define a página atual que o valor inicial é 1 e a quantidade de itens (pokemons) por página
let currentPage = 1;
const pageSize = 10;

// Aqui é uma função que busca o card na API de acordo com o que for preenchido no input com a página que o usuário selecionou
function getCards(searchValue, page = 1) {
    if (!searchValue) {
        searchValue = document.getElementById("searchInput").value;
    }
    const searchValueEncoded = encodeURIComponent("name:" + searchValue);

    // Requisição para API
    fetch(
        `https://api.pokemontcg.io/v2/cards?q=${searchValueEncoded}&page=${page}&pageSize=${pageSize}`,
        {
            method: "GET",
            headers: {
                "X-Api-Key": "8dfce75e-09d7-4350-92f1-99bdabe56493",
            },
        }
    )

        // Após a requisição ser executa, verifica se a resposta esta ok. Caso ele esteja ok, ele retornará um json, se não ele dará um erro.
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            const cards = data.data;
            const totalPages = Math.ceil(data.totalCount / pageSize);
            document.getElementById("cardsResults").innerHTML = "";
            document.getElementById("searchResults").innerHTML = `
            <strong>Resultados de pesquisa:</strong> ${data.totalCount} Cartas
        `;

            cards.forEach((element) => {
                let attacks = "";
                if (element.attacks) {

                    // Alguns pokemons possuíam mais de 1 ataque, então criamos esse forEach para retornar todos os ataques.
                    element.attacks.forEach((attack) => {
                        attacks += `<p><b>${attack.name}:</b> ${attack.text || "N/A"}</p>`;
                    });
                }

                // Após receber o retorno da API fazemos a adição do conteúdo dos cards dinamicamente
                document.getElementById("cardsResults").innerHTML += `
                    <div class="card-container">
                        <div class="card-image">
                            <img src="${element.images.small}" alt="Imagem da Carta">
                        </div>
                        <div class="card-details">
                            <h2>${element.name}</h2>
                            <div class="specs" id="specs">
                                <div class="typeClass" id="type"><p><strong>Tipo:</strong> ${element.types ? element.types[0] : "Raro"}</p></div>
                                <div class="hp" id="hp"><p><strong>HP:</strong> ${element.hp}</p></div>
                                <div class="level" id="level"><p><strong>Level:</strong> ${element.level ? element.level[0] : "Desconhecido"} </p></div>
                            </div>
                            ${attacks}
                        </div>
                        <div class="card-action">
                            <a href="#" class="buttonShowCard" data-large-image="${element.images.large}">VER CARTA</a>
                        </div>
                    </div>
                    <hr class="divisor">
                    `;

                document.querySelectorAll('.buttonShowCard').forEach(button => {
                    button.addEventListener('click', function (event) {
                        event.preventDefault();
                        const largeImageUrl = this.getAttribute('data-large-image');

                        // Para exibir a imagem no modal
                        const modal = document.getElementById("modalCard");
                        const modalImg = document.getElementById("imgCardLarge");
                        modal.style.display = "flex";
                        modalImg.src = largeImageUrl;

                        // Botão para fechar o modal ao clicar no "x" ou no botão "Voltar para pesquisa"
                        const closeModal = document.getElementsByClassName("close")[0];
                        const closeButton = document.getElementById("closeModalButton");

                        closeModal.onclick = function () {
                            modal.style.display = "none";
                        }

                        closeButton.onclick = function () {
                            modal.style.display = "none";
                        }

                        // Botão para fechar o modal ao clicar fora da imagem
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    });
                });

            });

            // Cria a paginação da busca realizada
            createPagination(totalPages);
        })
        .catch((error) => {
            console.error(error);
        });
}

function createPagination(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    //botão de voltar
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.className = "btn previous";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1);
    paginationDiv.appendChild(prevButton);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // adiciona o botão da página "1"
    addPageButton(1);

    // adiciona os "pontinhos" da paginação
    if (startPage > 2) {
        addDots();
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
    }

    if (endPage < totalPages - 1) {
        addDots();
    }

    if (totalPages > 1) {
        addPageButton(totalPages);
    }

    //botão de avançar
    const nextButton = document.createElement("button");
    nextButton.innerText = "Avançar";
    nextButton.className = "btn next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => changePage(currentPage + 1);
    paginationDiv.appendChild(nextButton);

    //função que adiciona os botões das páginas
    function addPageButton(pageNumber) {
        const pageButton = document.createElement("button");
        pageButton.innerText = pageNumber;
        pageButton.className = "btn";
        pageButton.className += currentPage === pageNumber ? " active" : "";
        pageButton.onclick = () => changePage(pageNumber);
        paginationDiv.appendChild(pageButton);
    }

    //função que adiciona os três "pontinhos"
    function addDots() {
        const dots = document.createElement("span");
        dots.innerText = "...";
        dots.className = "dots";
        paginationDiv.appendChild(dots);
    }
}

//função que muda a página para a página que o usuário selecionou
function changePage(page) {
    currentPage = page;
    getCards(document.getElementById("searchInput").value, currentPage);

    //faz o scroll para o começo dos resultados, para o usuário não ter que ficar subindo manualmente
    document.getElementById("searchResults").scrollIntoView({
        behavior: "smooth"
    });
}

// adiciona um EventListener para quando a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    // faz a pesquisa automaticamente caso o exista o parametro na url do pokemon a ser pesquisado
    const urlParameter = new URLSearchParams(window.location.search);
    if (urlParameter.get("q")) {
        getCards(urlParameter.get("q"), currentPage);
    }

    // Aqui ele dispara a função de pesquisa pelos cards caso o usuário de "Enter" no formulário ou clique no botão de pesquisa
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        currentPage = 1;
        getCards();
    });

    const botao = document.getElementById("search");
    botao.addEventListener("click", () => {
        currentPage = 1;
        getCards();
    });
});
