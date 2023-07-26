let tabs;

const runTabs = () => {
    tabs = document.querySelectorAll('.tabs ul li a');
    
    for(const tab of tabs) {
        tab.addEventListener('click', event => {
            event.preventDefault();
    
            // Remove active class from all tabs
            for(const item of tabs) item.classList.remove('active');
    
            // Add active class to clicked tab
            tab.classList.add('active');
        })
    }
}

export default {
    runTabs,
}
