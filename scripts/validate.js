const initialObject = {
    formSelector: '.popup__form', //I have in a JS.Script
    inputSelector: '.popup__input', //I have in a JS.Script
    submitButtonSelector: '.popup__submit-button', //I have in a JS.Script
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error',  //I have created a CSS property
    errorClass: 'popup__error_visible'
};
//-----------0
//Tgis function work together wis HTML properties such as min-length, required and with types='email/text/url'
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    

//------------------------1
    // All forms in HTML we have found. It was created an array [form,form,form]
    const forms = Array.from(document.querySelectorAll(formSelector));
    // For each form we have decline a default value via addEventListener
    forms.forEach((formElement) => {
        formElement.addEventListener('submit',  (evt) => {
            evt.preventDefault();    
        });


        //----------------------------------------------2
        //Inside the CURRENT FORM we have found all INPUTS. It was created massive from this inputs: [input, input]
        const inputs = Array.from(formElement.querySelectorAll(inputSelector));
        //For each INPUT we should to check his validity to understand,
        //need we display an error message below the INPUT or not. we make this via AddEventListener
        inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {

        
            // inside the INPUT - errorElement was founded via ID of (INPUT + "error").
            const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); //Why i cannot use here querySelectorAll? 
            
            //const showInputError = (formElement, inputElement,)!!!
            // checkFunction - if INPUT is not valid IT should be added error classes for INPUT and opacity property for mistake block.
            if (!inputElement.validity.valid) {
                inputElement.classList.add(inputErrorClass);
                errorElement.classList.add(errorClass);
                errorElement.textContent = inputElement.validationMessage; // Insertion of autoText in mistake block.
            } else {
                //const hideInputError =() !!!
                inputElement.classList.remove(inputErrorClass);
                errorElement.classList.remove(errorClass);
                errorElement.TextContent = "";
            }

            //SUBMIT BUTTON determination inside the Form in "lockal area"
            const submitButtons = formElement.querySelector(submitButtonSelector);
            //"validityCheckFunction" - is some element is not valid...
            const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);    //const checkInputValidity !!!
    
            // It was checked all inputElements via isFormValid. 
            //Depending on the isFormValid function it will be add or remove inactive class(CSS) + disabled label for SUBMITBUTTON
            if (isFormValid) {
                submitButtons.classList.add(inactiveButtonClass);
                submitButtons.disabled = true;
            } else {
                submitButtons.classList.remove(inactiveButtonClass);
                submitButtons.disabled = false;
            }


        });
    });
//----------------------------------------------2





    });
//------------------------1


};
//-----------0

enableValidation(initialObject);







/*const setEventListeners

const hasInvalidInput

const toggleButtonState
const enableValidation
const fieldsetList*/
