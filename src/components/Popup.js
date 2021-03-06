class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._popup.addEventListener("mouseup", () => this._handleOverlayClose());
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("mouseup", () =>
      this._handleOverlayClose()
    );
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (
      evt.key === "Escape" &&
      this._popup.classList.contains("popup_opened")
    ) {
      this.close();
    }
  }

  _handleOverlayClose() {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const anyPopupCloseButton = this._popup.querySelector(
      ".popup__close-button"
    );
    anyPopupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export { Popup };
