// Blog card hover

const init = () => {
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
}

export default {
    init
}