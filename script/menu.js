document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-btn');
    const menuLinks = document.querySelector('.linksHeader');

    menuButton.addEventListener('click', function () {
        menuLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    document.querySelector('.searchFirstBlock').addEventListener('click', function() {
        document.getElementById('searchBlock').scrollIntoView({ behavior: 'smooth' });
    });
});