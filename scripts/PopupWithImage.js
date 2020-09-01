import {Popup} from './Popup.js';
import {
    popupBigImg,
    popupBigImgFigCapture
} from './constants.js';


class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    //Method- values for 3rd Popup. Take image from card and putt it in ImgPopup
    open(cardData){
        popupBigImg.src = cardData.link;
        popupBigImg.alt = cardData.name;
        popupBigImgFigCapture.textContent = cardData.subscription;
        console.log(cardData);
        console.log('click');
        super.open();
    }
}

export{PopupWithImage};