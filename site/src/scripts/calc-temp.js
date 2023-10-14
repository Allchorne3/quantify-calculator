/* FORM AND CALCULATOR ELEMENTS */
let tableButtons;
let daysInput;
let endDatePicker;
let errorMessage; // Declare errorMessage as a global variable

/* DOM ELEMENTS */
const form = document.querySelector('form');
const resetButton = document.querySelector('input[type="reset"]')

const init = () => {
    tableButtons = document.querySelector('.table-buttons');
    daysInput = document.querySelector('#user-iterations');
    endDatePicker = document.querySelector('#end-date');
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (daysInput.value && endDatePicker.value) {
            // Show error
            if (!errorMessage) {
                generateErrorMessage('You cannot specify both an end date and a number of days.');
            }
            return; // Exit the function without proceeding further
        } else {
            alert("Complete");
        }
    })

    resetButton.addEventListener('click', () => {
        if (errorMessage) {
            removeErrorMessage();
        }
    })
}

// Functions
const generateErrorMessage = (message) => {
    errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    document.querySelector('.tabs').appendChild(errorMessage);
    daysInput.classList.add('error');
    endDatePicker.classList.add('error');
}

const removeErrorMessage = () => {
    errorMessage.remove();
    daysInput.classList.remove('error');
    endDatePicker.classList.remove('error');
}

export default {
    init
}
