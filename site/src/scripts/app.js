import calculator from './calculator';
import tabs from './tabs'


document.addEventListener('DOMContentLoaded', () => {
    if (document.documentElement.id === 'page-calculator') {
        calculator.init();
        tabs.runTabs();
    }
});
