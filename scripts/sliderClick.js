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
    left.classList.add('hidden');
    right.classList.add('hidden');
    infoDiv.classList.add('open');
    const button = infoDiv.querySelector('.close-button');
    const closeFunction = () => {
        moreInfoClose(infoTag);
        button.removeEventListener('click', closeFunction);
    }
    button.addEventListener('click', closeFunction);
}

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