import AbstractView from "./abstract-view";
import {getPublishDateString} from "../utils/date";
import {getFormattedPrice, getMergedAddress, getFilteredEntries} from "../utils/utils";
import {adaptFilterName, adaptFilterValue} from "../utils/product-adapters";

const RatingClass = {
  GOOD: `seller--good`,
  BAD: `seller--bad`,
};

const RATING_GOOD = 4.8;
const RATING_BAD = 4;

const getRatingClass = (rating) => {
  if (rating >= RATING_GOOD) {
    return RatingClass.GOOD;
  } else if (rating < RATING_BAD) {
    return RatingClass.BAD;
  }
  return ``;
};

const createCharsMarkup = (category, chars) => {
  return getFilteredEntries(chars).map(([key, value]) => {
    return (/* html */`
      <li class="chars__item">
        <div class="chars__name">${adaptFilterName(category, key)}</div>
        <div class="chars__value">${adaptFilterValue(category, value)}</div>
      </li>
  `);
  }).join(`\n`);
};


const createProductCardFullTemplate = (product) => {
  const {name, price, address, publishDate, description, seller, category, filters, isFavorite} = product;
  const {city, street, building} = address;
  const {fullname, rating} = seller;

  const formattedPrice = getFormattedPrice(price);
  const formattedDate = getPublishDateString(publishDate);
  const formattedAddress = getMergedAddress(city, street, building);
  const ratingCLass = getRatingClass(rating);
  const charsMarkup = createCharsMarkup(category, filters);
  const favoriteButtonChecked = isFavorite ? `fav-add--checked` : ``;


  return /* html */`
    <section class="popup" style="display: block;">
      <div class="popup__inner">
        <button class="popup__close" type="button" aria-label="Закрыть">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z" />
          </svg>
        </button>
        <div class="popup__date">${formattedDate}</div>
        <h3 class="popup__title">${name}</h3>
        <div class="popup__price">${formattedPrice} ₽</div>
        <div class="popup__columns">
          <div class="popup__left">
            <div class="popup__gallery gallery">
              <button class="gallery__favourite fav-add ${favoriteButtonChecked}">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
                    stroke="white" stroke-width="2" stroke-linejoin="round" />
                </svg>
              </button>
              <div class="gallery__main-pic">
                <img src="img/car-big.jpg" srcset="img/car-big-2x.jpg 2x" width="520" height="340"
                  alt="Ford Mustang 2020">
              </div>
              <ul class="gallery__list">
                <li class="gallery__item gallery__item--active">
                  <img src="img/car1.jpg" srcset="img/car1-2x.jpg 2x" alt="Ford Mustang 2020" width="124" height="80">
                </li>
                <li class="gallery__item">
                  <img src="img/car2.jpg" srcset="img/car2-2x.jpg 2x" alt="Ford Mustang 2020" width="124" height="80">
                </li>
                <li class="gallery__item">
                  <img src="img/car3.jpg" srcset="img/car3-2x.jpg 2x" alt="Ford Mustang 2020" width="124" height="80">
                </li>
                <li class="gallery__item">
                  <img src="img/car4.jpg" srcset="img/car4-2x.jpg 2x" alt="Ford Mustang 2020" width="124" height="80">
                </li>
                <li class="gallery__item">
                  <img src="img/car5.jpg" srcset="img/car5-2x.jpg 2x" alt="Ford Mustang 2020" width="124" height="80">
                </li>
              </ul>
            </div>
            <ul class="popup__chars chars">
              ${charsMarkup}
            </ul>
            <div class="popup__seller seller ${ratingCLass}">
              <h3>Продавец</h3>
              <div class="seller__inner">
                <a class="seller__name">${fullname}</a>
                <div class="seller__rating"><span>${rating}</span></div>
              </div>
            </div>
            <div class="popup__description">
              <h3>Описание товара</h3>
              <p>${description}</p>
            </div>
          </div>
          <div class="popup__right">
            <div class="popup__map">
              <img src="img/map.jpg" width="268" height="180" alt="${formattedAddress}">
            </div>
            <div class="popup__address">${formattedAddress}</div>
          </div>
        </div>
      </div>
    </section>
    `;
};

export default class ProductCardFullView extends AbstractView {
  constructor(product) {
    super();

    this._product = product;

    this._favoriteButtonClickHandler = null;
    this._cardCloseClickHandler = null;
  }

  getTemplate() {
    return createProductCardFullTemplate(this._product);
  }

  setFavoriteButtonClickHandler(handler) {
    this._favoriteButtonClickHandler = handler;
    this.getElement().querySelector(`.gallery__favourite`).addEventListener(`click`, this._favoriteButtonClickHandler);
  }

  setCardCloseClickHandler(handler) {
    this._cardCloseClickHandler = handler;

    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.closest(`.popup__inner`) || evt.target.closest(`.popup__close`)) {
        this._cardCloseClickHandler();
      }
    });
  }
}
