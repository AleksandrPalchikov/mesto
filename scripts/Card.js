import {addAnyWindow} from './utils.js';

import {
    popupOpenBigImg,
    popupBigImg,
    popupBigImgFigCapture
} from './constants.js';

class Card {
    constructor (data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
}

// set Listeners inside the every card from Template or for NewCard
_setEventListeners() {
    const cardLikeButton = this._element.querySelector('.elements__like');
    const cardDeliteButton = this._element.querySelector('.elements__trash');
    const cardImage = this._element.querySelector('.elements__img');
    //For every card - Like/Delete Button is ative  
    cardLikeButton.addEventListener('click', () => {this._handleLikeToggle()});
    cardDeliteButton.addEventListener('click', () => {this._handleDeleteClosest()});
    //Image like button or image Popup
    cardImage.addEventListener('click',() => {this._handleImageClick()});
}

//Get template from HTML. Now we can get different template thanks to _cardDelector. We just can change class in a render class
_getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.elements__element');
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
}

// Rewhriting values from InitialCard(dataBank) or from NewCard inputs into Template
generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();       
    //All indsides from template we wan to make actions
    const cardImage = this._element.querySelector('.elements__img');
    const cardTitle = this._element.querySelector('.elements__title');

    //Rendering/actions/changes
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    //Returning an upgraded element
    return this._element;
}

//Function that make certan like(in certain card) an aktive/default
_handleLikeToggle() {
    this._element.querySelector('.elements__like').classList.toggle('elements_like_aktive');
};

//Function - values for 3rd Popup. Take image from card and putt it in ImgPopup
_handleImageClick(){
    addAnyWindow(popupOpenBigImg);
    popupBigImg.src = this._element.querySelector('.elements__img').src;
    popupBigImgFigCapture.textContent = this._element.querySelector('.elements__title').textContent;
    popupBigImg.alt = this._element.querySelector('.elements__img').alt;
}

//Function that delete certain card. We need to put null this element, because this._element doesn't exist
_handleDeleteClosest() {
    this._element.remove();
    this._element = null;
}
} 

export {Card};
