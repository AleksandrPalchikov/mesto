class Api {
  constructor(cardsFromServer) {
    this._baseUrl = cardsFromServer.baseUrl;
    this._headers = cardsFromServer.headers;
  }

  //Loading user info from Server
  loadingProfileInfoFromServer() {
    return fetch(this._baseUrl, {
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
    return fetch(this._baseUrl, {
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

  //Get Cards
  getInitialCards() {
    return fetch(this._baseUrl, {
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
    return fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
        likes: [],
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

  //_____________________________
  //Delete card from server

  removeCardFromServer(id) {
    /*   return fetch(this._baseUrl, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewCardOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    }); */
  }

  /* получить список всех карточек в виде массива (GET)
добавить карточку (POST)
удалить карточку (DELETE)
получить данные пользователя (GET)
заменить данные пользователя (PATCH)
заменить аватар (PATCH) */

  //Send New My Like on Server - "залайкать" карточку (PUT)
  putNewLikeonServer() {
    return fetch(this._baseUrl, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewCardOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }

  //Delete My like from server - удалить лайк карточки (DELETE)
  deleteMyLikeFromServer() {
    return fetch(this._baseUrl, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        console.log(`Today addNewCardOnServer works, Bro ${res.status}`);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
  }
}

export { Api };
