let currentPage = 1;
const pageSize = 10;

function getCards(searchValue, page = 1) {
    if (!searchValue) {
        searchValue = document.getElementById("searchInput").value;
    }

    const searchValueEncoded = encodeURIComponent("name:" + searchValue);

    fetch(
        `https://api.pokemontcg.io/v2/cards?q=${searchValueEncoded}&page=${page}&pageSize=${pageSize}`,
        {
            method: "GET",
            headers: {
                "X-Api-Key": "8dfce75e-09d7-4350-92f1-99bdabe56493",
            },
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            const cards = data.data;
            const totalPages = Math.ceil(data.totalCount / pageSize);

            // Clear previous results and pagination
            document.getElementById("cardsResults").innerHTML = "";
            document.getElementById("searchResults").innerHTML = `
            <strong>Resultados de pesquisa:</strong> ${data.totalCount} Cartas
        `;

            // Display the cards
            cards.forEach((element) => {
                let attacks = "";
                if (element.attacks) {
                    element.attacks.forEach((attack) => {
                        attacks += `
              <p><b>${attack.name}:</b> ${attack.text || "N/A"}</p>
            `;
                    });
                }

                document.getElementById("cardsResults").innerHTML += `
            <div class="card-container">
                <div class="card-image">
                    <img src="${element.images.small}" alt="Imagem da Carta">
                </div>
                <div class="card-details">
                    <h2>${element.name}</h2>
                    <p><strong>Tipo:</strong> ${element.types ? element.types[0] : "N/A"}</p>
                    ${attacks}
                </div>
                <div class="card-action">
                    <a href="#" class="btn">VER CARTA</a>
                </div>
            </div>
            <hr class="divisor">
        `;
            });

            // Create pagination
            createPagination(totalPages);
        })
        .catch((error) => {
            console.error(error);
        });
}

function createPagination(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    // Previous Button
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.className = "btn previous";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1);
    paginationDiv.appendChild(prevButton);

    const maxVisiblePages = 5;
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    addPageButton(1);

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

    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.className = "btn next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => changePage(currentPage + 1);
    paginationDiv.appendChild(nextButton);

    function addPageButton(pageNumber) {
        const pageButton = document.createElement("button");
        pageButton.innerText = pageNumber;
        pageButton.className = "btn";
        pageButton.className += currentPage === pageNumber ? " active" : "";
        pageButton.onclick = () => changePage(pageNumber);
        paginationDiv.appendChild(pageButton);
    }

    function addDots() {
        const dots = document.createElement("span");
        dots.innerText = "...";
        dots.className = "dots";
        paginationDiv.appendChild(dots);
    }
}

function changePage(page) {
    currentPage = page;
    getCards(document.getElementById("searchInput").value, currentPage);
    document.getElementById("searchResults").scrollIntoView({

        behavior: "smooth"

    });
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParameter = new URLSearchParams(window.location.search);
    if (urlParameter.get("q")) {
        getCards(urlParameter.get("q"), currentPage);
    }

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
