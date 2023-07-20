let clearButton;
let table;
let overview;
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

const removeError = () => {
	const errorMessage = document.querySelector('.tabs .error-message');
	if (errorMessage) {
		errorMessage.remove();
		aimInput.classList.remove('error');
	}
}

const clearTable = () => {
    while (table.rows.length > 1) {
      table.deleteRow(table.rows.length - 1);
    }

    overview.textContent = '';
    exportBtn.classList.add('disabled');
	exportHighlightsBtn.classList.add('disabled');
	clearHighlightButton.classList.add('disabled');
    table.classList.add('hidden');
}

const clearHighlights = () => {
	for(const row of table.rows) {
		if(row.classList.contains('highlighted')) {
			row.classList.remove('highlighted')
		}
	}

	clearHighlightButton.classList.add('disabled');
	exportHighlightsBtn.classList.add('disabled');
}

// Event delegation for "Highlight" buttons
function highlightRow(parentElement, targetSelector) {
	parentElement.addEventListener('click', (event) => {
		const target = event.target;
		
		if (target.tagName === targetSelector) {
			const row = target.closest('tr');
			clearHighlightButton.classList.remove('disabled');
			exportHighlightsBtn.classList.remove('disabled');

			if (row) {
				row.classList.toggle("highlighted");
			}
		}
	});
}

const init = () => {
	clearButton = document.querySelector('.clear');
	table = document.querySelector('table');
	overview = document.querySelector('p.overview');
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

		clearTable();
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

			clearTable();
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
		}
	});

	resetButton.addEventListener('click', removeError);
	clearButton.addEventListener('click', clearTable);
	clearHighlightButton.addEventListener('click', clearHighlights);
	
	exportBtn.addEventListener('click', () => {
		const wb = XLSX.utils.table_to_book(table);
		XLSX.writeFile(wb, 'SheetJSTable.xlsx');
	});

	exportHighlightsBtn.addEventListener('click', () => {
		// Select rows with class "highlighted"
		const highlightedRows = table.querySelectorAll('tr.highlighted');
		
		// Create a new table to contain only the highlighted rows
		const newTable = document.createElement('table');
		highlightedRows.forEach(row => newTable.appendChild(row.cloneNode(true)));
	  
		// Convert the new table to an Excel workbook
		const wb = XLSX.utils.table_to_book(newTable);
	  
		// Save the Excel workbook to a file
		XLSX.writeFile(wb, 'SheetJSTable.xlsx');
	  });
	
	for (const tab of tabs) {
		tab.addEventListener('click', (e) => {
			e.preventDefault();
			
			for (const tab of tabs) {
				tab.classList.remove('active');
			}
			
			tab.classList.add('active');
			const target = tab.dataset.target;
			showTabContent(target);
		});
	}

	highlightRow(table, 'SPAN');
}

export default {
	init
}