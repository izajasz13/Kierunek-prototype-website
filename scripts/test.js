const changeSection = (current, next, animation) => {
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
        next.removeEventListener('animationend', sectionAnimationEnd)
        animateLeftAndRight(current, next);
    }
    const menuAnimationEnd = (e) => {
        menu.removeEventListener('transitionend', menuAnimationEnd);
        animateLeftAndRight(current, next);
    }
    if(animation){
        next.addEventListener('animationend', sectionAnimationEnd)
    }
    else{
        handleBorderText(current, isDark)
        current.classList.remove('active')
        current.classList.add('hidden');
        next.classList.add('active');
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

const handleNewSection = (next) => {
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
    attachSectionListeners();
}

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

const onListClose = () => {
    list.classList.remove('open');
    listItems.forEach((item) => item.classList.remove('animate'));
    listItems.forEach((item) => item.classList.add('pre-animate'));
}

const attachServiceListeners = () => {
    listItems.forEach(ele => ele.addEventListener('click', onListItemClick));
}

const resetService = () => {
    document.querySelector(".onas " + currentService).classList.add('hidden');
    document.querySelector('.onas .cytat').classList.remove('hidden');
    currentService = '.cytat';
}

listToggler.addEventListener('click', onListTogglerClick);

const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target.parentNode;
    const imieInput = document.querySelector(".imie");
    const emailInput = document.querySelector(".email");
    const wiadomoscInput = document.querySelector(".wiadomość");
    const name = imieInput.value;
    const email = emailInput.value;
    const message = wiadomoscInput.value;

    const obj = {
        name,
        email,
        message
    };

    try {
        const data = await postData('https://intense-meadow-03245.herokuapp.com/contact', obj);
        form.classList.add("submitForm");
        form.addEventListener('animationend', e => {
            e.currentTarget.classList.remove("submitForm")
            imieInput.value = '';
            emailInput.value = '';
            wiadomoscInput.value = '';
        });
    }
    catch (error) {
        console.error(error);
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response;
}

const attachContactListeners = () => {
    const button = document.querySelector(".kontakt .button");
    button.addEventListener('click', onSubmit)
}

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

const removeSectionListeners = () => {
    burger.removeEventListener('click', onBurgerClick);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.removeEventListener('click', onClickMenuItem));
    logo.removeEventListener('click', onLogoClick);
}

const attachSectionListeners = () => {
    burger.addEventListener('click', onBurgerClick);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('wheel', onScrollSections);
    menuItems.forEach(ele => ele.addEventListener('click', onClickMenuItem));
    logo.addEventListener('click', onLogoClick);
}

class Slider{
    constructor(slider, time, imgList, imgInfo, id){
        this.slider = slider;
        this.time = time;
        this.len = imgList.length;
        this.id = `.${id}`;
        this.current = 0;
        slider.classList.add('slider');
        slider.classList.add(id);
        this.createSlides(imgList, imgInfo);
        this.dots = this.slider.querySelectorAll('.dot');
        this.dots.forEach(dot => dot.addEventListener('click', this.handleDotClick))
        this.timeoutId = setTimeout(() => this.move(), this.time);
    }

    createSlides(imgList, imgInfo){
        const dotBox = document.createElement('div');
        dotBox.classList.add('dot-container');
        imgList.forEach((ele, i) => {
            const container = document.createElement('div');
            container.innerHTML = `<img src="${ele}" alt="">`;
            container.classList.add('slide');
            this.slider.appendChild(container);
            if(imgInfo[i]){
                const infoIcon = document.createElement('i');
                infoIcon.classList.add('fa-info-circle');
                infoIcon.classList.add('fas');
                infoIcon.dataset.info = imgInfo[i];
                container.appendChild(infoIcon);
            }
            const dot = document.createElement('div')
            dot.classList.add('dot');
            dot.dataset.number = i;
            if(i === 0){
                dot.classList.add('current');
            }
            dotBox.appendChild(dot)
        });
        const container = document.createElement('div');
        container.innerHTML = `<img src="${imgList[0]}" alt="">`;
        container.classList.add('slide');
        this.slider.appendChild(container);
        if(imgInfo[0]){
            const infoIcon = document.createElement('i');
            infoIcon.classList.add('fa-info-circle');
            infoIcon.classList.add('fas');
            infoIcon.dataset.info = imgInfo[0];
            container.appendChild(infoIcon);
        }
        this.slider.appendChild(dotBox);
        this.list = document.querySelectorAll(`${this.id} .slide`);
    }

    move(){
        const imgSize = this.list[this.current].clientWidth;
        if(this.current === this.len){
            this.current = 0;
            this.list.forEach(ele => ele.style.transition = "none");
            this.list.forEach(ele => ele.style.transform = 'translateX(' + (-imgSize * this.current) + 'px)');
            this.move();
        }else{
            ++this.current;
            if(this.current !== this.len){
                this.dots[this.current - 1].classList.remove('current');
                this.dots[this.current].classList.add('current');
            }
            else{
                this.dots[this.len - 1].classList.remove('current');
                this.dots[0].classList.add('current');
            }
            this.list.forEach(ele => ele.style.transition = "transform 0.7s ease-in-out");
            this.list.forEach(ele => ele.style.transform = 'translateX(' + (-imgSize * this.current) + 'px)');
            this.timeoutId = setTimeout(()=>this.move(), this.time);
        }        
    }

    // handleDotClick = (e) => {
    //     clearTimeout(this.timeoutId);
    //     const imgSize = this.list[this.current].clientWidth;
    //     if(this.current === this.len) {
    //         this.current = 0;
    //     }
    //     this.dots[this.current].classList.remove('current');
    //     this.current  = e.currentTarget.dataset.number;
    //     this.dots[this.current].classList.add('current');
    //     this.list.forEach(ele => ele.style.transition = "transform 0.7s ease-in-out");
    //     this.list.forEach(ele => ele.style.transform = 'translateX(' + (-imgSize * this.current) + 'px)');
    //     this.timeoutId = setTimeout(() => this.move(), this.time);
    // }
}

const generateMainSlider = () => {
    const mainSlider = document.querySelector('.main .slider');
    new Slider(mainSlider, 6000, ['img/main-slider/narty.png', 'img/main-slider/start.png', 'img/main-slider/narty.png'], ['narty', 'dobry-start', ''], 'mainSlider');
    attachSliderListeners();
}

const generateGrupySlider = () => {
    const grupySlider = document.querySelector('.grupy .slider');
    new Slider(grupySlider, 6000, ['img/main-slider/narty.png', 'img/main-slider/start.png'], [], 'grupySlider');
}

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
            nazwiskoInput.value = '';
            emailInput.value = '';
            numerInput.value = '';
        });
    }
    catch (error) {
        console.error(error);
    }
}

const nartButton = document.querySelector('.button-narty');
nartButton.addEventListener('click', onNartyClick);

const moreInfoClose = (infoTag) => {
    moreInfo = '';
    const infoDiv = document.querySelector(`.${infoTag}`);
    const left = document.querySelector('.main .left');
    const right = document.querySelector('.main .right');
    left.classList.remove('hidden');
    right.classList.remove('hidden');
    infoDiv.classList.remove('open');
}

const isMoreInfoOpen = () => {
    return moreInfo;
}

const attachSliderListeners = () => {
    const infoIcons = document.querySelectorAll('.slide i');
    infoIcons.forEach(ele => ele.addEventListener('click', onSliderIconClick));
}

attachSectionListeners();
attachServiceListeners();
attachContactListeners();
const start = document.querySelector(".main");
handleNewSection(start);