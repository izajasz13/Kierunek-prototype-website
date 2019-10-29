import {changeSection} from './changeSection.js';

let startY = 0;
let endY = 0;
const onSwipe = () => {
    const sections = document.querySelectorAll('.section');
    const current = document.querySelector('.active')
    if(!current) return;

    let currentNumber = current.dataset.section;

    if(startY / endY > 1.1){
        if(currentNumber < 3){
            changeSection(sections[currentNumber], sections[++currentNumber]);
        }
    }
    if(startY / endY < 0.90){
        if(currentNumber > 0){
            changeSection(sections[currentNumber], sections[--currentNumber]);
        }
    }
}
const onTouchStart = (e) => {
    startY = e.changedTouches[0].screenY
}
const onTouchEnd = (e) => {
    endY = e.changedTouches[0].screenY;
    onSwipe();
}

const onScrollSections = (e) => {
    e.prevetDefalt;

    const sections = document.querySelectorAll('.section');
    const current = document.querySelector('.active')
    if(!current) return;

    let currentNumber = current.dataset.section;

    if(e.deltaY > 0){
        if(currentNumber < 3){
            changeSection(sections[currentNumber], sections[++currentNumber]);
        }
    }
    if(e.deltaY < 0){
        if(currentNumber > 0){
            changeSection(sections[currentNumber], sections[--currentNumber]);
        }
    }
}

const onClickMenuItem = (e) => {
    const currentSection = document.querySelector('.active');
    if(!currentSection) return;

    const selectedNumber = e.target.dataset.item;
    const newSection = document.querySelector(`[data-section="${selectedNumber}"]`);
    if(currentSection === newSection) return;

    changeSection(currentSection, newSection);
}

const menuItems = document.querySelectorAll('.item');
export const attachSectionListeners = () => {
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.addEventListener('click', onClickMenuItem));
}

export const removeSectionListeners = () => {
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.removeEventListener('click', onClickMenuItem));
}