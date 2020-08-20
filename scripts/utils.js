import { 
    profileName,
    profileJob,
    inputName,
    inputJob,
} from './constants.js';

import {} from './FormValidator.js';


//ADD AND DELETE ESCAPE HISTORY. Watch the sequence of actions from anyToggleWindow to handlerOnEscape.^
const handlerOnEscape = (evt, anyModal) => {
    if (evt.key === 'Escape' && anyModal.classList.contains('popup_opened')) {
        removeAnyWindow(anyModal);
    }
}
//ADD AND DELETE OVERLAY HISTORY. Watch the sequence of actions from anyToggleWindow to handlerOnEscape.^
const handlerOnOverlay = (evt, anyModal) => {
    if (evt.target.classList.contains('popup_opened')){
        removeAnyWindow(anyModal);
    }
}

//OVERLAY
const removeEventListenersOverlay = (anyModal) => {
    anyModal.removeEventListener('mouseup', (evt) => handlerOnOverlay(evt, anyModal));
}
//ESC
const removeEventListenersEsc = (anyModal) => {
    document.removeEventListener('keydown', (evt) => handlerOnEscape(evt, anyModal));
}

//ESC_______
const addEventListenersEsc = (anyModal) => {
    document.addEventListener('keydown', (evt) => handlerOnEscape(evt, anyModal));    
}
//OVERLAY________
const addEventListenersOverlay = (anyModal) => {
    anyModal.addEventListener('mouseup', (evt) => handlerOnOverlay(evt, anyModal));    
} 

//Function Open Popup - YP Project Managers MISTAKE(REDO)
function addAnyWindow(anyModal){
    anyModal.classList.add('popup_opened');
    addEventListenersEsc(anyModal);
    addEventListenersOverlay(anyModal);
}

function inputsValuesInProfile () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

//Function Open Popup - YP Project Managers MISTAKE (REDO)
function removeAnyWindow(anyModal){
    anyModal.classList.remove('popup_opened');
    removeEventListenersEsc(anyModal);   
    removeEventListenersOverlay(anyModal);
}

export {
    handlerOnEscape,
    handlerOnOverlay,
    addAnyWindow,
    inputsValuesInProfile,
    removeAnyWindow,
    removeEventListenersOverlay,
    removeEventListenersEsc 
};