const moment = require("moment") // For date formatting

document.addEventListener('DOMContentLoaded', () => {
    
    // Get the current yeaer
    document.getElementById('is-year').innerHTML = moment().year();

})
