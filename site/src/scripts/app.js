const clearButton = document.querySelector('.clear');
const table = document.querySelector('table');
const overview = document.querySelector('p');
const tabs = document.querySelectorAll('.tabs li a');
const contents = document.querySelectorAll('.content > div');
const daysSubmit = document.querySelector('#days form');
const amountSubmit = document.querySelector('#amount form');
const exportBtn = document.querySelector('#downloadExcel');
const forms = document.querySelectorAll('form');
const lvl1Limit = 500;
const lvl2Limit = 2000;
let counter = 0;
let earnings;		 

document.addEventListener('DOMContentLoaded', () => {

	// Submit the form on the days program
	daysSubmit.addEventListener('submit', (e) => {
		const level = Number(document.querySelector('#days #user-level').value);
		let balance = parseFloat(document.querySelector('#days #user-balance').value);
		const percentage = parseFloat(document.querySelector('#days #user-percentage').value / 100);
		const iterations = Number(document.querySelector('#days #user-iterations').value);
		
		e.preventDefault();
		clearTable();
		document.querySelector('#days form').reset();
		table.classList.remove('hidden');
		
		overview.textContent = `VIP Lvl: ${level} | Starting Amount: $${balance} | Percentage: ${percentage}% | Days: ${iterations}`
		
		for (let i = 0; i < iterations; i++) {
			switch (level) {
				case 1:
					earnings = balance >= lvl1Limit ? lvl1Limit * percentage : balance * percentage;
					break;
				case 2:
					earnings = balance >= lvl2Limit ? lvl2Limit * percentage : balance * percentage;
					break;
				default:
					break;
			}
			
			balance += earnings;
			const newRow = document.createElement("tr");
			
			// Day
			const cell1 = document.createElement("td");
			cell1.textContent = `Day ${i + 1}: ${currentDate(i)}`;
			newRow.appendChild(cell1);
			
			// Earnings
			const cell2 = document.createElement("td");
			cell2.textContent = `$${earnings.toFixed(2)}`;
			newRow.appendChild(cell2);
			
			// Total money
			const cell3 = document.createElement("td");
			cell3.textContent = `$${balance.toFixed(2)}`;
			newRow.appendChild(cell3);
			
			table.appendChild(newRow);
			
			switch (level) {
				case 1:
				  if (balance >= lvl1Limit && counter === 0) {
						newRow.classList.add('row-active');
						counter++;
					}
				break;
				case 2:
					if (balance >= lvl2Limit && counter === 0) {
						newRow.classList.add('row-active');
						counter++;
					}
				  break;
				default:
				  break;
			  }
		}
		
		exportBtn.classList.remove('hidden');
	})

	// Submit the form on the amount program
	amountSubmit.addEventListener('submit', (e) => {
		const level = Number(document.querySelector('#amount #user-level').value);
		let balance = parseFloat(document.querySelector('#amount #user-balance').value);
		const percentage = parseFloat(document.querySelector('#amount #user-percentage').value / 100);
		const aim = Number(document.querySelector('#amount #user-limit').value);
        e.preventDefault();

        const errorMessage = document.querySelector('.tabs .error-message');
        if(balance > aim) {
            if(!errorMessage) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = `Aim should be higher than balance!`;
                errorMessage.classList.add("error-message");
                document.querySelector('.tabs').appendChild(errorMessage);
                document.querySelector('#user-limit').classList.add('error');
                
            }
        } else {
            if(errorMessage) {
                errorMessage.remove();
                document.querySelector('#user-limit').classList.remove('error');
            }

            clearTable();
            document.querySelector('#amount form').reset();
            table.classList.remove('hidden');
            
            overview.textContent = `Starting Amount: $${balance} | Percentage: ${percentage}% | Limit: $${aim}`
            
            for (let i = 0; balance <= aim; i++) {
                switch (level) {
                    case 1:
                        earnings = balance >= 500 ? 500 * percentage : balance * percentage;
                        break;
                    case 2:
                        earnings = balance >= 2000 ? 2000 * percentage : balance * percentage;
                        break;
                    default:
                        break;
                }
    
              balance += earnings;
              
              const newRow = document.createElement("tr");
              
              const cell1 = document.createElement("td");
              cell1.textContent = `Day ${i + 1}: ${currentDate(i)}`;
              newRow.appendChild(cell1);
              
              const cell2 = document.createElement("td");
              cell2.textContent = `$${earnings.toFixed(2)}`;
              newRow.appendChild(cell2);
              
              const cell3 = document.createElement("td");
              cell3.textContent = `$${balance.toFixed(2)}`;
              newRow.appendChild(cell3);
              
              table.appendChild(newRow);
    
              switch (level) {
                case 1:
                  if (balance >= lvl1Limit && counter === 0) {
                    newRow.classList.add('row-active');
                    counter++;
                    }
                break;
                case 2:
                    if (balance >= lvl2Limit && counter === 0) {
                        newRow.classList.add('row-active');
                        counter++;
                    }
                  break;
                default:
                  break;
              }
              
              if(balance >= aim) {
                newRow.style.background = "green";
                counter++;
              }
            }
            
            exportBtn.classList.remove('hidden');
        }
	})

	// Clear the table
	clearButton.addEventListener('click', clearTable);

	// Export to Excel
	exportBtn.addEventListener('click', () => {
		/* Create worksheet from HTML DOM TABLE */
		var wb = XLSX.utils.table_to_book(table);
		/* Export to file (start a download) */
		XLSX.writeFile(wb, "SheetJSTable.xlsx");
	});

	// Show active tab
	for(const tab of tabs) {
		tab.addEventListener('click', e => {
			e.preventDefault();
			
			for (const tab of tabs) {
				tab.classList.remove('active')
			}
			
			tab.classList.add('active');
			const target = tab.dataset.target;
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
		counter = 0;
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
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + (dayNumber));
		let futureDate = currentDate.toDateString();
		return futureDate;
	}
})
