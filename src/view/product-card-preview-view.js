import AbstractView from "./abstract-view";
import {getPublishDateDifference} from "../utils/date";
import {getFormattedPrice, getMergedAddress} from "../utils/utils";

const MAX_PHOTO_COUNT = 5;

const createMorePhotoPlugMarkup = (count) => {
  return count > MAX_PHOTO_COUNT ? `<div class="product__image-more-photo hidden">+${count - MAX_PHOTO_COUNT} фото</div>` : ``;
};

const createProductCardPreviewTemplate = (product) => {
  const {name, price, address, publishDate, photos} = product;
  const {city, street} = address;

  const cityAndStreet = getMergedAddress(city, street);
  const formattedPrice = getFormattedPrice(price);
  const formattedDate = getPublishDateDifference(publishDate);
  const morePhotoPlugMarkup = createMorePhotoPlugMarkup(photos.length);

  return /* html */`
    <li class="results__item product">
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
            stroke="white" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="product__image">
        ${morePhotoPlugMarkup}
        <img src="${photos[0]}" width="318" height="220" alt=${name}>
        <div class="product__image-navigation">
          <span class="product__navigation-item product__navigation-item--active"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
        </div>
      </div>
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
  }

  getTemplate() {
    return createProductCardPreviewTemplate(this._product);
  }
}
