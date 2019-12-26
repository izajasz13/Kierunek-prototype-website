import { attachSliderListeners } from './sliderClick.js';

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

    handleDotClick = (e) => {
        clearTimeout(this.timeoutId);
        const imgSize = this.list[this.current].clientWidth;
        if(this.current === this.len) {
            this.current = 0;
        }
        this.dots[this.current].classList.remove('current');
        this.current  = e.currentTarget.dataset.number;
        this.dots[this.current].classList.add('current');
        this.list.forEach(ele => ele.style.transition = "transform 0.7s ease-in-out");
        this.list.forEach(ele => ele.style.transform = 'translateX(' + (-imgSize * this.current) + 'px)');
        this.timeoutId = setTimeout(() => this.move(), this.time);
    }
}

export const generateMainSlider = () => {
    const mainSlider = document.querySelector('.main .slider');
    new Slider(mainSlider, 6000, ['img/main-slider/narty.png', 'img/main-slider/start.png', 'img/main-slider/narty.png'], ['narty', 'dobry-start', ''], 'mainSlider');
    attachSliderListeners();
}

export const generateGrupySlider = () => {
    const grupySlider = document.querySelector('.grupy .slider');
    new Slider(grupySlider, 6000, ['img/main-slider/narty.png', 'img/main-slider/start.png'], [], 'grupySlider');
}