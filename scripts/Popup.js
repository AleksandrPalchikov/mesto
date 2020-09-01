class Popup{
    constructor(popupSelector){
        this._popup = popupSelector;
    }

    open(){
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('mouseup', () => this._handleOverlayClose()); 
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._setEventListeners();
    }

    close(){
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('mouseup', () => this._handleOverlayClose());
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')) {
            this.close(this._popup);
    }
}

    _handleOverlayClose(evt){
        const popupEditForm = this._popup.querySelector('.popup__form');
        console.log(popupEditForm)
        /*const popupBigImg = popupOpenBigImg.querySelector('.popup__img');*/ //!!!!!!!!!!!!!!!!
    if (this._popup.classList.contains('popup_opened' && popupEditForm)){
        this.close(this._popup);
    }
}

    _setEventListeners(){
        const anyPopupCloseButton = this._popup.querySelector('.popup__close-button');
        anyPopupCloseButton.addEventListener('click', () => {
        this.close(this._popup);
    });
}
}

export {Popup};