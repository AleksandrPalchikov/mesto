const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_add-card');

const popupClassesObject = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'
};
    
class FormValidator {
    constructor(defaultFormConfig, formElement){
        this._formSelector = defaultFormConfig.formSelector;
        this._inputSelector = defaultFormConfig.inputSelector;
        this._submitButtonSelector = defaultFormConfig.submitButtonSelector;
        this._inactiveButtonClass = defaultFormConfig.inactiveButtonClass;
        this._inputErrorClass = defaultFormConfig.inputErrorClass;
        this._errorClass = defaultFormConfig.errorClass;
        this.formElement = formElement;
    }
    
    _showInputError(inputElement, errorMessage) {
        //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
        const errorElement =  this.formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use herequerySelectorAll? 
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage; // Insertion of autoText in mistake block. !!!
    } 
        
    _hideInputError(inputElement) {
        //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
        const errorElement =  this.formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.TextContent = "";
    }             
        
    _checkInputValidity(inputElement){
        // checkFunction - if INPUT is not valid IT should be added error classes for INPUT and opacity property for mistakblock.
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage); 
        } else {
            this._hideInputError(inputElement);
        } 
    }
        
    //"validityCheckFunction" - is some element is not valid...
    _isFormInValid(inputs) {
        return inputs.some((inputElement) => !inputElement.validity.valid); 
    }
        
    _popupButtonDisabled(submitButtons) {
        submitButtons.classList.add(this._inactiveButtonClass);
        submitButtons.disabled = true;
    }
        
    _popupButtonAktive(submitButtons) {
        submitButtons.classList.remove(this._inactiveButtonClass);
        submitButtons.disabled = false;
    }
        
    _toggleButtonState(inputs, submitButtons) {
        // It was checked all inputElements via isFormValid. 
        //Depending on the isFormInValid function it will be add or remove inactive class(CSS) + disabled label for    SUBMITBUTTON
        if (this._isFormInValid(inputs)) {
            this._popupButtonDisabled(submitButtons);
        } else {
            this._popupButtonAktive(submitButtons);
        }
    }
        
    _setEventListenersOnInputs() {
        //Inside the CURRENT FORM we have found all INPUTS. It was created massive from this inputs: [input, input]
        const inputs = Array.from(this.formElement.querySelectorAll(this._inputSelector));
        //SUBMIT BUTTON determination inside the Form in "lockal area"
        const submitButtons = this.formElement.querySelector(this._submitButtonSelector);
         //Check before the Input will activate
        this._toggleButtonState(inputs, submitButtons);
        //For each INPUT we should to check his validity to understand,
        //need we display an error message below the INPUT or not. we make this via AddEventListener
        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputs, submitButtons);
            });
        });
    }
        
    enableValidation(){
        // For each form we have decline a default value via addEventListener
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();    
            });
        this._setEventListenersOnInputs();
    }
        
    //FormReset
    popupFormReset(){
        //Variables for concrete Popup
        const concreteInputsFormList = Array.from(this.formElement.querySelectorAll(this._inputSelector));
        const concreteInputButton = this.formElement.querySelector(this._submitButtonSelector);
        
        //Reset form in this:formElement, but it schould be current value, but not the initial one.
        this.formElement.querySelector(this._formSelector).reset();
        //Check all buttons and inputs after close popup to hide errors.  
        concreteInputsFormList.forEach((concreteInputsFormListElement) => {
            this._hideInputError(concreteInputsFormListElement);
            this._toggleButtonState(concreteInputsFormList, concreteInputButton);
            });
        } 
}

    /* popupTypeEdit, popupTypeNewCard */
    const editFormValidator = new FormValidator(popupClassesObject, popupTypeEdit);
    editFormValidator.enableValidation();
    
    const cardFormValidator = new FormValidator(popupClassesObject, popupTypeNewCard);
    cardFormValidator.enableValidation();