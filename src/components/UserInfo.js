//Wright new inputs values - we get new values via callback handleSubmitForm function from callEditForm class
class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}){
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }

    //return previous values from WebPage
    getUserInfo(){
            //Take an exsiting values of profile and create an object {userName:..., userDescription:...} to call from
            //this object a values through getUserInfo().userName and getUserInfo().userDescription to fill the inputs
            return {
            userName: this._userName.textContent,
            userDescription: this._userDescription.textContent
        }
    }
    
    //write values from inputs to webpage
    setUserInfo(name, job){
        this._userName.textContent = name;
        this._userDescription.textContent = job;
    } 
}

export{UserInfo};