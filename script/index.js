function goToSearch() {

    const searchValue = document.getElementById("searchInput").value
    const searchValueEncoded = encodeURIComponent(searchValue)
    window.location.href = "/html/search.html?q=" + searchValueEncoded

}


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
})
