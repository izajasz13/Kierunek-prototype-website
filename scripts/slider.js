class Slider{
    constructor(slider, time, imgList, id){
        this.slider = slider;
        this.time = time;
        this.len = imgList.length;
        this.id = `.${id}`;
        this.current = 0;
        slider.classList.add('slider');
        slider.classList.add(id);
        this.createSlides(imgList);
        setTimeout(() => this.move(), this.time);
    }

    createSlides(imgList){
        imgList.forEach(ele => {
            const container = document.createElement('div');
            container.innerHTML = `<img src="${ele}" alt="">`;
            container.classList.add('slide');
            this.slider.appendChild(container);
        });
        const container = document.createElement('div');
        container.innerHTML = `<img src="${imgList[0]}" alt="">`;
        container.classList.add('slide');
        this.slider.appendChild(container);
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
            this.list.forEach(ele => ele.style.transition = "transform 0.7s ease-in-out");
            this.list.forEach(ele => ele.style.transform = 'translateX(' + (-imgSize * this.current) + 'px)');
            setTimeout(()=>this.move(), this.time)
        }        
    }
}

export const generateMainSlider = () => {
    const mainSlider = document.querySelector('.main .slider');
    new Slider(mainSlider, 4000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'mainSlider');
}

export const generateGrupySlider = () => {
    const grupySlider = document.querySelector('.grupy .slider');
    new Slider(grupySlider, 4000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'grupySlider');
}