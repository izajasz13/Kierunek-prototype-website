import { attachSectionListeners, removeSectionListeners } from './sectionListeners.js';
import { generateMainSlider, generateGrupySlider } from './slider.js';
import { resetService } from './changeService.js';
import { isMoreInfoOpen, moreInfoClose } from './sliderClick.js';

export const changeSection = (current, next, animation) => {
    removeSectionListeners();
    handleNavbar(current, next);
    const nav = document.querySelector('.header');
    const menu = document.querySelector('.menu');
    const isDark = current.classList.contains('dark')
    if(isDark){
        nav.classList.remove('dark');
        nav.classList.add('light');
        next.classList.add('light');
        if(next.classList.contains('onas') || next.classList.contains('main')){
            const quote = next.querySelector('.cytat');
            quote.classList.add('light');
        }
        document.querySelector('.logo-img').src = "img/kierunek_dark.png";
    }else{
        nav.classList.remove('light');
        nav.classList.add('dark');
        next.classList.add('dark');
        if(next.classList.contains('onas') || next.classList.contains("main")){
            const quote = next.querySelector('.cytat');
            quote.classList.add("dark");
        }
        document.querySelector('.logo-img').src = "img/kierunek_light.png";
    }
    if(animation) next.classList.add('animate');
    next.classList.remove('hidden');
    const sectionAnimationEnd = (e) => {
        handleBorderText(current, isDark);
        current.classList.remove('active')
        current.classList.add('hidden');
        next.classList.add('active');
        next.classList.remove('animate');
        attachSectionListeners();
        next.removeEventListener('animationend', sectionAnimationEnd)
        animateLeftAndRight(current, next)
    }
    const menuAnimationEnd = (e) => {
        animateLeftAndRight(current, next);
        menu.removeEventListener('transitionend', menuAnimationEnd);
    }
    if(animation){
        next.addEventListener('animationend', sectionAnimationEnd)
    }
    else{
        handleBorderText(current, isDark)
        current.classList.remove('active')
        current.classList.add('hidden');
        next.classList.add('active');
        attachSectionListeners();
        menu.addEventListener('transitionend', menuAnimationEnd);
    }
}

const animateLeftAndRight = (current, next) => {
    handleCurrentSection(current);
    handleNewSection(next);
}

const handleNavbar = (current, next) => {
    const currentNum = current.dataset.section;
    const nextNum = next.dataset.section;
    const currentNavbarItem = document.querySelector(`[data-item="${currentNum}"]`);
    const nextNavbarItem = document.querySelector(`[data-item="${nextNum}"]`);
    currentNavbarItem.classList.remove("current");
    nextNavbarItem.classList.add("current");
}

const handleCurrentSection = (current) => {
    if(current.classList.contains("onas")){
        resetService();
    }
    if(current.classList.contains("main") || current.classList.contains("grupy")){
        const slider = current.querySelector(".slider");
        slider.innerHTML = "";
        slider.classList.remove(...slider.classList);
        slider.classList.add("slider");
    }
    if(current.classList.contains("main")){
        const moreInfo = isMoreInfoOpen();
        if(moreInfo){
            moreInfoClose(moreInfo);
        }
    }
    const oldLeft = current.querySelector(".left")
    const oldRight = current.querySelector(".right")
    oldLeft.classList.add("pre-animate");
    oldRight.classList.add("pre-animate");
}

export const handleNewSection = (next) => {
    if(next.classList.contains("main")){
        generateMainSlider();
    }
    if(next.classList.contains("grupy")){
        generateGrupySlider();
    }
    const left = next.querySelector(".left");
    const right = next.querySelector(".right");
    left.classList.remove("pre-animate");
    right.classList.remove("pre-animate");
    left.classList.add("animate");
    right.classList.add("animate");

    left.addEventListener('animationend', sidePanelAnimationEnd);
    right.addEventListener('animationend', sidePanelAnimationEnd);
}

const handleBorderText = (current, isDark) => {
    if(isDark){ 
        current.classList.remove('dark');
        if(current.classList.contains('onas') || current.classList.contains("main")){
            const quote = current.querySelector('.cytat');
            quote.classList.remove("dark");
        }
    }
    else{
        current.classList.remove('light');
        if(current.classList.contains('onas') || current.classList.contains("main")){
            const quote = current.querySelector('.cytat');
            quote.classList.remove("light");
        }
    }
}

const sidePanelAnimationEnd = (e) => {
    e.currentTarget.classList.remove("animate");
}