//Insert cards from Array and AddCardPopup in containerSelector
class Section {
    constructor({items, renderer}, containerSelector){
    this._initialCards = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
    }
    //Method to render a list of cards from initial Array
    renderInitialCards(){
        this._initialCards.forEach((item) => this._renderer(item));
    }
    //Method to render a one Card from Input
    renderCardFromInputs(formData){
        this._renderer(formData);
    }

    addItem(cardElement){
        this._containerSelector.prepend(cardElement);
    }
}

export {Section};