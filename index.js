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
const submitBtn = document.querySelector('.submit-button');

addBeverageBtn.addEventListener('click', () => {
    const currentBeverages = document.querySelectorAll('.beverage');
    const newBeverage = currentBeverages[0].cloneNode(true);
    const newNumber = currentBeverages.length + 1;
    const newBeverageCount = newBeverage.querySelector('.beverage-count');
    newBeverageCount.textContent = `Напиток №${newNumber}`;

    const radios = newBeverage.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.name = `milk_${newNumber}`;
        if (radio.value === 'usual') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    form.insertBefore(newBeverage, addBeverageBtnWrapper);
});

function getDrinkWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return 'напиток';
    }else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
        return 'напитка';
    }else return 'напитков';
}


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const count = document.querySelectorAll('.beverage').length;
    const drinkWord = getDrinkWord(count);


    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <button type="button" class="modal-close">&times;</button>
        <p>Вы заказали ${count} ${drinkWord}</p>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    const closeBtn = modal.querySelector('.modal-close');
    
    const closeModal = () => overlay.remove();
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    form.insertBefore(newBeverage, addBeverageBtnWrapper);
    setupRemoveButton(newBeverage);
});
