

//Consts for Edit-Button(1st)
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
//and Edit-Popup
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupTypeEdit.querySelector('.popup__form');
//Edit Popup Button
const popupCloseButton = popupTypeEdit.querySelector('.popup__close-button');
//Edit Popup Inputs
const inputName = popupTypeEdit.querySelector('.popup__input_type_name');
const inputJob = popupTypeEdit.querySelector('.popup__input_type_job');

//Consts for Add-Button and Add-Popup(2nd)
const openAddCardButton = profile.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_add-card');
//Popap's Buttons
const popupCardCloseButton = popupTypeNewCard.querySelector('.popup__close-button');
const popupAddCardForm = popupTypeNewCard.querySelector('.popup__form');
const submitButtonCard = popupTypeNewCard.querySelector('.popup__submit-button')
//AddCard Popup Inputs
const inputCardName = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const inputCardLink= popupTypeNewCard.querySelector('.popup__input_type_card-link');

//Consts for Big-Image-Popup(3rd)
const popupOpenBigImg = document.querySelector('.popup_type_open-img');
const popupCloseBigImgButton = popupOpenBigImg.querySelector('.popup__close-button');
const popupBigImg = popupOpenBigImg.querySelector('.popup__img');
const popupBigImgFigCapture = popupOpenBigImg.querySelector('.popup__figcaption');

// Добавляем в DOM
const cardList = document.querySelector('.elements__list');

//Default array of initial data
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Initial constants - FormValid class
const popupClassesObject = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'
};


export { 
    profile,
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
    submitButtonCard,
    inputCardName,
    inputCardLink,
    popupOpenBigImg,
    popupCloseBigImgButton,
    popupBigImg,
    popupBigImgFigCapture,
    cardList,
    initialCards,
    popupClassesObject
}; 
