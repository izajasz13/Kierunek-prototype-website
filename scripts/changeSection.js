import {attachSectionListeners, removeSectionListeners} from './sectionListeners.js';

export const changeSection = (current, next) => {
    removeSectionListeners();
    const nav = document.querySelector('.navbar');
    const isDark = current.classList.contains('dark')
    if(isDark){
        nav.classList.remove('dark');
        nav.classList.add('light');
        next.classList.add('light');
        if(next.classList.contains('onas')){
            const paragraphs = next.querySelector('.cytat').querySelectorAll("p");
            paragraphs.forEach(p => p.classList.add("light"));
        }
        document.querySelector('.logo-img').src = "img/kierunek_dark.png";
    }else{
        nav.classList.remove('light');
        nav.classList.add('dark');
        next.classList.add('dark');
        if(next.classList.contains('onas')){
            const paragraphs = next.querySelector('.cytat').querySelectorAll("p");
            paragraphs.forEach(p => p.classList.add("dark"));
        }
        document.querySelector('.logo-img').src = "img/kierunek_light.png";
    }
    next.classList.add('animate');
    next.classList.remove('hidden');
    const sectionAnimationEnd = (e) => {
        if(isDark){ 
            current.classList.remove('dark');
            if(current.classList.contains('onas')){
                const paragraphs = current.querySelector('.cytat').querySelectorAll("p");
                paragraphs.forEach(p => p.classList.remove("dark"));
            }
        }
        else{
            current.classList.remove('light');
            if(current.classList.contains('onas')){
                const paragraphs = current.querySelector('.cytat').querySelectorAll("p");
                paragraphs.forEach(p => p.classList.remove("light"));
            }
        }
        current.classList.remove('active')
        current.classList.add('hidden');
        next.classList.add('active');
        next.classList.remove('animate');
        attachSectionListeners();
        next.removeEventListener('animationend', sectionAnimationEnd)
        animateLeftAndRight(current, next)
    }
    
    next.addEventListener('animationend', sectionAnimationEnd)
}

const animateLeftAndRight = (current, next) => {
    handleCurrentSection(current);
    handleNewSection(next);
}

const handleCurrentSection = (current) => {
    const oldLeft = current.querySelector(".left")
    const oldRight = current.querySelector(".right")
    oldLeft.classList.add("pre-animate");
    oldRight.classList.add("pre-animate");
}

export const handleNewSection = (next) => {
    const left = next.querySelector(".left");
    const right = next.querySelector(".right");
    left.classList.remove("pre-animate");
    right.classList.remove("pre-animate");
    left.classList.add("animate");
    right.classList.add("animate");

    left.addEventListener('animationend', sidePanelAnimationEnd);
    right.addEventListener('animationend', sidePanelAnimationEnd);
}

const sidePanelAnimationEnd = (e) => {
    e.currentTarget.classList.remove("animate");
}