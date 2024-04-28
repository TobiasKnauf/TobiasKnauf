const lightIconName = 'fa-solid fa-sun';
const darkIconName = 'fa-solid fa-moon';

const root = document.documentElement;
const themeSwitch = document.getElementById("theme-switch");

const scrollers = document.querySelectorAll('.scroller');

window.addEventListener('DOMContentLoaded', initializeTheme);
themeSwitch.onclick = function () { switchTheme() };

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    duplicateGalleryImages();
}

//#region Scrolling Image Gallery
function duplicateGalleryImages() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller-inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);

            scrollerInner.appendChild(duplicatedItem);
        })
    });
}
//#endregion

//#region Light/Dark Theme
function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
}
function switchTheme() {

    // If the site has just been loaded
    if (root.getAttribute('data-theme') === null) {
        initializeTheme();
        return;
    }

    setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
}
function initializeTheme() {
    var preferredTheme = localStorage.getItem('preferredTheme');

    if (preferredTheme === null) {
        const usePreferredSettings = false;
        var prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (usePreferredSettings)
            setTheme(prefersDarkMode ? 'dark' : 'light');
        else
            setTheme('light');

        return;
    }

    setTheme(preferredTheme);
}
//#endregion

$(document).ready(function() {
    $('.project-entry').hover(
        function() { // mouse enter
            $('.project-view').css('opacity', '1');
        }, 
        function() { // mouse leave
            $('.project-view').css('opacity', '0');
        }
    );
});