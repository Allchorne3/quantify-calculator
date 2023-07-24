import exportTable from './exportTable';

let clearButton;
let table;
// let overview;
let tabs;
let contents;
let daysSubmit;
let amountSubmit;
let exportBtn;
let exportHighlightsBtn;
let clearHighlightButton;
let aimInput;
let tbody;
let resetButton;
let formContainer;
let highlightedRows;

const levelSelectOptions = {
	1: {
		limit: 501,
		percentage: document.querySelector('select option[value="1"]').dataset.percentage / 100
	},
	2: {
		limit: 2001,
		percentage: document.querySelector('select option[value="2"]').dataset.percentage / 100
	},
	3: {
		limit: 5001,
		percentage: document.querySelector('select option[value="3"]').dataset.percentage / 100
	}
};

const currentDate = (dayNumber, dateInputValue) => {
	const currentDate = dateInputValue ? new Date(dateInputValue) : new Date();
	currentDate.setDate(currentDate.getDate() + dayNumber);
	return currentDate.toDateString();
};
  
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

    // overview.textContent = '';
    exportBtn.classList.add('hidden');
	exportHighlightsBtn.classList.add('hidden');
	clearHighlightButton.classList.add('hidden');
	clearButton.classList.add('hidden');
    table.classList.add('hidden');
	formContainer.classList.remove('reveal');
}

const showTableButtons = () => {
	exportBtn.classList.remove('hidden');
	exportHighlightsBtn.classList.remove('hidden');
	clearHighlightButton.classList.remove('hidden');
	clearButton.classList.remove('hidden');
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
	// overview = document.querySelector('p.overview');
	tabs = document.querySelectorAll('.tabs li a');
	contents = document.querySelectorAll('.content > div');
	daysSubmit = document.querySelector('#days form');
	amountSubmit = document.querySelector('#amount form');
	exportBtn = document.querySelector('#downloadExcel');
	exportHighlightsBtn = document.querySelector('#downloadExcelRows');
	aimInput = document.querySelector('#user-limit');
	tbody = document.createElement('tbody');
	resetButton = document.querySelector('#amount form [type="reset"]');
	clearHighlightButton = document.querySelector('#remove-highlights');
	formContainer = document.querySelector('.is-left');
	highlightedRows = [];

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
					<td data-label="Balance">$${balance.toFixed(2)}<div><span>+</span></div></td>
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
			formContainer.classList.add('reveal');
		}
	});
	
	amountSubmit.addEventListener('submit', (e) => {
		e.preventDefault();

		const levelInput = document.querySelector('#amount #user-level');
		const balanceInput = document.querySelector('#amount #user-balance');
		const aimInput = document.querySelector('#amount #user-limit');
		const amountDateInput = document.querySelector('#amount-date');

		const level = Number(levelInput.value);
		let balance = parseFloat(balanceInput.value);
		const aim = Number(aimInput.value);
		const amountDate = amountDateInput.value;

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

			amountSubmit.reset();
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
					<td>Day ${i + 1} - ${currentDate(i, amountDate)}</td>
					<td data-label="Daily">$${earnings.toFixed(2)}</td>
					<td data-label="Acc Earning">$${totalEarnings.toFixed(2)}</td>
					<td data-label="Balance">$${balance.toFixed(2)}<div><span>+</span></div></td>
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

				if (balance >= aim && counter === 1) {
					newRow.classList.add('row-aim');
					counter++;
				}
			}

			table.appendChild(tbody);
			exportBtn.classList.remove('disabled');
			showTableButtons();
			formContainer.classList.add('reveal');
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