import calculator from './calc-temp';
import commissionCalculator from './commission-calculator';
import tabs from './tabs'
import animations from './animations'
import mouseBlob from './mouse-blob'
import cardBlob from './card-blob'
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


        // Get the previous URL
        var previousURL = document.referrer;
        const previousLink = document.querySelector('.previous-link');

        if(previousLink) {
            previousLink.setAttribute('href', previousURL);
        }

        // Imported functions
        if (document.querySelector('.calculator')) {
            calculator.init();
        }
        if (document.querySelector('.comm-calc')) {
            commissionCalculator.init();
        }

        tabs.runTabs();
        animations.init();
        mouseBlob.init();
        cardBlob.init();
    })
});
