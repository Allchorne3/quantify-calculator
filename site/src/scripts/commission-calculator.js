const init = () => {
    const form = document.querySelector('form.commission-calculator-form');
    const commissionBalance = form.querySelector('#commission-balance');

    const calculateCommission = (balance) => {
        const commission = balance * 0.12;
        return commission.toFixed(2);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const referralBalanceInput = form.querySelector('#referral-balance');
        const referralBalance = parseFloat(referralBalanceInput.value);
        const comm = calculateCommission(referralBalance);

        commissionBalance.value = comm;
    });
}

export default {
    init
}
