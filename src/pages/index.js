import {
  inputName,
  inputJob,
  profileEditButton,
  popupTypeEdit,
  openAddCardButton,
  popupTypeNewCard,
  initialCards,
  popupClassesObject,
} from "../utils/constants.js";

import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//Creation of two new objects of FormValidator class for two popups with forms
const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(
  popupClassesObject,
  popupTypeNewCard
);
cardFormValidator.enableValidation();
//Child Object of Popup class for popup with Image (without form)
const popupOpenBigImage = new PopupWithImage(".popup_type_open-img"); //!!!
popupOpenBigImage.setEventListeners();

// "item" value: {name:..,link:..} from SectionList (fomim itialCards Array)
// to render a Cards from Array or Card from input
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handlCardclick: (cardData) => {
        popupOpenBigImage.open(cardData);
      }, //tranfer data from Card Class to imgPopup
    },
    ".elements__element-template"
  );
  const cardElement = card.generateCard();
  //we have got here an upgraded element from generateCard() to insert it in Class List
  sectionList.addItem(cardElement);
}

//INCERTION CARD ALGORITHM from Array with images in a cardList - initial operation.
const sectionList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  ".elements__list"
);

sectionList.renderInitialCards();

//1. Collection inputs values from addCardPopup and SUNBMIT(via callback), 2. then creation of Card to insert it in cardList
const popupAddCard = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      //Method to render just one card with inputs values
      sectionList.renderCardFromInputs(formData);
      popupAddCard.close();
    },
  },
  ".popup_type_add-card"
);

//Open AddPopup and Check validity
openAddCardButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.popupFormReset();
});
//important: schould be made just one time (not putt this function in open Method) or will be exponential law with new cards x1x2x4....
popupAddCard.setEventListeners();

//create an userInfo image of UserInfo Class to create a object with Profile values
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

//1. SUBMIT. Collection inputs values from editProfilePopup and SUNBMIT( viacallback)
//2. then insertion inputs values it in webPage through UserInfo Class
const popupEdit = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      //rewrite values from inputs on page
      userInfo.setUserInfo(formData.name, formData.job);
      popupEdit.close();
    },
  },
  ".popup_type_edit"
);

//Open editPopup
profileEditButton.addEventListener("click", () => {
  //make a validation
  editFormValidator.popupFormReset();
  //find an Object with the latest Profile values
  const currentUserInfo = userInfo.getUserInfo();
  //fill inputs with latest values feom object
  inputName.value = currentUserInfo.userName;
  inputJob.value = currentUserInfo.userDescription;

  popupEdit.open();
});
popupEdit.setEventListeners();
