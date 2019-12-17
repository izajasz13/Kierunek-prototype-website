let currentService = '.cytat';
const listItems = document.querySelectorAll('.sluzba');

const onListItemClick = (e) =>{
    const which  = `.${e.target.dataset.item}`;
    document.querySelector('.onas ' + currentService).classList.add('hidden');
    document.querySelector('.onas ' + which).classList.remove('hidden');
    currentService = which;
}

export const attachServiceListeners = () => {
    listItems.forEach(ele => ele.addEventListener('click', onListItemClick));
}

export const resetService = () => {
    document.querySelector(".onas " + currentService).classList.add('hidden');
    document.querySelector('.onas .cytat').classList.remove('hidden');
    currentService = '.cytat';
}