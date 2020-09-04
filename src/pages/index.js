import { 
    profileName,
    profileJob,
    profileEditButton,
    popupTypeEdit,
    openAddCardButton,
    popupTypeNewCard,
    popupOpenBigImg,
    cardList,
    initialCards,
    popupClassesObject
} from '../scripts/utils/constants.js';

import './index.css';
import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';

//Creation of two new objects of FormValidator class for two popups with forms
const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(popupClassesObject, popupTypeNewCard);
cardFormValidator.enableValidation();
//Child Object of Popup class for popup with Image (without form) 
const callPopupOpenBigImage = new PopupWithImage(popupOpenBigImg);
//INCERTION CARD ALGORITHM from Array with images in a cardList - initial operation.
const sectionList = new Section({
    items: initialCards,
    renderer: (item) => {
            const card = new Card({
                data: item,
                handlCardclick:(cardData) => {callPopupOpenBigImage.open(cardData)} //rewrite values from card in imgPopup
            }, '.elements__element-template');
            const cardElement = card.generateCard();
            //we have got here an upgraded element from generateCard() to insert it in Class List
            sectionList.addItem(cardElement);
        }
    }, cardList);
sectionList.redererItem()

//1. Collection inputs values from addCardPopup and SUNBMIT(via callback), 2. then creation of Card to insert it in cardList
const callPopupAddCard = new PopupWithForm({
    handleSubmitForm: (formData) => {
        //INCERTION CARD ALGORITHM
        const sectionList = new Section({
            items: [formData],
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
        }
}, popupTypeNewCard);

//Open AddPopup and Check validity
openAddCardButton.addEventListener('click', () => {
    callPopupAddCard.open();
    cardFormValidator.popupFormReset();
});

callPopupAddCard.setEventListeners();

//1. Collection inputs values from editProfilePopup and SUNBMIT(callback) 2. then insertion inputs values it in webPage through UserInfo Claass
const callPopupEdit = new PopupWithForm({
    handleSubmitForm: (formData) => {
    const userInfo = new UserInfo({
            userName: formData.name,
            userDescription: formData.job
        });
    //write values from inputs    
    userInfo.setUserInfo();
    callPopupEdit.close();
}
}, popupTypeEdit);

//Open editPopup, make a validation 
profileEditButton.addEventListener('click', () => {
    editFormValidator.popupFormReset();
    callPopupEdit.open();
    // Rewrite onPage values in inputs while opening of editPopup
    const userInfo = new UserInfo({
        userName: profileName.textContent,
        userDescription: profileJob.textContent
    });
    userInfo.getUserInfo();

});  

callPopupEdit.setEventListeners();