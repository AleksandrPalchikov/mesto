const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileEddButton = profile.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupSubmitButton =popup.querySelector('.popup__submit-button')
const popupCloseButton = popup.querySelector('.popup__close-button');

let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__description');


function addPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
};

function removePopup() {
    popup.classList.remove('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
};

profileEditButton.addEventListener('click', addPopup); 
popupCloseButton.addEventListener('click', removePopup);
popupContainer.addEventListener('submit', formSubmitHandler);