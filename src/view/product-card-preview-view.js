import AbstractView from "./abstract-view";

const createProductCardPreviewTemplate = () => {
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
        <div class="product__image-more-photo hidden">+2 фото</div>
        <img src="img/item1.jpg" srcset="img/item1-2x.jpg 2x" width="318" height="220"
          alt="Загородный дом с видом на озеро">
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
          <a href="#">Загородный дом с видом на озеро</a>
        </h3>
        <div class="product__price">3 000 000 ₽</div>
        <div class="product__address">Приозёрск, улица Прибрежная</div>
        <div class="product__date">2 часа назад</div>
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
