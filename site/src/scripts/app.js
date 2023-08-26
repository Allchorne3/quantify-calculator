import calculator from './calculator';
import tabs from './tabs'
import animations from './animations'
import InlineSVG from "./utils/js-inlinesvg"

const docElement = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
    InlineSVG.init({
        svgSelector: 'img.svg',
        initClass: 'js-inlinesvg',
    }, () =>{

        document.addEventListener('scroll', () => {
            docElement.classList.toggle('is-scrolled', window.scrollY > 30)
        });

        docElement.classList.toggle('is-scrolled', window.scrollY > 30)
        window.dispatchEvent(new Event('scroll'));
    
        if (docElement.id === 'page-calculator') {
            calculator.init();
        }
    
        // Blog card hover
        const handleMouseMove = e => {
            const { currentTarget: target } = e;
            
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            target.style.setProperty("--mouse-x", `${x}px`);
            target.style.setProperty("--mouse-y", `${y}px`);
        }
          
        // Create a loop to iterate over the cards
        for (const card of document.querySelectorAll(".card")) {
            card.onmousemove = e => handleMouseMove(e);
        }

        // Imported functions
        tabs.runTabs();
        animations.init();
    })
});
