import { Popup } from "./Popup.js";

class PopupWithSubmitDel extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  setSubmitAction(submitActon) {
    this._handleDeleteFormSubmit = submitActon;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._formSubmit = this._popup.querySelector(".popup__form");
    this._formSubmit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteFormSubmit();
    });
  }
}

export { PopupWithSubmitDel };
