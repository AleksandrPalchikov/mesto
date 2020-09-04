import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor({handleSubmitForm}, popupSelector){
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
    }

    //get all input values in empty object to send them via callback handleSubmitForm to create a newCard or rewright a onPage values
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        //right collected input values in a empty array
        this._inputList.forEach((input)=> {this._formValues[input.name] = input.value;
    }); 
        return this._formValues;
    }

    //Find form to have an Abillity to make a submit - cll callback tosend all input values 
    setEventListeners(){
        const anyPopupSubmitForm = this._popup.querySelector('.popup__form');
        anyPopupSubmitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
        super._setEventListeners();
    }

    close(){
        //it work without - "Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться"
        super.close();
} 


}

export {PopupWithForm};