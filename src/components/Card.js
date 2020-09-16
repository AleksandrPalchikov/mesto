//gives life to the Card. Make the Card live:)
class Card {
  constructor(
    {
      data,
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

    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likeData = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id; //Prove it // Owner of Card NEU to delete the trash element
  }

  // set Listeners inside the every card from Template or for NewCard
  _setEventListeners() {
    const cardLikeButton = this._element.querySelector(".elements__like");
    const cardDeliteButton = this._element.querySelector(".elements__trash");
    const cardImage = this._element.querySelector(".elements__img");

    //For every card - Like/Delete Button is ative
    cardLikeButton.addEventListener("click", () => {
      this._isLiked();
    });
    cardDeliteButton.addEventListener("click", () => {
      this._handleDeleteClosest();
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
    const numberOfLikes = this._element.querySelector(".elements__like-number");
    const trashElementOfCard = this._element.querySelector(".elements__trash");
    console.log(trashElementOfCard);
    //Rendering/actions/changes
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._drawInitialLikes(numberOfLikes);
    this._setEventListeners();

    //hiden th trash element of card, that wasn't createn dy me
    //NEU
    //Work
    if (this._ownerId !== "fd6926d50c516142275b0660") {
      trashElementOfCard.classList.add("elements__trash-hidden"); //.popup-trash-element-hidden{visibility: hidden}
    } else {
      //hidden element
    }

    //Returning an upgraded element
    return this._element;
  }

  _drawInitialLikes(numberOfLikes) {
    const cardLikeButton = this._element.querySelector(".elements__like");

    //draw the likes from Serever
    if (this._likeData) {
      numberOfLikes.textContent = this._likeData.length; //NEU
    } else {
      numberOfLikes.textContent = [].length; //NEU
    }

    const isLikedBoolean = this._likeData.some((person) => {
      console.log(person._id);
      return person._id === "fd6926d50c516142275b0660";
    });
    console.log(isLikedBoolean); //(everytime - False)
    if (isLikedBoolean) {
      cardLikeButton.classList.add("elements_like_aktive");
    } else {
      cardLikeButton.classList.remove("elements_like_aktive");
    }
  }

  putLike(updatedCardInfo) {
    //Update Server and Draw new Value
    const cardLikeButton = this._element.querySelector(".elements__like");
    const numberOfLikes = this._element.querySelector(".elements__like-number");
    numberOfLikes.textContent = updatedCardInfo.likes.length;
    cardLikeButton.classList.add("elements_like_aktive");
    //Info from Server after put like
  }

  deleteLike(updatedCardInfo) {
    //Update Server and Draw new Value
    const cardLikeButton = this._element.querySelector(".elements__like");
    const numberOfLikes = this._element.querySelector(".elements__like-number");
    numberOfLikes.textContent = updatedCardInfo.likes.length;
    cardLikeButton.classList.remove("elements_like_aktive");
    //Info from Server after delete like
  }

  _isLiked() {
    //Click on like
    const isLikedBoolean = this._data.likes.some((person) => {
      return person._id === "fd6926d50c516142275b0660";
    });

    console.log(isLikedBoolean);

    if (isLikedBoolean) {
      this._handleDeleteLikeClick(this._cardId);
      //DELETE FROM SERVER  - in CallBack to Delete
    } else {
      this._handleLikeClick(this._cardId);
      //Put on SERVER  - in CallBack to PUT on server
    }
  }

  //Function that delete certain card. We need to put null this element, because this._element doesn't exist
  _handleDeleteClosest() {
    document.querySelector(".popup").classList.add(".popup_type_delete-card");
    this._element.remove();
    this._element = null;
  }
}

export { Card };
