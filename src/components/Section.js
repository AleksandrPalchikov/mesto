//Insert cards from Array and AddCardPopup in containerSelector
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cardsFromSerever = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  //Method to render a list of cards from initial Array
  renderInitialCards(cardsFromSerever) {
    cardsFromSerever.map((item) => {
      this._renderer(item);
    });
  }
  //Method to render a one Card from Input
  renderCardFromInputs(newCardInfo) {
    console.log(`NEW CARD InFO: ${newCardInfo}`);
    this._renderer(newCardInfo);
  }

  addItem(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}

export { Section };
