import exportTable from './exportTable';

let clearButton;
let table;
let tabs;
let contents;
let daysSubmit;
let balanceSubmit;
let exportBtn;
let exportHighlightsBtn;
let clearHighlightButton;
let aimInput;
let tbody;
let resetButton;
let highlightedRows;
let tableButtons;
let preText;

const currentDate = (dayNumber, dateInputValue) => {
	const currentDate = dateInputValue ? new Date(dateInputValue) : new Date();
	currentDate.setDate(currentDate.getDate() + dayNumber);
	return currentDate.toDateString();
};

const showTabContent = (el) => {
	for (const content of contents) {
		if (content.getAttribute('id') === el) {
			content.classList.remove('hidden');
		} else {
			content.classList.add('hidden');
		}
	}
}

const clearTable = () => {
    while (table.rows.length > 1) {
      table.deleteRow(table.rows.length - 1);
    }

	clearTableButtons();
    table.classList.add('hidden');
	preText.classList.remove('hidden');
}

const clearTableButtons = () => {
	tableButtons.classList.add('hidden');
}

const showTableButtons = () => {
	tableButtons.classList.remove('hidden');
}

const clearHighlights = () => {
    for (const row of highlightedRows) {
        row.classList.remove('highlighted');
    }

    // Clear the array
    highlightedRows = [];

    // Update buttons state
    updateButtonsState();
};

const updateButtonsState = () => {
    if (!highlightedRows.length) {
        clearHighlightButton.classList.add('disabled');
        exportHighlightsBtn.classList.add('disabled');
    } else {
        clearHighlightButton.classList.remove('disabled');
        exportHighlightsBtn.classList.remove('disabled');
    }
};

const highlightRow = (parentElement, targetSelector) => {
    if (table) {
        parentElement.addEventListener('click', (event) => {
            const target = event.target;

            if (target.tagName === targetSelector) {
                const row = target.closest('tr');

                // If there is a TR
                if (row) {
                    // add the highlighted class, or if it's already got highlighted class then remove it
                    row.classList.toggle('highlighted');
                    if (!highlightedRows.includes(row)) {
                        highlightedRows.push(row);
                    } else {
                        highlightedRows.splice(highlightedRows.indexOf(row), 1);
                    }
                }

                // Update buttons state
                updateButtonsState();
            }
        });
    }
};

const removeError = () => {
	const errorMessage = document.querySelector('.tabs .error-message');

	if (errorMessage) {
		errorMessage.remove();
		aimInput.classList.remove('error');
		aimInput.classList.remove('error');
	}
}

const viewTabs = items => {
	// Show content on tab click
	for (const item of items) {
		item.addEventListener('click', (e) => {
			const target = item.dataset.target;
			showTabContent(target);
		});
	}
}

const init = () => {
	clearButton = document.querySelector('.clear');
	table = document.querySelector('table');
	tabs = document.querySelectorAll('.tabs li a');
	tableButtons = document.querySelector('.buttons');
	contents = document.querySelectorAll('html#page-calculator .content > div');
	daysSubmit = document.querySelector('#days form');
	balanceSubmit = document.querySelector('#balance form');
	exportBtn = document.querySelector('#downloadExcel');
	exportHighlightsBtn = document.querySelector('#downloadExcelRows');
	aimInput = document.querySelector('#user-limit');
	tbody = document.createElement('tbody');
	resetButton = document.querySelector('#balance form [type="reset"]');
	clearHighlightButton = document.querySelector('#remove-highlights');
	highlightedRows = [];
	preText = document.querySelector('.pre-text');

	const levelSelectOptions = {
		1: {
			limit: 500,
			percentage: document.querySelector('select option[value="1"]').dataset.percentage / 100
		},
		2: {
			limit: 2000,
			percentage: document.querySelector('select option[value="2"]').dataset.percentage / 100
		},
		3: {
			limit: 5000,
			percentage: document.querySelector('select option[value="3"]').dataset.percentage / 100
		},
		4: {
			limit: 10000,
			percentage: document.querySelector('select option[value="4"]').dataset.percentage / 100
		},
		5: {
			limit: 30000,
			percentage: document.querySelector('select option[value="5"]').dataset.percentage / 100
		},
		6: {
			limit: Infinity,
			percentage: document.querySelector('select option[value="6"]').dataset.percentage / 100
		},
	};

	// const percentageSelectOptions = {
	// 	level6Percentage: balance > levelSelectOptions[5].limit,
	// 	level5Percentage: balance > levelSelectOptions[4].limit && balance < levelSelectOptions[5].limit,
	// 	level4Percentage: balance > levelSelectOptions[3].limit && balance < levelSelectOptions[4].limit,
	// 	level3Percentage: balance > levelSelectOptions[2].limit && balance < levelSelectOptions[3].limit,
	// 	level2Percentage: balance > levelSelectOptions[1].limit && balance < levelSelectOptions[2].limit
	// }

	const calculateEarnings = (level, balance) => {
		const levelData = levelSelectOptions[level];
		let earnings;
	
		if (balance >= levelData.limit) {
			earnings = levelData.limit * levelData.percentage;
		} else {
			earnings = balance * levelData.percentage;
		}
	
		return earnings;
	};

	const getPercentageForLevel = (balance, level) => {
		let percentage;

		const percentageSelectOptions = {
			level6Percentage: balance > levelSelectOptions[5].limit,
			level5Percentage: balance > levelSelectOptions[4].limit && balance < levelSelectOptions[5].limit,
			level4Percentage: balance > levelSelectOptions[3].limit && balance < levelSelectOptions[4].limit,
			level3Percentage: balance > levelSelectOptions[2].limit && balance < levelSelectOptions[3].limit,
			level2Percentage: balance > levelSelectOptions[1].limit && balance < levelSelectOptions[2].limit
		}
	
		switch (level) {
			case 6:
				switch (true) {
					case percentageSelectOptions.level6Percentage:
						percentage = levelSelectOptions[6].percentage;
						break;
					case percentageSelectOptions.level5Percentage:
						percentage = levelSelectOptions[5].percentage;
						break;
					case percentageSelectOptions.level4Percentage:
						percentage = levelSelectOptions[4].percentage;
						break;
					case percentageSelectOptions.level3Percentage:
						percentage = levelSelectOptions[3].percentage;
						break;
					case percentageSelectOptions.level2Percentage:
						percentage = levelSelectOptions[2].percentage;
						break;
					default:
						percentage = levelSelectOptions[1].percentage;
				}
				break;
	
			case 5:
				switch (true) {
					case balance > levelSelectOptions[4].limit:
						percentage = levelSelectOptions[5].percentage;
						break;
					case balance > levelSelectOptions[3].limit && balance < levelSelectOptions[4].limit:
						percentage = levelSelectOptions[4].percentage;
						break;
					case balance > levelSelectOptions[2].limit && balance < levelSelectOptions[3].limit:
						percentage = levelSelectOptions[3].percentage;
						break;
					case balance > levelSelectOptions[1].limit && balance < levelSelectOptions[2].limit:
						percentage = levelSelectOptions[2].percentage;
						break;
					default:
						percentage = levelSelectOptions[1].percentage;
				}
				break;
	
			case 4:
				switch (true) {
					case balance > levelSelectOptions[3].limit:
						percentage = levelSelectOptions[4].percentage;
						break;
					case balance > levelSelectOptions[2].limit && balance < levelSelectOptions[3].limit:
						percentage = levelSelectOptions[3].percentage;
						break;
					case balance > levelSelectOptions[1].limit && balance < levelSelectOptions[2].limit:
						percentage = levelSelectOptions[2].percentage;
						break;
					default:
						percentage = levelSelectOptions[1].percentage;
				}
				break;
	
			case 3:
				switch (true) {
					case balance > levelSelectOptions[2].limit:
						percentage = levelSelectOptions[3].percentage;
						break;
					case balance > levelSelectOptions[1].limit && balance < levelSelectOptions[2].limit:
						percentage = levelSelectOptions[2].percentage;
						break;
					default:
						percentage = levelSelectOptions[1].percentage;
				}
				break;
	
			case 2:
				switch (true) {
					case balance > levelSelectOptions[1].limit:
						percentage = levelSelectOptions[2].percentage;
						break;
					default:
						percentage = levelSelectOptions[1].percentage;
				}
				break;
	
			default:
				percentage = levelSelectOptions[1].percentage;
				break;
		}
	
		return (percentage * 100).toFixed(1) + '%';
	};

	// Swtich Tabs
	viewTabs(tabs)

	daysSubmit.addEventListener('submit', (e) => {
		e.preventDefault();

		const levelInput = document.querySelector('#days #user-level');
		const balanceInput = document.querySelector('#days #user-balance');
		const iterationsInput = document.querySelector('#days #user-iterations');
		const dayDateInput = document.querySelector('#day-date');
		const level = Number(levelInput.value);
		let balance = parseFloat(balanceInput.value);
		const iterations = Number(iterationsInput.value);
		const dayDate = dayDateInput.value;

		if (iterations <= 0) {
			if (!document.querySelector('.tabs .error-message')) {
				const errorMessage = document.createElement('p');
				errorMessage.textContent = 'Need a minimum of 1 day';
				errorMessage.classList.add('error-message');
				document.querySelector('.tabs').appendChild(errorMessage);
				iterationsInput.classList.add('error');
			}
		} else {
			if (document.querySelector('.tabs .error-message')) {
				document.querySelector('.tabs .error-message').remove();
				iterationsInput.classList.remove('error');
			}		

			daysSubmit.reset();
			clearTable();
			table.classList.remove('hidden');

			let totalEarnings = 0;
			let earnings;
			let counter = 0;

			for (let i = 0; i < iterations; i++) {
				earnings = calculateEarnings(level, balance);
				balance += earnings;
				totalEarnings += earnings;

				const newRow = document.createElement('tr');
				newRow.innerHTML = `
					<td>Day ${i + 1} - ${currentDate(i, dayDate)}</td>
					<td data-label="Daily">$${earnings.toFixed(2)}</td>
					<td data-label="Acc Earnings">$${totalEarnings.toFixed(2)}</td>
                    <td data-label="Percentage">${getPercentageForLevel(balance, level)}</td>
					<td data-label="Balance">$${balance.toFixed(2)}<div><span><i class="fa-sharp fa-solid fa-xmark"></i></span></div></td>
				`;

				tbody.appendChild(newRow);

				if (level === 1 && balance >= levelSelectOptions[1].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				} else if (level === 2 && balance >= levelSelectOptions[2].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				} else if (level === 3 && balance >= levelSelectOptions[3].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				}
			}

			table.appendChild(tbody);
			exportBtn.classList.remove('disabled');
			showTableButtons();
			preText.classList.add('hidden');
		}
	});
	
	balanceSubmit.addEventListener('submit', (e) => {
		e.preventDefault();

		const levelInput = document.querySelector('#balance #user-level');
		const balanceInput = document.querySelector('#balance #user-balance');
		const aimInput = document.querySelector('#balance #user-limit');
		const balanceDateInput = document.querySelector('#balance-date');

		const level = Number(levelInput.value);
		let balance = parseFloat(balanceInput.value);
		const aim = Number(aimInput.value);
		const balanceDate = balanceDateInput.value;

		if (balance >= aim) {
			if (!document.querySelector('.tabs .error-message')) {
				const errorMessage = document.createElement('p');
				errorMessage.textContent = 'Aim should be higher than balance!';
				errorMessage.classList.add('error-message');
				document.querySelector('.tabs').appendChild(errorMessage);
				aimInput.classList.add('error');
			}
		} else {
			if (document.querySelector('.tabs .error-message')) {
				document.querySelector('.tabs .error-message').remove();
				aimInput.classList.remove('error');
			}

			balanceSubmit.reset();
			clearTable();
			table.classList.remove('hidden');
			
			let totalEarnings = 0;
			let earnings;
			let counter = 0;
			
			for (let i = 0; balance <= aim; i++) {
				earnings = calculateEarnings(level, balance);
				balance += earnings;
				totalEarnings += earnings;
				
				const newRow = document.createElement('tr');
				newRow.innerHTML = `
					<td>Day ${i + 1} - ${currentDate(i, balanceDate)}</td>
					<td data-label="Daily">$${earnings.toFixed(2)}</td>
					<td data-label="Acc Earning">$${totalEarnings.toFixed(2)}</td>
					<td data-label="Percentage">${getPercentageForLevel(balance, level)}</td>
					<td data-label="Balance">$${balance.toFixed(2)}<div><span><i class="fa-sharp fa-solid fa-xmark"></i></span></div></td>
				`;

				tbody.appendChild(newRow);

				if (level === 1 && balance >= levelSelectOptions[1].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				} else if (level === 2 && balance >= levelSelectOptions[2].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				} else if (level === 3 && balance >= levelSelectOptions[3].limit && counter === 0) {
					newRow.classList.add('row-active');
					counter++;
				}

				if (balance >= aim) {
					newRow.classList.add('row-aim');
				}
			}

			table.appendChild(tbody);
			exportBtn.classList.remove('disabled');
			showTableButtons();
			preText.classList.add('hidden');
		}
	});

	// Event listeners
	resetButton.addEventListener('click', removeError);
	clearButton.addEventListener('click', clearTable);
	clearHighlightButton.addEventListener('click', clearHighlights);

	// Run functions
	exportTable.exportTables(table);
	highlightRow(table, 'SPAN');
}

export default {
	init
}