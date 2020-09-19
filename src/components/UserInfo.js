//Wright new inputs values - we get new values via callback handleSubmitForm function from callEditForm class
class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector); //NEW
  }

  getAndSetUserInfoFromServer(lastProfileValuesFromServer) {
    //NEU
    this._userName.textContent = lastProfileValuesFromServer.name;
    this._userDescription.textContent = lastProfileValuesFromServer.about;
    this._userAvatar.style.backgroundImage = `url(${lastProfileValuesFromServer.avatar})`;
  }
  //return previous values from WebPage in inputs
  getUserInfo() {
    //Take an exsiting values of profile and create an object {userName:..., userDescription:...} to call from
    //this object a values through getUserInfo().userName and getUserInfo().userDescription to fill the inputs
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  //write values from inputs to Webpage
  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userDescription.textContent = job;
    //send name and job on server
  }

  setNewAvatarOnPage(avatar) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
}

export { UserInfo };
