import {
  inputName,
  inputJob,
  profileEditButton,
  popupTypeEdit,
  openAddCardButton,
  popupTypeNewCard,
  popupClassesObject,
  avatarButton,
  popupEditAvatar,
} from "../utils/constants.js";
import "./index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmitDel } from "../components/PopupWithSubmitDel";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15", //2
  headers: {
    authorization: "7ab42f4a-85b2-40b4-8955-f611d5ddf392",
    "Content-Type": "application/json",
  },
});

api
  .getAllNeededData()
  .then((allNeededInitialData) => {
    const [profileInfoFromServer, initialCards] = allNeededInitialData;
    userInfo.getAndSetUserInfoFromServer(profileInfoFromServer);
    //INCERTION CARD ALGORITHM from Array with images in a cardList - initial operation.
    sectionList.renderInitialCards(initialCards);
    //My last id to make actions with like an delete just my card
    /*card.getAllProfileInfo(profileInfoFromServer);  */
  })
  .catch((err) => {
    console.log(`Ошибка. Ты все уронил ${err.status}`);
  });

//Creation of two new objects of FormValidator class for two popups with forms
const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(
  popupClassesObject,
  popupTypeNewCard
);
cardFormValidator.enableValidation();
const addNewAvatarValidator = new FormValidator(
  popupClassesObject,
  popupEditAvatar
);
addNewAvatarValidator.enableValidation();

//Child Object of Popup class for popup with Image (without form)
const popupOpenBigImage = new PopupWithImage(".popup_type_open-img");
popupOpenBigImage.setEventListeners();

const popupConfirm = new PopupWithSubmitDel(".popup_type_delete-card");

//INCERTION CARD ALGORITHM from Array with images in a cardList - initial operation.
const sectionList = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  ".elements__list"
);

// "item" value: {name:..,link:..} from SectionList (fomim itialCards Array)
// to render a Cards from Array or Card from input
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardclick: (cardData) => {
        popupOpenBigImage.open(cardData);
      },
      handleLikeClick: (id) => {
        //send PUT request on server
        api
          .putNewLikeonServer(id)
          .then((updatedCardInfo) => {
            card.updateLikesArea(updatedCardInfo.likes);
          })
          .catch((err) => {
            console.log(`Ошибка. Запрос не выполнен ${err.status}`);
          });
      },
      handleDeleteLikeClick: (id) => {
        api
          .deleteMyLikeFromServer(id)
          .then((updatedCardInfo) => {
            card.updateLikesArea(updatedCardInfo.likes);
          })
          .catch((err) => {
            console.log(`Ошибка. Запрос не выполнен ${err.status}`);
          });
      },
      handleDeleteIconClick: (id) => {
        popupConfirm.setEventListeners();
        popupConfirm.setSubmitAction(() => {
          api
            .removeCardFromServer(id)
            .then(() => card.handleDeleteClosest())
            .then(() => popupConfirm.close())
            .catch((err) => {
              renderError(`Ошибка: ${err}`);
            });
        });
        popupConfirm.open();
      },
    },
    ".elements__element-template"
  );

  const cardElement = card.generateCard();
  //we have got here an upgraded element from generateCard() to insert it in Class List
  sectionList.addItem(cardElement);
}

//1. Collection inputs values from addCardPopup and SUNBMIT(via callback), 2. then creation of Card to insert it in cardList
const popupAddCard = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      //Method to render just one card with inputs values
      api
        .addNewCardOnServer(formData)
        .then((newCardInfo) => {
          //INCERTION CARD ALGORITHM from Array with images in a cardList from server - initial operation.
          sectionList.renderCardFromInputs(newCardInfo);
        })
        .catch((err) => {
          console.log(`Ошибка. Запрос не выполнен ${err.status}`);
        });

      popupAddCard.close();
    },
  },
  ".popup_type_add-card"
);

//Open AddPopup and Check validity
openAddCardButton.addEventListener("click", () => {
  popupAddCard.returnNameOnSubmitButton();
  popupAddCard.open();
  cardFormValidator.popupFormReset();
});
//important: schould be made just one time (not putt this function in open Method) or will be exponential law with new cards x1x2x4....
popupAddCard.setEventListeners();

//Open editAvatarPopup
const popupChangeAvatar = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      api
        .addNewAvatarOnServer(formData.avatar)
        .then((updatedAvatarLink) => {
          //insert profile on page METHOD
          userInfo.setNewAvatarOnPage(updatedAvatarLink.avatar);
        })
        .catch((err) => {
          console.log(
            `Ошибка. Запрос не выполнен -  addNewAvatarOnServer ${err.status}`
          );
        });
      popupChangeAvatar.close();
    },
  },
  ".popup_type_edit-avatar-link"
);

avatarButton.addEventListener("click", () => {
  popupChangeAvatar.returnNameOnSubmitButton();
  popupChangeAvatar.open();
  //make a validation
  addNewAvatarValidator.popupFormReset();
});
popupChangeAvatar.setEventListeners();

//create an userInfo image of UserInfo Class to create a object with Profile values
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

//1. SUBMIT. Collection inputs values from editProfilePopup and SUNBMIT( viacallback)
//2. then insertion inputs values it in webPage through UserInfo Class
const popupEdit = new PopupWithForm(
  {
    //formValues
    handleSubmitForm: (formData) => {
      //rewrite values from inputs on page
      userInfo.setUserInfo(formData.name, formData.job, formData.avatar);
      api
        .addNewProfileInfoOnServer(formData)
        .then((res) => {})
        .catch((err) => {
          console.log(
            `Ошибка. Запрос не выполнен -  addNewAvatarOnServer ${err.status}`
          );
        });
      /*  popupAddCard.returnNameOnSubmitButton();*/
      popupEdit.close();
    },
  },
  ".popup_type_edit"
);

//Open editPopup
profileEditButton.addEventListener("click", () => {
  //make a validation
  editFormValidator.popupFormReset();
  popupEdit.returnNameOnSubmitButton();
  //find an Object with the latest Profile values
  const currentUserInfo = userInfo.getUserInfo();
  //fill inputs with latest values feom object
  inputName.value = currentUserInfo.userName;
  inputJob.value = currentUserInfo.userDescription;

  popupEdit.open();
});
popupEdit.setEventListeners();
