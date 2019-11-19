let currentService = '.opis';
const listItems = document.querySelectorAll('.sluzba');

const onListItemClick = (e) =>{
    const which  = `.${e.target.dataset.item}`;
    document.querySelector(currentService).classList.add('hidden');
    document.querySelector(which).classList.remove('hidden');
    currentService = which;
}

export const attachServiceListeners = () => {
    listItems.forEach(ele => ele.addEventListener('click', onListItemClick));
}