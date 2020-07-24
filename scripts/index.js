//Consts for Edit-Button(1st)
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
//and Edit-Popup
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditContainer = popupTypeEdit.querySelector('.popup__container');
//Edit Popup Buttons
const popupSubmitButton =popupTypeEdit.querySelector('.popup__submit-button');
const popupCloseButton = popupTypeEdit.querySelector('.popup__close-button');
//Edit Popup Inputs
const inputName = popupTypeEdit.querySelector('.popup__input_type_name');
const inputJob = popupTypeEdit.querySelector('.popup__input_type_job');

//Consts for Add-Button and Add-Popup(2nd)
const elements = document.querySelector('.elements');
const openAddCardButton = profile.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_add-card');
//Popap's Buttons
const popupCardCloseButton = popupTypeNewCard.querySelector('.popup__close-button');
const popupAddCardSubmitButton = popupTypeNewCard.querySelector('.popup__submit-button');
const popupAddCardContainer = popupTypeNewCard.querySelector('.popup__container');
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

//Condion for first popup
function anyToggleWindow(anyModal) {
    if(!anyModal.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
    anyModal.classList.toggle('popup_opened');
};

//Function of additon of new cards
function formAddSubmitHandler(evt) {
    evt.preventDefault();
    RenderCard({
        name: inputCardName.value,
        link: inputCardLink.value
    });
    anyToggleWindow(popupTypeNewCard);
    inputCardName.value = '';
    inputCardLink.value ='';
};

//Function of renaming of prfile
function formEditSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    anyToggleWindow(popupTypeEdit);
}

//INTURN Card actions
//Function that make certan like(in certain card) an aktive/default
const HandleLikeToggle = (evt) => {
    evt.target.classList.toggle('elements_like_aktive');
};

//Function that delete cerain card
const HandleDeleteClosest = (evt) => {
    evt.target.closest('.elements__element').remove();
};


//CARD CREATION
//Creation an initial array 
initialCards.forEach((data) => {
    RenderCard(data);
});

//Place, where we want to insert a new card(template)
function RenderCard(data) {
    cardList.prepend(CreateCard(data));
}

//Function that assigns the values(Name/Link/Alt) for every card
function CreateCard(data) {
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
    cardLikeButton.addEventListener('click', HandleLikeToggle);
    cardDeliteButton.addEventListener('click', HandleDeleteClosest);
    //Image like button or image Popup
    //Function for 3rd Popup
    const HandleImageClick = (evt) => {
    anyToggleWindow(popupOpenBigImg);
    popupBigImg.src = cardImage.src;
    popupBigImgFigCapture.textContent = cardTitle.textContent;
    popupBigImgFigCapture.alt = cardTitle.textContent;
};
    cardImage.addEventListener('click', HandleImageClick);
    return cardElement;
}

//Below BUTTONS actions

//For Add Popup
openAddCardButton.addEventListener('click', () => {
  anyToggleWindow(popupTypeNewCard);
});
popupCardCloseButton.addEventListener('click', () => {
  anyToggleWindow(popupTypeNewCard);
});
popupAddCardContainer.addEventListener('submit', formAddSubmitHandler);

//For Edit Popup
profileEditButton.addEventListener('click', () => {
  anyToggleWindow(popupTypeEdit);
});
popupCloseButton.addEventListener('click', () => {
  anyToggleWindow(popupTypeEdit);
});
popupEditContainer.addEventListener('submit',formEditSubmitHandler);

//For Image Popup
popupCloseBigImgButton.addEventListener('click', () => {
  anyToggleWindow(popupOpenBigImg);
});

//#ЯПЛАКАЛЬ





