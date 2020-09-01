import {/*addAnyWindow*/} from './utils.js';
import {/*callPopupOpenBigImage*/} from './index.js';
import {} from './constants.js';

class Card {
    constructor ({data, handlCardclick}, cardSelector) {
    this._cardSelector = cardSelector;
    this._handlCardclick = handlCardclick;
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
    cardImage.addEventListener('click',() => {this._handlCardclick({
        name: cardImage.alt,
        link: cardImage.src,
        subscription: this._element.querySelector('.elements__title').textContent
    }
    )});    
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
    //All indsides from template we wan to make actions
    const cardImage = this._element.querySelector('.elements__img');
    const cardTitle = this._element.querySelector('.elements__title');
    //Rendering/actions/changes
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners(); 
    //Returning an upgraded element
    return this._element;
}

//Function that make certan like(in certain card) an aktive/default
_handleLikeToggle() {
    this._element.querySelector('.elements__like').classList.toggle('elements_like_aktive');
};

//Function that delete certain card. We need to put null this element, because this._element doesn't exist
_handleDeleteClosest() {
    this._element.remove();
    this._element = null;
}
} 

export {Card};
