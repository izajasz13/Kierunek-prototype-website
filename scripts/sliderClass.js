export class Slider{
    constructor(slider, time, imgList, id){
        this.slider = slider;
        this.time = time;
        this.len = imgList.length;
        this.id = `.${id}`;
        this.current = 0;
        slider.classList.add('slider');
        slider.classList.add(id);
        this.createSlides(imgList);
        this.move();
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