const changeSection = (current, next) => {
    menuItems.forEach(ele => ele.removeEventListener('click', clickMenuItem));
    window.removeEventListener('wheel', scrollSections);
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
        menuItems.forEach(ele => ele.addEventListener('click', clickMenuItem));
        window.addEventListener('wheel', scrollSections)
    })
}

const scrollSections = (e) => {
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

const clickMenuItem = (e) => {
    const currentSection = document.querySelector('.active');
    if(!currentSection) return;

    const selectedNumber = e.target.dataset.item;
    const newSection = document.querySelector(`[data-section="${selectedNumber}"]`);
    if(currentSection === newSection) return;

    changeSection(currentSection, newSection);
}

window.addEventListener('wheel', scrollSections);
const menuItems = document.querySelectorAll('.item');
menuItems.forEach(ele => ele.addEventListener('click', clickMenuItem));