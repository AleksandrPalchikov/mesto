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

//Const for Template search 
const cardTemplate = document.querySelector('.elements__element-template').content.querySelector('.elements__element');
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

// If popup doesn't contain inputs(just imagepopup) then do not a reset for popups
function areInputsInPopup (anyModal) {
    if (anyModal !== popupOpenBigImg) {
        popupFormReset(anyModal, popupClassesObject);
    }
}

//Function Open Popup - YP Project Managers MISTAKE
function addAnyWindow(anyModal){
    anyModal.classList.add('popup_opened');
    addEventListenersEsc(anyModal);
    addEventListenersOverlay(anyModal);
}
//Function Open Popup - YP Project Managers MISTAKE
function removeAnyWindow(anyModal){
    anyModal.classList.remove('popup_opened');
    removeEventListenersEsc(anyModal);
    removeEventListenersOverlay(anyModal);
    areInputsInPopup(anyModal);
}

function inputsValuesInProfile () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

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
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    //Check the input conditions
    editPopupInputsCondition(popupTypeEdit);
}

//Function of additon of new cards
function formAddSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({
        name: inputCardName.value,
        link: inputCardLink.value
    });
    removeAnyWindow(popupTypeNewCard);
    inputCardName.value = '';
    inputCardLink.value ='';
}

//INTURN CARD ACTIONS
//Function that make certan like(in certain card) an aktive/default
const handleLikeToggle = (evt) => {
    evt.target.classList.toggle('elements_like_aktive');
};

//Function that delete cerain card
const handleDeleteClosest = (evt) => {
    evt.target.closest('.elements__element').remove();
};

//Function - values for 3rd Popup
const handleImageClick = (evt) => {
    addAnyWindow(popupOpenBigImg);
    popupBigImg.src = evt.target.src;
    popupBigImgFigCapture.textContent = evt.target.closest('.elements__element').querySelector('.elements__title').textContent;
    popupBigImg.alt = evt.target.alt;
};

//CARD CREATION
//Creation an initial array 
initialCards.forEach((data) => {
    renderCard(data);
});

//Place, where we want to insert a new card(template)
function renderCard(data) {
    cardList.prepend(createCard(data));
}

//Function that assigns the values(Name/Link/Alt) for every card
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    //All indsides from template we wan to make actions
    const cardImage = cardElement.querySelector('.elements__img');
    const cardTitle = cardElement.querySelector('.elements__title');
    const cardLikeButton = cardElement.querySelector('.elements__like');
    const cardDeliteButton = cardElement.querySelector('.elements__trash');
    //Rendering/actions/changes
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    //For every card - Like/Delete Button is ative  
    cardLikeButton.addEventListener('click', handleLikeToggle);
    cardDeliteButton.addEventListener('click', handleDeleteClosest);
    //Image like button or image Popup
    cardImage.addEventListener('click', handleImageClick);
    return cardElement;
}

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












