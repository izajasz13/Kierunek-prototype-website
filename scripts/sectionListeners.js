import { changeSection } from './changeSection.js';
import { onListClose } from './changeService.js';
import { isMoreInfoOpen, moreInfoClose } from './sliderClick.js';

const contentBox = document.querySelector(".content-box");
const menu = document.querySelector('.menu-toggler');
const scrollInfo = document.querySelector('.scroll-info');
let startY = 0;
let endY = 0;

const onSwipe = () => {
    if(!menu.classList.contains('open') && !isMoreInfoOpen()){
        const sections = document.querySelectorAll('.section');
        const current = document.querySelector('.active')
        if(!current) return;

        let currentNumber = current.dataset.section;
        const contentBoxRect = contentBox.getBoundingClientRect();

        if(contentBoxRect.right > 991){
            if(startY / endY > 1.1){
                if(currentNumber < 3){
                    changeSection(sections[currentNumber], sections[++currentNumber], true);
                }
            }
            if(startY / endY < 0.90){
                if(currentNumber > 0){
                    changeSection(sections[currentNumber], sections[--currentNumber], true);
                }
            }
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
    console.log(e);
    if(!menu.classList.contains('open') && !isMoreInfoOpen()){
        const sections = document.querySelectorAll('.section');
        const current = document.querySelector('.active')
        if(!current) return;

        if(!scrollInfo.classList.contains('hidden')) 
            scrollInfo.classList.add('hidden');

        let currentNumber = current.dataset.section;
        const contentBoxRect = contentBox.getBoundingClientRect();

        if(contentBoxRect.right > 991){
            if(e.deltaY > 0){
                if(currentNumber < 3){
                    changeSection(sections[currentNumber], sections[++currentNumber], true);
                }
            }
            if(e.deltaY < 0){
                if(currentNumber > 0){
                    changeSection(sections[currentNumber], sections[--currentNumber], true);
                }
            }
        }
    }
}

const onClickMenuItem = (e) => {
    const currentSection = document.querySelector('.active');
    if(!currentSection) return;

    const selectedNumber = e.target.dataset.item;
    const newSection = document.querySelector(`[data-section="${selectedNumber}"]`);
    if(currentSection === newSection) return;

    onNavbarClose();

    changeSection(currentSection, newSection, false);
}

const onLogoClick = (e) => {
    if(!menu.classList.contains('open')){
        const currentSection = document.querySelector('.active');
        if(!currentSection) return;
        const newSection = document.querySelector(`[data-section="0"]`);
        if(currentSection === newSection) return;

        changeSection(currentSection, newSection, true);
        onListClose();
    }
}

const onBurgerClick = (e) => {
    const menu = document.querySelector('.menu');
    const moreInfo = isMoreInfoOpen();
    if(moreInfo){
        moreInfoClose(moreInfo);
    }
    if(document.querySelector('.section.active').classList.contains('onas')){
        onListClose();
    }
    if(menu.classList.contains('open')){
        onNavbarClose();
    }
    else{
        onNavbarOpen();
    }
}

const onNavbarOpen = () => {
    document.querySelector(".menu-toggler").classList.add('open');
    document.querySelector('.menu').classList.add('open');
        const animateItems = (e) => {
            menuItems.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('animate');
                    item.classList.remove('pre-animate');
                }, i * 100)
            })
            menu.removeEventListener('transitionend', animateItems)
        }
        menu.addEventListener('transitionend', animateItems)
}
const onNavbarClose = () => {
    document.querySelector(".menu-toggler").classList.remove('open');
    document.querySelector('.menu').classList.remove('open');
    menuItems.forEach((item) => item.classList.remove('animate'));
    menuItems.forEach((item) => item.classList.add('pre-animate'));
}

const menuItems = document.querySelectorAll('.item');
const burger = document.querySelector('.menu-toggler');
const logo = document.querySelector('div.logo')

export const removeSectionListeners = () => {
    burger.removeEventListener('click', onBurgerClick);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.removeEventListener('click', onClickMenuItem));
    logo.removeEventListener('click', onLogoClick);
}

export const attachSectionListeners = () => {
    burger.addEventListener('click', onBurgerClick);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.addEventListener('click', onClickMenuItem));
    logo.addEventListener('click', onLogoClick);
}