 class Section {
    constructor({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    }

    redererItem(){
        this._renderedItems.forEach((item) => this._renderer(item));
    }

    addItem(cardElement){
        this._containerSelector.prepend(cardElement);
    }
}

export {Section};