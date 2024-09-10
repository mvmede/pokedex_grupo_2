// Função para o usuário ser enviado para a página de pesquisa com o paramêtro que o usuário definiu no input
function goToSearch() {

    const searchValue = document.getElementById("searchInput").value
    const searchValueEncoded = encodeURIComponent(searchValue)
    window.location.href = "/pokedex_grupo_2/html/search.html?q=" + searchValueEncoded

};


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("searchForm")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        goToSearch()
    })
    const botao = document.getElementById("search")
    botao.addEventListener("click", () => {
        goToSearch()
    })
});
