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
            document.documentElement.classList.toggle('is-scrolled', window.scrollY > 30)
            console.log(window.scrollY);
        });
        window.dispatchEvent(new Event('scroll'));

        docElement.classList.toggle('is-scrolled', window.scrollY > 30)
    
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

        // magic stars
        const stars = document.querySelectorAll(".magic-star");
        if(stars) {
            let index = 0;
            let interval = 1000;

            // Create a random number generator
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

            function animate(element) {
            element.style.setProperty("--star-left", `${rand(-10, 100)}%`);
            element.style.setProperty("--star-top", `${rand(-40, 80)}%`);

            // DOM reflow
            element.style.animation = "none";
            element.offsetHeight;
            element.style.animation = "";
            }

            for(const star of stars) {
            // Use setTimeout to stagger the stars animations  
            setTimeout(() => {
                animate(star);
                // Use setInterval to animate the stars
                setInterval(() => animate(star), 1000)
            }, index++ * (interval / 3))
            
            }
        }

        // Imported functions
        tabs.runTabs();
        animations.init();
    })
});
