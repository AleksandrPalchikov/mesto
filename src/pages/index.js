import { 
    inputName,
    inputJob,
    profileEditButton,
    popupTypeEdit,
    openAddCardButton,
    popupTypeNewCard,
    popupOpenBigImg,
    cardList,
    initialCards,
    popupClassesObject
} from '../utils/constants.js';

import './index.css';

import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

//Creation of two new objects of FormValidator class for two popups with forms
const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(popupClassesObject, popupTypeNewCard);
cardFormValidator.enableValidation();
//Child Object of Popup class for popup with Image (without form) 
const callPopupOpenBigImage = new PopupWithImage('.popup_type_open-img'); //!!!
callPopupOpenBigImage.setEventListeners();



function cardClass(item){
    const card = new Card({
        data: item,
        handlCardclick:(cardData) => {callPopupOpenBigImage.open(cardData)} //rewrite values from card in imgPopup
    }, '.elements__element-template');
    const cardElement = card.generateCard();
    //we have got here an upgraded element from generateCard() to insert it in Class List
    sectionList.addItem(cardElement);
}

//INCERTION CARD ALGORITHM from Array with images in a cardList - initial operation.
const sectionList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardClass(item);
        }
    }, '.elements__list');

sectionList.redererItem();

//1. Collection inputs values from addCardPopup and SUNBMIT(via callback), 2. then creation of Card to insert it in cardList
const callPopupAddCard = new PopupWithForm({
    handleSubmitForm: (formData) => {
        
        //INCERTION CARD ALGORITHM
        const sectionList = new Section({
            items: [formData],
            renderer: (item) => {
                cardClass(item);
                }
            }, '.elements__list'); 

        sectionList.redererItem();
        callPopupAddCard.close();
        }
}, '.popup_type_add-card');

//Open AddPopup and Check validity
openAddCardButton.addEventListener('click', () => {
    callPopupAddCard.open();
    cardFormValidator.popupFormReset();
});

callPopupAddCard.setEventListeners();

    //Rewrite onPage values in inputs while opening of editPopup
    const userInfo = new UserInfo({
        userNameSelector: '.profile__title',
        userDescriptionSelector: '.profile__description'
});


//1. Collection inputs values from editProfilePopup and SUNBMIT(callback) 2. then insertion inputs values it in webPage through UserInfo Claass
const callPopupEdit = new PopupWithForm({
    handleSubmitForm: (formData) => {
        //write values from inputs on page 
        userInfo.setUserInfo(formData.name, formData.job);
        callPopupEdit.close();
}
}, '.popup_type_edit');

//Open editPopup, make a validation 
profileEditButton.addEventListener('click', () => {
    editFormValidator.popupFormReset();
    const currentUserInfo = userInfo.getUserInfo();
    inputName.value = currentUserInfo.userName;
    inputJob.value = currentUserInfo.userDescription;
    callPopupEdit.open();


});  

callPopupEdit.setEventListeners();