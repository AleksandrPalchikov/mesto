import { 
    profileName,
    profileJob,
    profileEditButton,
    popupTypeEdit,
    popupEditForm,
    popupCloseButton,
    inputName,
    inputJob,
    openAddCardButton,
    popupTypeNewCard,
    popupCardCloseButton,
    popupAddCardForm,
    inputCardName,
    inputCardLink,
    popupOpenBigImg,
    popupCloseBigImgButton,
    initialCards
} from './constants.js';

import {
    addAnyWindow,
    removeAnyWindow,
    inputsValuesInProfile
} from './utils.js';

import {Card} from './Card.js';

//Initialising inputs conditions for editProfilePopup
function editPopupInputsCondition (popupTypeEdit) {
    if(popupTypeEdit.classList.contains('popup_opened')){
         //Take an exsiting values of profile;
        inputsValuesInProfile();
    }
    //Just to close popup
    removeAnyWindow(popupTypeEdit);
}

//Function of renaming of prfile
function formEditSubmitHandler(evt) {
    evt.preventDefault();
    //whrite values from inputs
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    //Check the input conditions
    editPopupInputsCondition(popupTypeEdit);
}

//Function of additon of new cards
function formAddSubmitHandler(evt) {
    evt.preventDefault();
    renderCards([{
        name: inputCardName.value,
        link: inputCardLink.value
    }]);
    removeAnyWindow(popupTypeNewCard);
    inputCardName.value = '';
    inputCardLink.value ='';
}

//We go through the whole Template array and create a new card through the new Class. The same for NewCard from inputs
function renderCards(initialCards){
//Creation an initial array 
initialCards.forEach((data) => {
    const card = new Card(data, '.elements__element-template');
    const cardElement = card.generateCard(); //we have got here an upgraded element from generateCard() to insert it in Class List
    // Добавляем в DOM
    const cardList = document.querySelector('.elements__list');
    cardList.prepend(cardElement);
});
}
//It's a great sin to forget to call a function. End Of CardsActions. I don't now how; but I've done that :)
renderCards(initialCards);

//BELOW BUTTONS ACTIONS
//Add Popup
openAddCardButton.addEventListener('click', () => {
    addAnyWindow(popupTypeNewCard);
});
//Remove Popup
popupCardCloseButton.addEventListener('click', () => {
    removeAnyWindow(popupTypeNewCard);
});

popupAddCardForm.addEventListener('submit', formAddSubmitHandler);

//For Edit Popup
profileEditButton.addEventListener('click', () => {
    addAnyWindow(popupTypeEdit);
});
popupCloseButton.addEventListener('click', () => {
    removeAnyWindow(popupTypeEdit);
});

popupEditForm.addEventListener('submit',formEditSubmitHandler);

//For Image Popup
popupCloseBigImgButton.addEventListener('click', () => {
    removeAnyWindow(popupOpenBigImg);
});










