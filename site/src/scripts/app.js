import calculator from './calculator';
import commissionCalculator from './commission-calculator';
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
            document.documentElement.classList.toggle('is-scrolled', window.scrollY > 30)
            console.log(window.scrollY);
        });
        window.dispatchEvent(new Event('scroll'));

        docElement.classList.toggle('is-scrolled', window.scrollY > 30)
    
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

        // Homepage blob
        const blob = document.getElementById("blob");

        if(blob) {
            document.body.onpointermove = event => { 
            const { clientX, clientY } = event;
            
            // follow mouse instantly
            // blob.style.left = `${clientX}px`
            // blob.style.top = `${clientY}px`
            
            // follow mouse with delay  
            blob.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, { duration: 2500, fill: "forwards" });
            }
        }

        // Get the previous URL
        var previousURL = document.referrer;
        const previousLink = document.querySelector('.previous-link');

        if(previousLink) {
            previousLink.setAttribute('href', previousURL);
        }

        
        // Imported functions
        if (docElement.id === 'page-calculator') {
            calculator.init();
        }
        if (docElement.id === 'page-commission-calculator') {
            commissionCalculator.init();
        }

        tabs.runTabs();
        animations.init();

    })
});
