let tabs;
let firstTab;
let tabIndicator;

const styleIndicator = (tab) => {
    tabIndicator.style.width = `${tab.offsetWidth}px`;
    tabIndicator.style.left = `${tab.offsetLeft}px`;
}

const updateTabIndicator = (tab) => {
    const tabRect = tab.getBoundingClientRect();
    const tabWidth = tabRect.offsetWidth;
    const tabLeft = tabRect.offsetLeft;
    
    tabIndicator.style.width = `${tabWidth}px`;
    tabIndicator.style.left = `${tabLeft}px`;
}


const runTabs = () => {
    tabs = document.querySelectorAll('.tabs ul li a');
    firstTab = document.querySelector('.tabs ul li a:first-child');
    tabIndicator = document.querySelector('#tab-indicator');
    
    for(const tab of tabs) {
        tab.addEventListener('click', event => {
            event.preventDefault();
    
            // Remove active class from all tabs
            for(const item of tabs) item.classList.remove('active');
    
            // Add active class to clicked tab
            tab.classList.add('active');
    
            styleIndicator(tab);
            updateTabIndicator(tab)
        })
    }

    styleIndicator(firstTab);
}


export default {
	runTabs,
}