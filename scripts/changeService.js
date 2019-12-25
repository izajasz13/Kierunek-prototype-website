let currentService = '.cytat';
const listItems = document.querySelectorAll('.sluzba');
const listToggler = document.querySelector('.onas .button');
const list = document.querySelector('.onas .list');

const onListItemClick = (e) =>{
    const which  = `.${e.target.dataset.item}`;
    document.querySelector('.onas ' + currentService).classList.add('hidden');
    document.querySelector('.onas ' + which).classList.remove('hidden');
    currentService = which;
    onListClose();
}

const onListTogglerClick = (e) => {
    if(list.classList.contains('open')){
        onListClose();
    }
    else{
        onListOpen();
    }
}

const onListOpen = () => {
    list.classList.add('open');
    const animateServices = (e) => {
        listItems.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('animate');
                item.classList.remove('pre-animate');
            }, i * 100)
        })
        list.removeEventListener('transitionend', animateServices)
    }
    list.addEventListener('transitionend', animateServices)
}

export const onListClose = () => {
    list.classList.remove('open');
    listItems.forEach((item) => item.classList.remove('animate'));
    listItems.forEach((item) => item.classList.add('pre-animate'));
}

export const attachServiceListeners = () => {
    listItems.forEach(ele => ele.addEventListener('click', onListItemClick));
}

export const resetService = () => {
    document.querySelector(".onas " + currentService).classList.add('hidden');
    document.querySelector('.onas .cytat').classList.remove('hidden');
    currentService = '.cytat';
}

listToggler.addEventListener('click', onListTogglerClick);