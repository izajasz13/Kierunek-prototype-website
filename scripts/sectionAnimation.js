const changeSection = (current, next) => {
    menuItems.forEach(ele => ele.removeEventListener('click', onClickMenuItem));
    window.removeEventListener('wheel', onScrollSections);
    const nav = document.querySelector('.navbar');
    const isDark = current.classList.contains('dark')
    if(isDark){
        nav.classList.remove('dark');
        nav.classList.add('light');
        next.classList.add('light');
        document.querySelector('.logo-img').src = "img/kierunek_dark.png";
    }else{
        nav.classList.remove('light');
        nav.classList.add('dark');
        next.classList.add('dark');
        document.querySelector('.logo-img').src = "img/kierunek_light.png";
    }
    next.classList.add('animate');
    next.classList.remove('hidden');
    next.addEventListener('animationend', (e) => {
        isDark ? current.classList.remove('dark') : current.classList.remove('light');
        current.classList.remove('active')
        current.classList.add('hidden');
        next.classList.add('active');
        next.classList.remove('animate');
        menuItems.forEach(ele => ele.addEventListener('click', onClickMenuItem));
        window.addEventListener('wheel', onScrollSections)
    })
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

window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchend', onTouchEnd);
window.addEventListener('wheel', onScrollSections);
const menuItems = document.querySelectorAll('.item');
menuItems.forEach(ele => ele.addEventListener('click', onClickMenuItem));