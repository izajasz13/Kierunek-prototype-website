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

export {changeSection};