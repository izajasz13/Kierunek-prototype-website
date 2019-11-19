import {attachSectionListeners} from './sectionListeners.js';
import {Slider} from './sliderClass.js';
import {attachServiceListeners} from './changeService.js';

attachSectionListeners();
attachServiceListeners();

const newSlider = document.querySelector('.slider1');
new Slider(newSlider, 3000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'main')

const newSlider2 = document.querySelector('.slider2');
new Slider(newSlider2, 3000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'grupy')