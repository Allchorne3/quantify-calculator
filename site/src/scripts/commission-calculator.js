const init = () => {
    const form = document.querySelector('form.commission-calculator-form');
    const commissionBalance = form.querySelector('#commission-balance');
    let commission;

    const commissionLimits = {
		1: {
			percentage: form.querySelector('select option[value="1"]').dataset.percentage
		},
		2: {
			percentage: form.querySelector('select option[value="2"]').dataset.percentage
		},
		3: {
			percentage: form.querySelector('select option[value="3"]').dataset.percentage
		},
		4: {
			percentage: form.querySelector('select option[value="4"]').dataset.percentage
		},
	};

    const calculateCommission = (level, balance) => {
        if(level === 1) {
            commission = balance * commissionLimits[1].percentage;
        } else if (level === 2) {
            commission = balance * commissionLimits[2].percentage;
        } else if (level === 3) {
            commission = balance * commissionLimits[3].percentage;
        } else if (level === 4) {
            commission = balance * commissionLimits[4].percentage;
        }

        return commission.toFixed(2);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const referralEarningInput = form.querySelector('#referral-earning')
        const referralEarning = parseFloat(referralEarningInput.value)
        const level = Number(form.querySelector('#referral-level').value)

        const comm = calculateCommission(level, referralEarning);

        commissionBalance.value = comm;
    });
}

export default {
    init
}
