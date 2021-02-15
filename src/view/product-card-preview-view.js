import AbstractView from "./abstract-view";
import {getPublishDateDifference} from "../utils/date";
import {getFormattedPrice, getMergedAddress} from "../utils/utils";


const createProductCardPreviewTemplate = (product) => {
  const {name, price, address, publishDate, isFavorite} = product;
  const {city, street} = address;

  const cityAndStreet = getMergedAddress(city, street);
  const formattedPrice = getFormattedPrice(price);
  const formattedDate = getPublishDateDifference(publishDate);
  const favoriteButtonChecked = isFavorite ? `fav-add--checked` : ``;

  return /* html */`
    <li class="results__item product">
      <button class="product__favourite fav-add ${favoriteButtonChecked}" type="button" aria-label="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
            stroke="white" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="product__content">
        <h3 class="product__title">
          <a href="#">${name}</a>
        </h3>
        <div class="product__price">${formattedPrice} ₽</div>
        <div class="product__address">${cityAndStreet}</div>
        <div class="product__date">${formattedDate}</div>
      </div>
    </li>
    `;
};

export default class ProductCardPreviewView extends AbstractView {
  constructor(product) {
    super();

    this._product = product;

    this.callbacks = {
      favoriteButtonClick: null,
      cardOpenClick: null,
    };

    this.favoriteButtonClickHandler = this.favoriteButtonClickHandler.bind(this);
    this.cardImageClickHandler = this.cardImageClickHandler.bind(this);
    this.cardTitleClickHandler = this.cardTitleClickHandler.bind(this);
  }

  getTemplate() {
    return createProductCardPreviewTemplate(this._product);
  }

  getGalleryContainer() {
    return this.getElement();
  }


  // HANDLER SETTERS

  setFavoriteButtonClickHandler(callback) {
    this.callbacks.favoriteButtonClick = callback;
    this.getElement().querySelector(`.product__favourite`).addEventListener(`click`, this.favoriteButtonClickHandler);
  }

  setCardOpenClickHandler(handler) {
    this.callbacks.cardOpenClick = handler;
    this.getElement().addEventListener(`click`, this.cardImageClickHandler);
    this.getElement().addEventListener(`click`, this.cardTitleClickHandler);
  }


  // HANDLERS

  favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this.callbacks.favoriteButtonClick();
  }

  cardImageClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.closest(`.product__image`)) {
      this.callbacks.cardOpenClick();
    }
  }

  cardTitleClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.closest(`.product__title`)) {
      this.callbacks.cardOpenClick();
    }
  }

}
