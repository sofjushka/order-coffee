
const form = document.querySelector('form');
const addBeverageBtn = document.querySelector('.add-button');
const addBeverageBtnWrapper = addBeverageBtn.parentElement;

addBeverageBtn.addEventListener('click', () => {
    const currentBeverages = document.querySelectorAll('.beverage');
    const newBeverage = currentBeverages[0].cloneNode(true);
    const newNumber = currentBeverages.length + 1;
    const newBeverageCount = newBeverage.querySelector('.beverage-count');
    newBeverageCount.textContent = `Напиток №${newNumber}`;
    form.insertBefore(newBeverage, addBeverageBtnWrapper)
});