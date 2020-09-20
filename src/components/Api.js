class Api {
  constructor(cardsFromServer) {
    this._baseUrl = cardsFromServer.baseUrl;
    this._headers = cardsFromServer.headers;
  }

  //Loading user info from Server
  loadingProfileInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(
          `Today loadingProfileInfoFromServer works, Bro ${res.status}`
        );
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  //Patch updated user info on Server
  addNewProfileInfoOnServer(formData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.job,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewCardOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  getAllNeededData() {
    return Promise.all([
      this.loadingProfileInfoFromServer(),
      this.getInitialCards(),
    ]);
  }

  //Add New Avatar on Server via url:
  addNewAvatarOnServer(formDataAvatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: formDataAvatarLink, ///here will be url
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewAvatarOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(
          `Что-то пошло не так - addNewAvatarOnServer: ${res.status}`
        );
      }
    });
  }

  //Get Cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today getInitialCards works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }
  //Add New Card
  addNewCardOnServer(formData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: formData.link,
        name: formData.name,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewCardOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  removeCardFromServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today removeCardFromServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  //Send New My Like on Server - "залайкать" карточку (PUT)
  putNewLikeonServer(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today putNewLikeonServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  //Delete My like from server - удалить лайк карточки (DELETE)
  deleteMyLikeFromServer(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today deleteMyLikeFromServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }
}

export { Api };
