import calculator from './calculator';
import tabs from './tabs'

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('scroll', () => {
        document.documentElement.classList.toggle('is-scrolled', window.scrollY > 30)
    });
    window.dispatchEvent(new Event('scroll'));
    
    // Tab functionality
    tabs.runTabs();

    if (document.documentElement.id === 'page-calculator') {
        calculator.init();
    }

    // "future" text hover effect
    const numbers = "0123456789£$%";
    document.querySelector("h1 em").onmouseover = event => {
        let iterations = 0;

        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return event.target.dataset.value[index];   
                }

                return numbers[Math.floor(Math.random() * numbers.length)];
            }).join("");
            
            if(iterations >= event.target.dataset.value.length) clearInterval(interval);
            iterations += 1 / 4;
        }, 35);
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
});
