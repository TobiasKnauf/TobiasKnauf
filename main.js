const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
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

const root = document.documentElement;
const themeSwitch = document.getElementById("theme-switch");
const themeIcon = document.getElementById("theme-icon");

const lightIconName = 'fa-solid fa-sun';
const darkIconName = 'fa-solid fa-moon';

window.addEventListener('DOMContentLoaded', initializeTheme);
themeSwitch.onclick = function () { switchTheme() };

function switchTheme() {
    // If the site has just been loaded
    if (root.getAttribute('data-theme') === null) {
        initializeTheme();
        return;
    }

    setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
}

function initializeTheme() {
    if (localStorage.getItem('preferredTheme') === null) {
        const usePreferredSettings = false;
        var prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (usePreferredSettings) {
            setTheme(prefersDarkMode ? 'dark' : 'light');
        }
        else {
            setTheme('light');
        }
        return;
    }

    setTheme(localStorage.getItem('preferredTheme'));
}

function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
    themeIcon.className = theme === 'light' ? darkIconName : lightIconName;
}