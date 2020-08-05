const initialObject = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  
    errorClass: 'popup__error_visible'
};

//Declaration ok keys to use properties like variable
let {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = initialObject;

const showInputError = (formElement, inputElement, errorMessage) => {
    //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage; // Insertion of autoText in mistake block.
} 

const hideInputError = (formElement, inputElement) => {
    //inside the INPUT - errorElement was founded via ID of (INPUT + "error").
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.TextContent = "";
} 

const checkInputValidity = (formElement, inputElement) => {
    // checkFunction - if INPUT is not valid IT should be added error classes for INPUT and opacity property for mistakblock.
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage); 
    } else {
        hideInputError(formElement, inputElement);
    } 
}

const setEventListenersOnInputs = (formElement) => {
    //Inside the CURRENT FORM we have found all INPUTS. It was created massive from this inputs: [input, input]
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    //SUBMIT BUTTON determination inside the Form in "lockal area"
    const submitButtons = formElement.querySelector(submitButtonSelector);
     //Check before the Input will activate
    toggleButtonState(inputs, submitButtons);
    //For each INPUT we should to check his validity to understand,
    //need we display an error message below the INPUT or not. we make this via AddEventListener
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputs, submitButtons);
        });
    });
}

//"validityCheckFunction" - is some element is not valid...
const isFormInValid = (inputs) => {
    return inputs.some((inputElement) => !inputElement.validity.valid); 
} 

const toggleButtonState = (inputs, submitButtons) => {
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

const enableValidationSubmit = () => {
    // All forms in HTML we have found. It was created an array [form,form,form]
    const forms = Array.from(document.querySelectorAll(formSelector));
    // For each form we have decline a default value via addEventListener
    forms.forEach((formElement) => {
        formElement.addEventListener('submit',  (evt) => {
            evt.preventDefault();    
        });
    setEventListenersOnInputs(formElement);
});
}

enableValidationSubmit();