//gives life to the Card. Make the Card live:)
class Card {
  constructor(
    {
      data,
      profileData,
      handleCardclick,
      handleLikeClick,
      handleDeleteLikeClick,
      handleDeleteIconClick,
    },
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._handleCardclick = handleCardclick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._profileData = profileData;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likeData = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id; //Prove it // Owner of Card NEU to delete the trash element
    /*this._myID =  */
  }

  // set Listeners inside the every card from Template or for NewCard
  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".elements__like");
    const cardDeliteButton = this._element.querySelector(".elements__trash");
    const cardImage = this._element.querySelector(".elements__img");

    //For every card - Like/Delete Button is ative
    cardLikeButton.addEventListener("click", () => {
      this._putOrDeleteLike();
    });
    cardDeliteButton.addEventListener("click", () => {
      //just to transfer id in API area
      this._handleDeleteIconClick(this._cardId);
    });

    //Image like button or image Popup
    cardImage.addEventListener("click", () => {
      this._handleCardclick({
        name: cardImage.alt,
        link: cardImage.src,
        subscription: this._element.querySelector(".elements__title")
          .textContent,
      });
    });
  }

  //Get template from HTML. Now we can get different template thanks to _cardDelector. We just can change class in a render class
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector) //!
      .content.querySelector(".elements__element");
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  // Rewhriting values from InitialCard(dataBank) or from NewCard inputs into Template
  generateCard() {
    this._element = this._getTemplate();
    //All indsides from template we wan to make actions
    const cardImage = this._element.querySelector(".elements__img");
    const cardTitle = this._element.querySelector(".elements__title");
    const trashElementOfCard = this._element.querySelector(".elements__trash");
    //Rendering/actions/changes
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    this.updateLikesArea(this._likeData);
    this._deleteButtonVisibility(); //hiden th trash element of card, that wasn't createn dy me
    return this._element; //Returning an upgraded element
  }

  //Make visible trash button JUST for my cards
  _deleteButtonVisibility() {
    const trashElementOfCard = this._element.querySelector(".elements__trash");
    if (this._ownerId !== this._profileData._id) {
      trashElementOfCard.classList.add("elements__trash-hidden");
    }
  }

  //override value of LIKE. Hier Like Array is changing and Mew render is making with new values
  updateLikesArea(someLikeArray) {
    this._isLiked = someLikeArray.some((person) => {
      return person._id === this._profileData._id;
    });
    this._renderLikesNumber(someLikeArray.length);
    this._renderLikeBtn(this._isLiked);
  }

  _renderLikesNumber(arrayLength) {
    //To Draw the cards
    const numberOfLikes = this._element.querySelector(".elements__like-number");
    numberOfLikes.textContent = arrayLength;
  }

  _renderLikeBtn(isLiked) {
    const cardLikeButton = this._element.querySelector(".elements__like");
    if (isLiked) {
      cardLikeButton.classList.add("elements_like_aktive");
    } else {
      cardLikeButton.classList.remove("elements_like_aktive");
      /* this._isLiked = !this._isLiked; */
    }
  }

  //Call differend Methods Depending on the like status
  _putOrDeleteLike() {
    if (this._isLiked) {
      this._handleDeleteLikeClick(this._cardId);
    } else {
      this._handleLikeClick(this._cardId);
    }
  }

  //Function that delete certain card. We need to put null this element, because this._element doesn't exist
  handleDeleteClosest() {
    this._element.remove();
  }
}

export { Card };
