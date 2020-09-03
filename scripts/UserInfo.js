import {
profileName,
profileJob,
popupTypeEdit,
inputName,
inputJob
} from './constants.js';

//Wright new inputs values - we get new values via callback handleSubmitForm function from callEditForm class
class UserInfo {
    constructor({userName, userDescription}){
        this._userName = userName; //input value - name
        this._userDescription = userDescription; //input value - job
    }
    //return previous values from WebPage
    getUserInfo(){
        if (popupTypeEdit.classList.contains('popup_opened')){
            //Take an exsiting values of profile;
            inputName.value = profileName.textContent;
            inputJob.value  = profileJob.textContent; 
            }
    }
    //write values from inputs to webpage
    setUserInfo(){
        profileName.textContent = this._userName;
        profileJob.textContent = this._userDescription;
    }
}


export{UserInfo};