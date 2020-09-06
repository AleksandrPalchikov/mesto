//Insert cards from Array and AddCardPopup in containerSelector
class Section {
    constructor({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
    }

    redererItem(){
        this._renderedItems.forEach((item) => this._renderer(item));
        console.log('render');
    }

    addItem(cardElement){
        this._containerSelector.prepend(cardElement);
    }
}

export {Section};