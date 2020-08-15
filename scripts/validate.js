const popupClassesObject = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'
};



    class FormValidator {
        constructor({formSelector,inputSelector,submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
            this._formSelector = formSelector;
            this._inputSelector = inputSelector;
            this._submitButtonSelector = submitButtonSelector;
            this._inactiveButtonClass = inactiveButtonClass;
            this._inputErrorClass = inputErrorClass;
            this._errorClass = errorClass;
            this.formElement = formElement;
        }

    _showInputError(inputElement, errorMessage) {
                //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
                const errorElement =  this.formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
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

    _checkInputValidity(inputElement) {
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
                //Depending on the isFormInValid function it will be add or remove inactive class(CSS) + disabled label for SUBMITBUTTON
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
                this.formElement.addEventListener('submit', (evt) => {
                    evt.preventDefault();    
                    });
                this._setEventListenersOnInputs();
            }

            //FormReset
            popupFormReset(anyModal){
                //Variables for concrete Popup
                const concretePopupForm =  anyModal.querySelector(this.formSelector);
                const concreteInputsFormList = Array.from(concretePopupForm.querySelectorAll(this._inputSelector));
                const concreteInputButton = concretePopupForm.querySelector(this._submitButtonSelector);
                //Reset form, but it schould be current value, but not the initial one.
                concretePopupForm.reset(); 
                //After reset we schould to insert current values from Profile into ProfileEditPopup one more time.
                inputsValuesInProfile();
                //Check all buttons and inputs after close popup to hide errors.  
                concreteInputsFormList.forEach((concreteInputsFormListElement) => {
                    this._hideInputError(concreteInputsFormListElement); //was deleted concretePopupForm!!!
                    this._toggleButtonState(concreteInputButton); //was deleted concretePopupForm!!!
                    });
                } 
        }

    createFormValidator = ({formSelector, ...rest}) => {
        // All forms in HTML we have found. It was created an array [form,form,form]
        const forms = Array.from(document.querySelectorAll(formSelector));
        // For each form we have decline a default value via addEventListener
        forms.forEach((formElement) => {
        const formValidator  = new FormValidator(rest, formElement);
        formValidator.enableValidation();   
        formValidator.popupFormReset(anyModal);
        
        /*formValidator.popupFormReset(anyModal); */
    });
    }

    createFormValidator(popupClassesObject);



            //const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
            //     //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
            //     const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
            //     inputElement.classList.add(inputErrorClass);
            //     errorElement.classList.add(errorClass);
            //     errorElement.textContent = errorMessage; // Insertion of autoText in mistake block.
            // } 
            
            // const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
            //     //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
            //     const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
            //     inputElement.classList.remove(inputErrorClass);
            //     errorElement.classList.remove(errorClass);
            //     errorElement.TextContent = "";
            // } 
            
            // const checkInputValidity = (formElement, inputElement, {...rest}) => {
            //     // checkFunction - if INPUT is not valid IT should be added error classes for INPUT and opacity property for mistakblock.
            //     if (!inputElement.validity.valid) {
            //         showInputError(formElement, inputElement, inputElement.validationMessage, rest); 
            //     } else {
            //         hideInputError(formElement, inputElement, rest);
            //     } 
            // }
            
            // //"validityCheckFunction" - is some element is not valid...
            // const isFormInValid = (inputs) => {
            //     return inputs.some((inputElement) => !inputElement.validity.valid); 
            // }
            
            // const popupButtonDisabled = (submitButtons, {inactiveButtonClass, ...rest}) => {
            //     submitButtons.classList.add(inactiveButtonClass);
            //     submitButtons.disabled = true;
            // }
            
            // const popupButtonAktive = (submitButtons, {inactiveButtonClass, ...rest}) => {
            //     submitButtons.classList.remove(inactiveButtonClass);
            //     submitButtons.disabled = false;
            // }
            
            // const toggleButtonState = (inputs, submitButtons, {...rest}) => {
            //     // It was checked all inputElements via isFormValid. 
            //     //Depending on the isFormInValid function it will be add or remove inactive class(CSS) + disabled label for SUBMITBUTTON
            //     if (isFormInValid(inputs)) {
            //         popupButtonDisabled(submitButtons, rest);
            //     } else {
            //         popupButtonAktive(submitButtons, rest);
            //     }
            // }
            
            // const setEventListenersOnInputs = (formElement,{inputSelector, submitButtonSelector, ...rest}) => {
            //     //Inside the CURRENT FORM we have found all INPUTS. It was created massive from this inputs: [input, input]
            //     const inputs = Array.from(formElement.querySelectorAll(inputSelector));
            //     //SUBMIT BUTTON determination inside the Form in "lockal area"
            //     const submitButtons = formElement.querySelector(submitButtonSelector);
            //      //Check before the Input will activate
            //     toggleButtonState(inputs, submitButtons, rest);
            //     //For each INPUT we should to check his validity to understand,
            //     //need we display an error message below the INPUT or not. we make this via AddEventListener
            //     inputs.forEach((inputElement) => {
            //         inputElement.addEventListener('input', (evt) => {
            //         checkInputValidity(formElement, inputElement, rest);
            //         toggleButtonState(inputs, submitButtons, rest);
            //         });
            //     });
            // }
            
            // const enableValidation = ({formSelector, ...rest}) => {
            //     // All forms in HTML we have found. It was created an array [form,form,form]
            //     const forms = Array.from(document.querySelectorAll(formSelector));
            //     // For each form we have decline a default value via addEventListener
            //     forms.forEach((formElement) => {
            //         formElement.addEventListener('submit', (evt) => {
            //             evt.preventDefault();    
            //         });
            //     setEventListenersOnInputs(formElement, rest);
            // });
            // }
            // enableValidation(popupClassesObject);
            
            // //FormReset
            // function  popupFormReset(anyModal, {formSelector, inputSelector, submitButtonSelector, ...rest}){
            //     //Variables for concrete Popup
            //     const concretePopupForm =  anyModal.querySelector(formSelector);
            //     const concreteInputsFormList = Array.from(concretePopupForm.querySelectorAll(inputSelector));
            //     const concreteInputButton = concretePopupForm.querySelector(submitButtonSelector);
            //     //Reset form, but it schould be current value, but not the initial one.
            //     concretePopupForm.reset(); 
            //     //After reset we schould to insert current values from Profile into ProfileEditPopup one more time.
            //     inputsValuesInProfile ();
            //     //Check all buttons and inputs after close popup to hide errors.  
            //     concreteInputsFormList.forEach((concreteInputsFormListElement) => {
            //         hideInputError(concretePopupForm, concreteInputsFormListElement, rest);
            //         toggleButtonState(concreteInputsFormList, concreteInputButton, rest);
            //         });
            //     } 