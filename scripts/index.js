import {handleNewSection} from './changeSection.js';
import {attachSectionListeners} from './sectionListeners.js';
import {Slider} from './sliderClass.js';
import {attachServiceListeners} from './changeService.js';
import {attachContactListeners} from './contactForm.js';

attachSectionListeners();
attachServiceListeners();
attachContactListeners();
const start = document.querySelector(".main");
handleNewSection(start)

const newSlider = document.querySelector('.slider1');
new Slider(newSlider, 5000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'main')

const newSlider2 = document.querySelector('.slider2');
new Slider(newSlider2, 5000, ['img/odnowa_ig-05.png', 'img/grupy domowe.png'], 'grupy')