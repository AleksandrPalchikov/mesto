import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  //get all input values in empty object to send them via callback handleSubmitForm to create a newCard or rewright a onPage values
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    //right collected input values in a empty array
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _changeTheLoadButtonTitle() {
    this._popup.querySelector(".popup__submit-button").textContent =
      "Сохранение...";
  }

  returnNameOnSubmitButton() {
    this._popup.querySelector(".popup__submit-button").textContent =
      "Сохранить";
  }

  //Find form to have an Abillity to make a submit - cll callback tosend all input values
  setEventListeners() {
    const anyPopupSubmitForm = this._popup.querySelector(".popup__form");
    anyPopupSubmitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._changeTheLoadButtonTitle();
      /*submitButtonCard.textContent = "Сохранение..."; */
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export { PopupWithForm };
