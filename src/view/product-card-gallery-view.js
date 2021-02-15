import {preloader} from "../utils/utils";
import AbstractView from "./abstract-view";

const ACTIVE_CLASS = `gallery__item--active`;

const createGalleryListMarkup = (name, photos, activePreview) => {
  return photos.map((photo, index) => {
    const activeClass = activePreview === index ? ACTIVE_CLASS : ``;
    return (/* html */`
      <li class="gallery__item ${activeClass}">
        <img src="${photo}" srcset="${photo}" alt="${name}" width="124" height="80" data-img-index="${index}">
      </li>
    `);
  }).join(`\n`);
};

const createProductCardGalleryTemplate = (product, currentImgIndex) => {
  const {name, photos} = product;

  const galleryListMarkup = createGalleryListMarkup(name, photos, currentImgIndex);
  const mainPhotoSrc = photos[currentImgIndex];

  return (/* html */`
    <section class="gallery__full">
      <div class="gallery__main-pic">
        <img src="${mainPhotoSrc}" srcset="${mainPhotoSrc}" width="520" height="340"
          alt="${name}">
      </div>
      <ul class="gallery__list">
        ${galleryListMarkup}
      </ul>
    </section>
  `);
};

export default class ProductCardGalleryView extends AbstractView {
  constructor(product) {
    super();

    this._product = product;
    this._currentImgIndex = 0;

    this._mainImage = this.getElement().querySelector(`.gallery__main-pic img`);

    this.galleryListClickHandler = this.galleryListClickHandler.bind(this);

    this.setGalleryListClickHandler();
  }

  getTemplate() {
    return createProductCardGalleryTemplate(this._product, this._currentImgIndex);
  }

  setGalleryListClickHandler() {
    this.getElement().querySelector(`.gallery__list`).addEventListener(`click`, this.galleryListClickHandler);
  }

  galleryListClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `IMG`) {
      return;
    }

    const galleryItems = this.getElement().querySelectorAll(`.gallery__item`);
    galleryItems.forEach((item) => item.classList.remove(`gallery__item--active`));

    this._currentImgIndex = evt.target.dataset.imgIndex;
    galleryItems[this._currentImgIndex].classList.add(`gallery__item--active`);

    const photo = this._product.photos[this._currentImgIndex];

    preloader(photo)
      .then(() => {
        this._mainImage.src = photo;
        this._mainImage.srcset = photo;
      });
  }
}
