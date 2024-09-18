document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const linksHeader = document.querySelector('.linksHeader');

    menuBtn.addEventListener('click', () => {
        linksHeader.classList.toggle('active');
    });
});