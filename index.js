const form = document.querySelector('form');
const addBeverageBtn = document.querySelector('.add-button');
const addBeverageBtnWrapper = addBeverageBtn.parentElement;

function setupRemoveButton(beverageElement) {
    const crossBtn = beverageElement.querySelector('.cross');
    crossBtn.addEventListener('click', () => {
        const allBeverages = document.querySelectorAll('.beverage');
        if (allBeverages.length > 1) {
            beverageElement.remove();
        } else {
            alert("Должен остаться хотя бы один напиток!");
        }
    });
}

setupRemoveButton(document.querySelector('.beverage'));

addBeverageBtn.addEventListener('click', () => {
    const currentBeverages = document.querySelectorAll('.beverage');
    const newBeverage = currentBeverages[0].cloneNode(true);
    const newNumber = currentBeverages.length + 1;
    const newBeverageCount = newBeverage.querySelector('.beverage-count');
    newBeverageCount.textContent = `Напиток №${newNumber}`;
    form.insertBefore(newBeverage, addBeverageBtnWrapper);
    setupRemoveButton(newBeverage);
});
