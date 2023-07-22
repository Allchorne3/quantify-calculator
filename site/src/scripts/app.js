import calculator from './calculator';
import tabs from './tabs'


document.addEventListener('DOMContentLoaded', () => {
	calculator.init();
	tabs.runTabs();

	document.querySelector('#days form').addEventListener('submit', () => {
		document.querySelector('.is-left').classList.add('reveal');
	})
});
