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
    cardLikeButton.addEventListener('click', (evt) => {this._handleLikeToggle(evt)});
    cardDeliteButton.addEventListener('click', (evt) => {this._handleDeleteClosest(evt)});
    //Image like button or image Popup
    cardImage.addEventListener('click',(evt) => {this._handleImageClick(evt)});
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
_handleLikeToggle(evt) {
    evt.target.classList.toggle('elements_like_aktive');
};
//Function that delete certain card
_handleDeleteClosest(evt) {
    evt.target.closest('.elements__element').remove();
};
//Function - values for 3rd Popup. Take image from card and putt it in ImgPopup
_handleImageClick(evt){
    addAnyWindow(popupOpenBigImg);
    popupBigImg.src = evt.target.src;
    popupBigImgFigCapture.textContent = evt.target.closest('.elements__element').querySelector('.elements__title').textContent;
    popupBigImg.alt = evt.target.alt;
};
} 

export {Card};
