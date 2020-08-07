const popupClassesObject = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'
};


const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage; // Insertion of autoText in mistake block.
} 

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.TextContent = "";
} 

const checkInputValidity = (formElement, inputElement, {...rest}) => {
    // checkFunction - if INPUT is not valid IT should be added error classes for INPUT and opacity property for mistakblock.
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest); 
    } else {
        hideInputError(formElement, inputElement, rest);
    } 
}

//"validityCheckFunction" - is some element is not valid...
const isFormInValid = (inputs) => {
    return inputs.some((inputElement) => !inputElement.validity.valid); 
}


const toggleButtonState = (inputs, submitButtons, {inactiveButtonClass, ...rest}) => {
    // It was checked all inputElements via isFormValid. 
    //Depending on the isFormInValid function it will be add or remove inactive class(CSS) + disabled label for SUBMITBUTTON
    if (isFormInValid(inputs)) {
        submitButtons.classList.add(inactiveButtonClass);
        submitButtons.disabled = true;
    } else {
        submitButtons.classList.remove(inactiveButtonClass);
        submitButtons.disabled = false;
    }
}

const setEventListenersOnInputs = (formElement,{inputSelector, submitButtonSelector, ...rest}) => {
    //Inside the CURRENT FORM we have found all INPUTS. It was created massive from this inputs: [input, input]
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    //SUBMIT BUTTON determination inside the Form in "lockal area"
    const submitButtons = formElement.querySelector(submitButtonSelector);
     //Check before the Input will activate
    toggleButtonState(inputs, submitButtons, rest);
    //For each INPUT we should to check his validity to understand,
    //need we display an error message below the INPUT or not. we make this via AddEventListener
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {
        checkInputValidity(formElement, inputElement, rest);
        toggleButtonState(inputs, submitButtons, rest);
        });
    });
}

const enableValidation = ({formSelector, ...rest}) => {
    // All forms in HTML we have found. It was created an array [form,form,form]
    const forms = Array.from(document.querySelectorAll(formSelector));
    // For each form we have decline a default value via addEventListener
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();    
        });
    setEventListenersOnInputs(formElement, rest);
});
}

enableValidation(popupClassesObject);

//FormReset
function  popupFormReset(anyModal, {formSelector, inputSelector, submitButtonSelector, ...rest}){
    //Variables for concrete Popup
    const concretePopupForm =  anyModal.querySelector(formSelector);
    const concreteInputsFormList = Array.from(concretePopupForm.querySelectorAll(inputSelector));
    const concreteInputButton = concretePopupForm.querySelector(submitButtonSelector);
    //Reset form, but it schould be current value, but not the initial one.
    concretePopupForm.reset();
    // After reset we schould to insert current values from header into popup one more time.
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    //Check all buttons and inputs after close popup to hide errors.
    concreteInputsFormList.forEach((concreteInputsFormListElement) => {
    hideInputError(concretePopupForm, concreteInputsFormListElement, rest);
    toggleButtonState(concreteInputsFormList, concreteInputButton, rest);
    });
} 