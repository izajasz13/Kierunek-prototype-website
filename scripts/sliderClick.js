let moreInfo = '';

const onSliderIconClick = (e) => {
    const infoTag = e.currentTarget.dataset.info;
    moreInfoOpen(infoTag);
}

const moreInfoOpen = (infoTag) => {
    moreInfo = infoTag;
    const infoDiv = document.querySelector(`.${infoTag}`);
    const left = document.querySelector('.main .left');
    const right = document.querySelector('.main .right');
    infoDiv.classList.add('open');
    const button = infoDiv.querySelector('.close-button');
    const closeFunction = () => {
        moreInfoClose(infoTag);
        button.removeEventListener('click', closeFunction);
    }
    button.addEventListener('click', closeFunction);
    const onTransitionEnd = () => {
        left.classList.add('hidden');
        right.classList.add('hidden');
        infoDiv.removeEventListener('transitionend', onTransitionEnd);
    }
    infoDiv.addEventListener('transitionend', onTransitionEnd);
}

const onNartyClick = async (e) => {
    const form = document.querySelector(".narty .form");
    const imieInput = form.querySelector(".imie");
    const nazwiskoInput = form.querySelector(".nazwisko");
    const emailInput = form.querySelector(".email");
    const numerInput = form.querySelector(".numer");

    const name = imieInput.value;
    const surname = nazwiskoInput.value;
    const email = emailInput.value;
    const number = numerInput.value;

    const obj = {
        name,
        surname,
        email,
        number
    }

    try {
        const data = await postData('https://intense-meadow-03245.herokuapp.com/narty', obj);
        form.classList.add("submitForm");
        form.addEventListener('animationend', e => {
            e.currentTarget.classList.remove("submitForm")
            imieInput.value = '';
            nazwiskoInput = '';
            emailInput.value = '';
            numerInput.value = '';
        });
    }
    catch (error) {
        console.error(error);
    }

    send(form);
}

const nartButton = document.querySelector('.narty-button');


export const moreInfoClose = (infoTag) => {
    moreInfo = '';
    const infoDiv = document.querySelector(`.${infoTag}`);
    const left = document.querySelector('.main .left');
    const right = document.querySelector('.main .right');
    left.classList.remove('hidden');
    right.classList.remove('hidden');
    infoDiv.classList.remove('open');
}

export const isMoreInfoOpen = () => {
    return moreInfo;
}

export const attachSliderListeners = () => {
    const infoIcons = document.querySelectorAll('.slide i');
    infoIcons.forEach(ele => ele.addEventListener('click', onSliderIconClick));
}