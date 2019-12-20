import { handleNewSection } from './changeSection.js';
import { attachSectionListeners } from './sectionListeners.js';
import { attachServiceListeners } from './changeService.js';
import { attachContactListeners } from './contactForm.js';

attachSectionListeners();
attachServiceListeners();
attachContactListeners();
const start = document.querySelector(".main");
handleNewSection(start)