import { Popup } from "./Popup.js";
import { popupBigImg, popupBigImgFigCapture } from "../utils/constants.js";
//via callbackFunction - take a CardData through open() from class Card and deliever/rewrite data from any card to ImgPopup.
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  //Method- values for 3rd Popup. Take image from card and put it in ImgPopup
  open(cardData) {
    popupBigImg.src = cardData.link;
    popupBigImg.alt = cardData.name;
    popupBigImgFigCapture.textContent = cardData.subscription;
    super.open();
  }
}

export { PopupWithImage };
