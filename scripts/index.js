const Profile = document.querySelector('.profile');
const ProfileEditButton = Profile.querySelector('.profile__edit-button');
const ProfileEddButton = Profile.querySelector('.profile__add-button');

const Popup = document.querySelector('.popup');
const PopupContainer = Popup.querySelector('.popup__container');
const PopupSubmitButton =Popup.querySelector('.popup__submit-button')
const PopupCloseButton = Popup.querySelector('.popup__close-button');

let InputName = Popup.querySelector('.popup__input_type_name');
let InputJob = Popup.querySelector('.popup__input_type_job');
let ProfileName = Profile.querySelector('.profile__title');
let ProfileJob = Profile.querySelector('.profile__description');


function AddPopup() {
    Popup.classList.add('popup_opened');
    InputName.value = ProfileName.textContent;
    InputJob.value = ProfileJob.textContent;
};

function RemovePopup() {
    Popup.classList.remove('popup_opened');
    InputName.value = ProfileName.textContent;
    InputJob.value = ProfileJob.textContent;
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    Popup.classList.remove('popup_opened');
    ProfileName.textContent = InputName.value;
    ProfileJob.textContent = InputJob.value;
};

ProfileEditButton.addEventListener('click', AddPopup); 
PopupCloseButton.addEventListener('click', RemovePopup);
PopupContainer.addEventListener('submit', formSubmitHandler);