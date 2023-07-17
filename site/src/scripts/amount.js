	// Submit the form on the amount program
	amountSubmit.addEventListener('submit', (e) => {
		const level = Number(document.querySelector('#amount #user-level').value);
		let balance = parseFloat(document.querySelector('#amount #user-balance').value);
		const percentage = parseFloat(document.querySelector('#amount #user-percentage').value / 100);
		const aim = Number(document.querySelector('#amount #user-limit').value);
		totalEarnings = 0

		e.preventDefault();

		const errorMessage = document.querySelector('.tabs .error-message');
		
		if(balance >= aim) {
			if(!errorMessage) {
				const errorMessage = document.createElement("p");
				errorMessage.textContent = `Aim should be higher than balance!`;
				errorMessage.classList.add("error-message");
				document.querySelector('.tabs').appendChild(errorMessage);
				aimInput.classList.add('error');
			}
		} else {
			if(errorMessage) {
				removeError();
			}

			clearTable();
			document.querySelector('#amount form').reset();
			table.classList.remove('hidden');
			
			overview.textContent = `Starting Amount: $${balance} | Percentage: ${percentage * 100}% | Limit: $${aim}`
			
			for (let i = 0; balance <= aim; i++) {
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
				cell3.setAttribute('data-label', 'Acc Earning');
				newRow.appendChild(cell3);
			
				const cell4 = document.createElement("td");
				cell4.textContent = `$${balance.toFixed(2)}`;
				cell4.setAttribute('data-label', 'balance');
				newRow.appendChild(cell4);
				
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
				default:
					break;
				}
				
				if(balance >= aim && counter === 1) {
					newRow.classList.add('row-aim');
					counter++;
				}
			}

			table.appendChild(tbody);
			exportBtn.classList.remove('hidden');
		}
	})