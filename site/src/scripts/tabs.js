let tabs;
let allTab;
let contents;

const runTabs = () => {
    tabs = document.querySelectorAll('.tabs ul li a');
	allTab = document.querySelector('.tabs ul li a[data-target="all"]')
    contents = document.querySelectorAll('.content > div');

    for(const tab of tabs) {
        tab.addEventListener('click', event => {
            event.preventDefault();
    
            // Remove active class from all tabs
            for(const item of tabs) item.classList.remove('active');
    
            // Add active class to clicked tab
            tab.classList.add('active');

			for (const content of contents) {
				if (content.getAttribute('id') === tab.dataset.target) {
					console.log("Hello")
					content.classList.remove('hidden');
				} else {
					content.classList.add('hidden');
				}
			}
        })

    }

	allTab.addEventListener('click', (e) => {
		e.preventDefault();
		for(const content of contents) content.classList.remove('hidden');
		// alert("allTab")
	})
}

export default {
    runTabs,
}
