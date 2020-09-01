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
    cardList,
    initialCards,
    popupClassesObject
} from './constants.js';

import {/**/} from './utils.js';
import {Popup} from './Popup.js';
import {Card} from './Card.js';
import {Section} from './Section.js';
import {FormValidator} from './FormValidator.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';

//Creation of new object of FormValidator class
const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(popupClassesObject, popupTypeNewCard);
cardFormValidator.enableValidation();

const callPopupEdit = new Popup(popupTypeEdit); //  will be class PopupWithForm
const callPopupAddCard = new Popup(popupTypeNewCard); //will be class PopupWithForm
const callPopupOpenBigImage = new PopupWithImage(popupOpenBigImg); // class Popupimage

//Insertion cards from Array in a cardList.
const sectionList = new Section({
    items: initialCards,
    renderer: (item) => {
            const card = new Card({
                data: item,
                handlCardclick: (cardData) => {callPopupOpenBigImage.open(cardData)}
            }, '.elements__element-template');
            const cardElement = card.generateCard();
            //we have got here an upgraded element from generateCard() to insert it in Class List
            sectionList.addItem(cardElement);
        }
    }, cardList);
sectionList.redererItem()


//Function of additon of new cards
function formAddSubmitHandler(evt) {
    evt.preventDefault();

    const sectionList = new Section({
        items: [{
            name: inputCardName.value,
            link: inputCardLink.value
        }],
        renderer: (item) => {
                const card = new Card({
                    data: item,
                    handlCardclick: (cardData) => {callPopupOpenBigImage.open(cardData)}
                }, '.elements__element-template');
                const cardElement = card.generateCard();
                //we have got here an upgraded element from generateCard() to insert it in Class List
                sectionList.addItem(cardElement);
            }
        }, cardList);

    sectionList.redererItem();
    callPopupAddCard.close();
    inputCardName.value = '';
    inputCardLink.value ='';
}

//Function of renaming of prfile
function formEditSubmitHandler(evt) {
    evt.preventDefault();
    //write values from inputs
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    //Just to close popup
    callPopupEdit.close();
}

//Add Popup
openAddCardButton.addEventListener('click', () => {
    callPopupAddCard.open();
    cardFormValidator.popupFormReset();
});

popupAddCardForm.addEventListener('submit', formAddSubmitHandler);



//For Edit Popup
profileEditButton.addEventListener('click', () => {
    callPopupEdit.open();
    editFormValidator.popupFormReset();
    //Check the input conditions. Initialising inputs conditions for editProfilePopup
    if (popupTypeEdit.classList.contains('popup_opened')){
     //Take an exsiting values of profile;
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
});


popupEditForm.addEventListener('submit', formEditSubmitHandler);

