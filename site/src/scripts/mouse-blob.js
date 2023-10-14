// Homepage blob
const blob = document.getElementById("blob");

const init = () => {
    if(blob) {
        document.body.onpointermove = event => { 
        const { clientX, clientY } = event;
        
        // follow mouse with delay  
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 2500, fill: "forwards" });
        }
    }
}

export default {
    init
}