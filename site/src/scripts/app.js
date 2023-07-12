const moment = require("moment")

document.addEventListener('DOMContentLoaded', () => {
    
    const clearButton = document.querySelector('.clear');
    const table = document.querySelector('table');
    const overview = document.querySelector('p');
    const tabs = document.querySelectorAll('.tabs li a');
    const contents = document.querySelectorAll('.content > div');
    const daysSubmit = document.querySelector('#days form');
    const amountSubmit = document.querySelector('#amount form');
    const exportBtn = document.querySelector('#downloadExcel');
    
    // Export to Excel
    exportBtn.addEventListener('click', () => {
        /* Create worksheet from HTML DOM TABLE */
        var wb = XLSX.utils.table_to_book(table);
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    });
    
    // Submit the form on the days program
    daysSubmit.addEventListener('submit', (e) => {
    const daysUserLevel = document.querySelector('#days #user-level').value;
    let daysUserAmount = parseFloat(document.querySelector('#days #user-amount').value);
    const daysUserPercentage = parseFloat(document.querySelector('#days #user-percentage').value);
    const daysUserIterations = Number(document.querySelector('#days #user-iterations').value);
    let counter = 0;
    
    e.preventDefault();
    clearTable();
    document.querySelector('#days form').reset();
    table.classList.remove('hidden');
    
    overview.textContent = `VIP Lvl: ${daysUserLevel} | Starting Amount: $${daysUserAmount} | Percentage: ${daysUserPercentage}% | Days: ${daysUserIterations}`
    
    for (let i = 0; i < daysUserIterations; i++) {
        let earnings = daysUserAmount * (daysUserPercentage / 100);
        daysUserAmount += earnings;
        
        const newRow = document.createElement("tr");
        
        const cell1 = document.createElement("td");
        cell1.textContent = `Day ${i + 1}`;
        newRow.appendChild(cell1);
        
        const cell2 = document.createElement("td");
        cell2.textContent = currentDate(i);
        newRow.appendChild(cell2);
        
        const cell3 = document.createElement("td");
        cell3.textContent =`$${earnings.toFixed(2)}`;
        newRow.appendChild(cell3);
        
        const cell4 = document.createElement("td");
        cell4.textContent = `$${daysUserAmount.toFixed(2)}`;
        newRow.appendChild(cell4);
        
        table.appendChild(newRow);
        
        if(daysUserLevel === 1) {
        if(daysUserAmount >= 500 && counter < 1) {
            counter++;

            if(counter === 1) {
            newRow.style.background = "green";
            }
        }
        } else if (daysUserLevel === 2) {
        if(daysUserAmount >= 2000 && counter < 1) {
            counter++;

            if(counter === 1) {
            newRow.style.background = "green";
            }
        }
        } 
    }
    
    exportBtn.classList.remove('hidden');
    })

    // Submit the form on the amount program
    amountSubmit.addEventListener('submit', (e) => {
    let amountUserAmount = parseFloat(document.querySelector('#amount #user-amount').value);
    const amountUserPercentage = parseFloat(document.querySelector('#amount #user-percentage').value);
    const amountUserLimit = Number(document.querySelector('#amount #user-limit').value);
    let counter = 0;
    
    e.preventDefault();
    clearTable();
    document.querySelector('#amount form').reset();
    table.classList.remove('hidden');
    
    overview.textContent = `Starting Amount: $${amountUserAmount} | Percentage: ${amountUserPercentage}% | Limit: $${amountUserLimit}`
    
    for (let i = 0; amountUserAmount <= amountUserLimit; i++) {
        let earnings = amountUserAmount * (amountUserPercentage / 100);
        amountUserAmount += earnings;
        
        const newRow = document.createElement("tr");
        
        const cell1 = document.createElement("td");
        cell1.textContent = `Day ${i + 1}`;
        newRow.appendChild(cell1);
        
        const cell2 = document.createElement("td");
        cell2.textContent = currentDate(i);
        newRow.appendChild(cell2);
        
        const cell3 = document.createElement("td");
        cell3.textContent = `$${earnings.toFixed(2)}`;
        newRow.appendChild(cell3);
        
        const cell4 = document.createElement("td");
        cell4.textContent = `$${amountUserAmount.toFixed(2)}`;
        newRow.appendChild(cell4);
        
        table.appendChild(newRow);
        
        if(amountUserAmount >= amountUserLimit && counter < 1) {
        counter++;

        if(counter === 1) {
            newRow.style.background = "green";
        }
        }
    }
    
    exportBtn.classList.remove('hidden');
    })

    // Clear the table
    clearButton.addEventListener('click', clearTable);


    // Show active tab
    for(const tab of tabs) {
    tab.addEventListener('click', e => {
        e.preventDefault();
        
        // Remove active class from all tabs
        for (const tab of tabs) {
            tab.classList.remove('active')
        }
        
        // Add active class to the clicked tab
        tab.classList.add('active');
        
        // Assign target to the data-target attribute of each tab
        const target = tab.dataset.target;
        
        // Show tabbed content using the target
        showTabContent(target);
    })
    }

    // Clear the table
    function clearTable() {
        while (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
        }
    
        overview.textContent = "";
        exportBtn.classList.add('hidden');
        table.classList.add('hidden');
    }

    // Show tabbed content
    function showTabContent(el) {
        for(content of contents) {
            if(content.getAttribute('id') === el) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        }
    }

    // Calculate the day in words
    function currentDate(dayNumber) {
        // Get the current date
        let currentDate = new Date();

        // Add 94 days to the current date
        currentDate.setDate(currentDate.getDate() + (dayNumber));

        // Format the date as a string
        let futureDate = currentDate.toDateString();

        return futureDate;
    }
    
    // Get the current yeaer
    document.getElementById('is-year').innerHTML = moment().year();
})
