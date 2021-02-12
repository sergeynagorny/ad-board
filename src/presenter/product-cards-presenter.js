import {render, replace, remove} from "../utils/render";

import ProductCardPreviewView from "../view/product-card-preview-view";
import ProductCardFullView from "../view/product-card-full-view";

export default class ProductCardsPresenter {
  constructor(cardPreviewContainer, cardFullContainer) {
    this._cardPreviewContainer = cardPreviewContainer;
    this._cardFullContainer = cardFullContainer;

    this._product = null;

    this._productCardPreviewView = null;
    this._productCardFullView = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._cardOpen = this._cardOpen.bind(this);
    this._cardClose = this._cardClose.bind(this);
  }

  render(product) {
    this._product = product;

    const oldProductCardPreviewView = this._productCardPreviewView;
    this._productCardPreviewView = new ProductCardPreviewView(this._product);

    this._productCardPreviewView.setFavoriteButtonClickHandler(() => {});
    this._productCardPreviewView.setCardOpenClickHandler(this._cardOpen);

    if (oldProductCardPreviewView) {
      // replace
    } else {
      render(this._cardPreviewContainer, this._productCardPreviewView);
    }
  }

  destroy() {
    remove(this._productCardPreviewView);
    this._productCardFullView = null;
  }

  renderCardFull() {
    const oldProductCardFullView = this._productCardFullView;
    this._productCardFullView = new ProductCardFullView(this._product);

    this._productCardFullView.setFavoriteButtonClickHandler(() => {});
    this._productCardFullView.setCardCloseClickHandler(this._cardClose);

    if (oldProductCardFullView) {
      replace(this._cardFullContainer, this._productCardFullView);
    } else {
      render(this._cardFullContainer, this._productCardFullView);
    }
  }

  _cardOpen() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this.renderCardFull();
  }

  _cardClose() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._productCardFullView);
    this._productCardFullView = null;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._cardClose();
    }
  }
}
