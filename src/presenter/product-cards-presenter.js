import {render, replace, remove, RenderPosition} from "../utils/render";

import ProductCardPreviewView from "../view/product-card-preview-view";
import ProductCardFullView from "../view/product-card-full-view";
import ProductCardMapView from "../view/product-card-map-view";
import ProductCardGalleryView from "../view/product-card-gallery-view";
import ProductCardGalleryPreviewView from "../view/product-card-gallery-preview-view";

export default class ProductCardsPresenter {
  constructor(cardPreviewContainer, cardFullContainer, productsModel) {
    this.id = null;

    this._productsModel = productsModel;
    this._product = null;

    this._cardPreviewContainer = cardPreviewContainer;
    this._cardFullContainer = cardFullContainer;

    this._productCardPreviewView = null;
    this._productCardFullView = null;
    this._productCardMapView = null;
    this._productCardGalleryView = null;
    this._productCardGalleryPreviewView = null;

    this._isCardOpen = false;

    this.afterRenderCardFullHandler = this.afterRenderCardFullHandler.bind(this);

    this.handleOpenCardClick = this.handleOpenCardClick.bind(this);
    this.handleCloseCardClick = this.handleCloseCardClick.bind(this);
    this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
  }


  // PUBLIC METHODS

  render(product) {
    this.id = product.id;
    this._product = product;

    this.renderCardPreview();

    if (this._isCardOpen) {
      this.renderCardFull();
    }
  }

  renderCardPreview() {
    const oldProductCardPreviewView = this._productCardPreviewView;
    this._productCardPreviewView = new ProductCardPreviewView(this._product);

    this._productCardGalleryPreviewView = new ProductCardGalleryPreviewView(this._product);
    render(this._productCardPreviewView.getGalleryContainer(), this._productCardGalleryPreviewView, RenderPosition.AFTERBEGIN);

    this._productCardPreviewView.setFavoriteButtonClickHandler(this.handleFavoriteButtonClick);
    this._productCardPreviewView.setCardOpenClickHandler(this.handleOpenCardClick);

    if (oldProductCardPreviewView) {
      replace(this._productCardPreviewView, oldProductCardPreviewView);
    } else {
      render(this._cardPreviewContainer, this._productCardPreviewView);
    }
  }

  renderCardFull() {
    this._isCardOpen = true;

    const oldProductCardFullView = this._productCardFullView;
    this._productCardFullView = new ProductCardFullView(this._product);
    this._productCardFullView.setAfterRenderHandler(this.afterRenderCardFullHandler);
    this._productCardFullView.setFavoriteButtonClickHandler(this.handleFavoriteButtonClick);
    this._productCardFullView.setCardCloseClickHandler(this.handleCloseCardClick);

    if (oldProductCardFullView === null) {
      this._productCardMapView = new ProductCardMapView(this._product);
      this._productCardGalleryView = new ProductCardGalleryView(this._product);
      render(this._cardFullContainer, this._productCardFullView);
    } else {
      replace(this._productCardFullView, oldProductCardFullView);
    }
  }

  cardFullClose() {
    if (this._productCardFullView !== null) {
      remove(this._productCardFullView);
      remove(this._productCardGalleryView);
      remove(this._productCardMapView);

      this._productCardFullView = null;
      this._isCardOpen = false;
    }
  }

  destroy() {
    this.cardFullClose();
    remove(this._productCardPreviewView);
  }


  // HANDLERS

  afterRenderCardFullHandler() {
    const galleryContainer = this._productCardFullView.getGalleryContainer();
    const mapContainer = this._productCardFullView.getMapContainer();

    render(galleryContainer, this._productCardGalleryView);
    render(mapContainer, this._productCardMapView, RenderPosition.AFTERBEGIN);
  }

  handleCloseCardClick() {
    this.cardFullClose();
  }

  handleOpenCardClick() {
    this.renderCardFull(this._product);
  }

  handleFavoriteButtonClick() {
    this._productsModel.changeProductFavorite(this._product);
  }
}
