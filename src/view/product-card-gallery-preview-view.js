import AbstractView from "./abstract-view";


const MAX_PHOTO_COUNT = 5;

const createMoreImagePlugMarkup = (count) => {
  return count > MAX_PHOTO_COUNT ? `<div class="product__image-more-photo hidden">+${count - MAX_PHOTO_COUNT} фото</div>` : ``;
};

const createImageNavigationMarkup = (photos) => {
  return photos.map((_, index) => {
    return (/* html */`
      <div class="product__navigation-column" data-img-index="${index}">
        <span class="product__navigation-item"></span>
      </div>
    `);
  }).join(`\n`);
};

const createProductCardGalleryPreviewTemplate = (product) => {

  const {name, photos} = product;

  const imageNavigationMarkup = createImageNavigationMarkup(photos.slice(0, MAX_PHOTO_COUNT));
  const moreImagePlugMarkup = createMoreImagePlugMarkup(photos.length);

  return (/* html */`
      <div class="product__image">
        <img src="${photos[0]}" width="318" height="220" alt=${name}>
        <div class="product__image-navigation">
          ${imageNavigationMarkup}
        </div>
        ${moreImagePlugMarkup}
      </div>
  `);
};

export default class ProductCardGalleryView extends AbstractView {
  constructor(product) {
    super();

    this._product = product;
    this._currentImgIndex = 0;

    this._mainImage = this.getElement().querySelector(`.product__image img`);
    this._imageNavigation = this.getElement().querySelector(`.product__image-navigation`);
    this._morePhotoPlug = null;

    this.galleryNavigationHoverHandler = this.galleryNavigationHoverHandler.bind(this);
    this.hideMorePhotoPlugMarkup = this.hideMorePhotoPlugMarkup.bind(this);

    this._imageNavigation.addEventListener(`mouseover`, this.galleryNavigationHoverHandler);
  }

  getTemplate() {
    return createProductCardGalleryPreviewTemplate(this._product);
  }

  showMorePhotoPlugMarkup(evt) {
    const lastChild = this.getElement().querySelector(`.product__navigation-column:last-child`);
    if (evt.target === lastChild) {
      this._morePhotoPlug.classList.remove(`hidden`);
      lastChild.addEventListener(`mouseout`, this.hideMorePhotoPlugMarkup);
    }
  }

  hideMorePhotoPlugMarkup() {
    this._morePhotoPlug.classList.add(`hidden`);
  }

  galleryNavigationHoverHandler(evt) {
    evt.preventDefault();

    const targetImgIndex = evt.target.dataset.imgIndex;

    if (targetImgIndex === undefined) {
      return;
    }

    if (this._product.photos.length > MAX_PHOTO_COUNT) {
      this._morePhotoPlug = this.getElement().querySelector(`.product__image-more-photo`);
      this.showMorePhotoPlugMarkup(evt);
    }

    this._currentImgIndex = targetImgIndex;

    const photo = this._product.photos[this._currentImgIndex];

    // TODO: Preloader promise here
    this._mainImage.src = photo;
  }
}
