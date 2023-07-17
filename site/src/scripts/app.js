const clearButton = document.querySelector('.clear');
const table = document.querySelector('table');
const overview = document.querySelector('p.overview');
const tabs = document.querySelectorAll('.tabs li a');
const contents = document.querySelectorAll('.content > div');
const daysSubmit = document.querySelector('#days form');
const amountSubmit = document.querySelector('#amount form');
const exportBtn = document.querySelector('#downloadExcel');
const aimInput = document.querySelector('#user-limit');
const forms = document.querySelectorAll('form');
const tbody = document.createElement('tbody');
const resetButton = document.querySelector('#amount form [type="reset"]');

const lvl1Percentage = document.querySelector('select option[value="1"]').dataset.percentage / 100;
const lvl2Percentage = document.querySelector('select option[value="2"]').dataset.percentage / 100;
const lvl3Percentage = document.querySelector('select option[value="3"]').dataset.percentage / 100;

const lvl1Limit = 501;
const lvl2Limit = 2001;
const lvl3Limit = 5001;

let totalEarnings;
let earnings;	 
let counter = 0;

// console.log(lvl1Percentage);
// console.log(lvl2Percentage);
// console.log(lvl3Percentage);

document.addEventListener('DOMContentLoaded', () => {
	
	// Submit the form on the days program
	daysSubmit.addEventListener('submit', (e) => {
		const level = Number(document.querySelector('#days #user-level').value);
		let balance = parseFloat(document.querySelector('#days #user-balance').value);
		const iterations = Number(document.querySelector('#days #user-iterations').value);

		totalEarnings = 0

		e.preventDefault();
		clearTable();
		document.querySelector('#days form').reset();
		table.classList.remove('hidden');
		
		// overview.textContent = `VIP Lvl: ${level} | Starting Amount: $${balance} | Percentage: ${percentage * 100}% | Days: ${iterations}`
		
		for (let i = 0; i < iterations; i++) {
			switch (level) {
				case 1:
					// if balance >= 501
					if(balance >= lvl1Limit) {
						// you get 501 x 2.5%
						earnings = lvl1Limit * lvl1Percentage
						thePercentage = lvl1Percentage
					} else {
						// balance will be below 501, so you get your balance x 2.5%
						earnings = balance * lvl1Percentage
						thePercentage = lvl1Percentage
					}
					break;
				case 2:
					// if balance is >= 2001
					if(balance >= lvl2Limit) {
						// you get $2000 x 2.8
						earnings = lvl2Limit * lvl2Percentage
						thePercentage = lvl2Percentage
					// if balance is >= 501
					} else if(balance >= lvl1Limit) {
						// you get vip2 percentages up to 2k | earnings = balance x 2.8%
						earnings = balance * lvl2Percentage
						thePercentage = lvl2Percentage
					} else { 
						// balance is < 501 so you get vip1 percentages | earnings = balance x 2.5%
						earnings = balance * lvl1Percentage
						thePercentage = lvl1Percentage
					}
					break;
				case 3:
					// if balance >= 5001
					if(balance >= lvl3Limit) {
						// you get $5000 x 3.0
						earnings = lvl3Limit * lvl3Percentage
						thePercentage = lvl3Percentage
					// if balance is >= 2001
					} else if(balance >= lvl2Limit) {
						// you get balance x 2.8
						earnings = balance * lvl3Percentage
						thePercentage = lvl2Percentage
					// if balance is >= 501
					} else if(balance >= lvl1Limit) {
						// you get vip2 percentages up to 2k | earnings = balance x 2.8%
						earnings = balance * lvl2Percentage
						thePercentage = lvl2Percentage
					} else { 
						// balance is < 501 so you get vip1 percentages | earnings = balance x 2.5%
						earnings = balance * lvl1Percentage
						thePercentage = lvl1Percentage
					}
					break;
				default:
					break;
			}
			
			balance += earnings;
			totalEarnings += earnings;

			const newRow = document.createElement("tr");
			
			const cell1 = document.createElement("td");
			cell1.textContent = `Day ${i + 1} - ${currentDate(i)}`;
			newRow.appendChild(cell1);
			
			const cell2 = document.createElement("td");
			cell2.textContent = `$${earnings.toFixed(2)}`;
			cell2.setAttribute('data-label', 'Daily');
			newRow.appendChild(cell2);
			
			const cell3 = document.createElement("td");
			cell3.textContent = `$${totalEarnings.toFixed(2)}`;
			cell3.setAttribute('data-label', 'Acc Earnings');
			newRow.appendChild(cell3);
			
			const cell4 = document.createElement("td");
			cell4.textContent = `${thePercentage * 100}%`;
			cell4.setAttribute('data-label', 'ThePercentage');
			newRow.appendChild(cell4);
			
			const cell5 = document.createElement("td");
			cell5.textContent = `$${balance.toFixed(2)}`;
			cell5.setAttribute('data-label', 'Balance');
			newRow.appendChild(cell5);
			
			tbody.appendChild(newRow);
			
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
				case 3:
					if (balance >= lvl3Limit && counter === 0) {
						newRow.classList.add('row-active');
						counter++;
					}
					break;
				default:
					break;
			}

			table.appendChild(tbody);
			exportBtn.classList.remove('hidden');
		}
		
	})


	// Reset button event listener
	resetButton.addEventListener('click', removeError);

	// Clear the table
	clearButton.addEventListener('click', clearTable);

	// Export to Excel
	exportBtn.addEventListener('click', () => {
		/* Create worksheet from HTML DOM TABLE */
		var wb = XLSX.utils.table_to_book(table);
		/* Export to file (start a download) */
		XLSX.writeFile(wb, "SheetJSTable.xlsx");
	});

	// Function to clear the table
	function clearTable() {
		while (table.rows.length > 1) {
			table.deleteRow(table.rows.length - 1);
		}
	
		overview.textContent = "";
		exportBtn.classList.add('hidden');
		table.classList.add('hidden');
		counter = 0;
	}

	// Remove the error message
	function removeError() {
		const errorMessage = document.querySelector('.tabs .error-message');
		if (errorMessage) {
			errorMessage.remove();
			aimInput.classList.remove('error');
		}
	}

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
