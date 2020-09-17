import { Popup } from "./Popup.js";

class PopupWithSubmitDel extends Popup {
  constructor(/*handleSubmitCallback*/ popupSelector) {
    super(popupSelector);
    /* this._handleSubmitCallback = handleSubmitCallback; */
  }

  setSubmitAction(submitActon) {
    this._setEventListeners();
    this._handleSubmitCallback = submitActon;

    // В рамках данной работы единственное действие где подтверждение нужно - удаление карточки.
    //Но удалять мы будем каждый раз разные карточки. Поэтому должна быть возможность при открытии
    //попапа переопределять через публичный метод то действие, которое нужно выполнить при нажатии на кнопку.
    //В данной проектной "переопределяемое" действие будет отличаться только тем, какой айдишник мы
    //используем для удаления внутри метода. этот попап вы открываете только в одном случае - нажатие
    //на кнопку удаления карточки. соответственно и переопределять выполняемую функцию надо только после
    // нажатия на кнопку удаления (перед непосредственным открытием попапа)
  }

  _setEventListeners() {
    const anyPopupSubmitForm = this._popup.querySelector(".popup__form");
    anyPopupSubmitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      /*  this._handleSubmitCallback(); */
    });
    super.setEventListeners();
  }
}

export { PopupWithSubmitDel };
