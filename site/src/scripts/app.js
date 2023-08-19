// import calculator from './calculator';
import tabs from './tabs'

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('scroll', () => {
        document.documentElement.classList.toggle('is-scrolled', window.scrollY > 30)
    });

    window.dispatchEvent(new Event('scroll'));

    if (document.documentElement.id === 'page-calculator') {
        // calculator.init();
    }

    // Tab functionality
    tabs.runTabs();
});
