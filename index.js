const form = document.querySelector('form');
const addBeverageBtn = document.querySelector('.add-button');
const addBeverageBtnWrapper = addBeverageBtn.parentElement;
const submitBtn = document.querySelector('.submit-button');

function highlightKeywords(text) {
    if (!text) return '';
    
    let safeText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const keywords = ['очень нужно', 'побыстрее', 'поскорее', 'быстрее', 'скорее', 'срочно'];
    const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    return safeText.replace(regex, '<b>$1</b>');
}

function setupTextareaListeners(beverageElement) {
    const textarea = beverageElement.querySelector('.custom-note');
    const preview = beverageElement.querySelector('.note-preview');
    
    preview.innerHTML = highlightKeywords(textarea.value);

    textarea.addEventListener('input', (e) => {
        preview.innerHTML = highlightKeywords(e.target.value);
    });
}

setupTextareaListeners(document.querySelector('.beverage'));

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

    const radios = newBeverage.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.name = `milk_${newNumber}`;
        radio.checked = radio.value === 'usual';
    });
    
    const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    const newTextarea = newBeverage.querySelector('.custom-note');
    const newPreview = newBeverage.querySelector('.note-preview');
    newTextarea.value = '';
    newPreview.innerHTML = '';

    setupTextareaListeners(newBeverage);
    setupRemoveButton(newBeverage);

    form.insertBefore(newBeverage, addBeverageBtnWrapper);
});

function getDrinkWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return 'напиток';
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return 'напитка';
    return 'напитков';
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
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
                <th style="padding: 5px;">Напиток</th>
                <th style="padding: 5px;">Молоко</th>
                <th style="padding: 5px;">Дополнительно</th>
                <th style="padding: 5px;">Комментарий</th>
            </tr>
        </table>
    `;

    const allBeverages = document.querySelectorAll('.beverage');
    const table = modal.querySelector('table');

    for (const drink of allBeverages) {
        const drinkName = drink.querySelector('select option:checked').textContent;
        const milkType = drink.querySelector('input[type="radio"]:checked + span').textContent;
        
        const options = Array.from(drink.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.nextElementSibling.textContent)
            .join(', ');
        
        const commentText = drink.querySelector('.custom-note').value;

        table.innerHTML += `
            <tr>
                <td style="padding: 5px;">${drinkName}</td>
                <td style="padding: 5px;">${milkType}</td>
                <td style="padding: 5px;">${options || '-'}</td>
                <td style="padding: 5px;">${commentText || '-'}</td>
            </tr>
        `;
    }
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    const closeModal = () => overlay.remove();
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) closeModal();
    });
});