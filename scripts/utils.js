import { 
    profileName,
    profileJob,
    popupTypeEdit,
    inputName,
    inputJob,
    popupTypeNewCard,
} from './constants.js';

import {
    editFormValidator,
    cardFormValidator,
} from './FormValidator.js';


//ADD AND DELETE ESCAPE HISTORY. Watch the sequence of actions from anyToggleWindow to handlerOnEscape.^
const handlerOnEscape = (evt, anyModal) => {
    if (evt.key === 'Escape' && anyModal.classList.contains('popup_opened')) {
        removeAnyWindow(anyModal);
    }
}
//ADD AND DELETE OVERLAY HISTORY. Watch the sequence of actions from anyToggleWindow to handlerOnEscape.^
const HandlerOnOverlay = (evt, anyModal) => {
    if (evt.target.classList.contains('popup_opened')){
        removeAnyWindow(anyModal);
    }
}

//ESC_______
const addEventListenersEsc = (anyModal) => {
    document.addEventListener('keydown', (evt) => handlerOnEscape(evt, anyModal));    
}
//ESC
const removeEventListenersEsc = (anyModal) => {
    document.removeEventListener('keydown', (evt) => handlerOnEscape(evt, anyModal));
}
//OVERLAY________
const addEventListenersOverlay = (anyModal) => {
    anyModal.addEventListener('mouseup', (evt) => HandlerOnOverlay(evt, anyModal));    
} 
//OVERLAY
const removeEventListenersOverlay = (anyModal) => {
    anyModal.removeEventListener('mouseup', (evt) => HandlerOnOverlay(evt, anyModal));
}

//If popup doesn't contain inputs(just imagepopup) then do not a reset for popups
function resetConcrerePopup (anyModal) {
    if (anyModal ===  popupTypeEdit){
        editFormValidator.popupFormReset();
        inputsValuesInProfile(); 
    } else if (anyModal ===  popupTypeNewCard){
        cardFormValidator.popupFormReset();
    }
} 

//Function Open Popup - YP Project Managers MISTAKE(REDO)
function addAnyWindow(anyModal){
    anyModal.classList.add('popup_opened');
    addEventListenersEsc(anyModal);
    addEventListenersOverlay(anyModal);
}

//Function Open Popup - YP Project Managers MISTAKE (REDO)
function removeAnyWindow(anyModal){
    anyModal.classList.remove('popup_opened');
    removeEventListenersEsc(anyModal);   
    removeEventListenersOverlay(anyModal);
    resetConcrerePopup(anyModal);
}

function inputsValuesInProfile () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

export {
    handlerOnEscape,
    HandlerOnOverlay,
    resetConcrerePopup,
    addAnyWindow,
    removeAnyWindow,
    inputsValuesInProfile
};