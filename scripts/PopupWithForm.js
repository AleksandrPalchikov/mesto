import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, callbackOfsubmitForm){
        super(popupSelector);
        this._callBackOfsubmitForm = callbackOfsubmitForm;
    }

    _getInputValues(){
       /* собирает данные всех полей формы */
    }

    _setEventListeners(){
       /* должен не только добавлять обработчик клика иконке закрытия, 
       но и добавлять обработчик сабмита формы. */
        super._setEventListeners();
    }

    close(){
        super.close();
        /*Перезаписывает родительский метод close, так как при закрытии 
        попапа форма должна ещё и сбрасываться */
    }
}

export {PopupWithForm};