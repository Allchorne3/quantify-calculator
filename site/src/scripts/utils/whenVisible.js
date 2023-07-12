// Apply when the 'element' is visible
export default function whenVisible() {
    const whenVisible = document.querySelectorAll('[data-when-visible');

    if(whenVisible) {
        window.addEventListener('scroll', () => {
            Array.prototype.forEach.call(whenVisible, element => {
                if(element.getBoundingClientRect().top > 600) {
                    element.classList.add(element.dataset.whenVisible)
                }
            });
        });
        window.dispatchEvent(new Event('scroll'));
    }
}