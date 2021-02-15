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

    this._map = null;

    this._cardPreviewContainer = cardPreviewContainer;
    this._cardFullContainer = cardFullContainer;

    this._productCardPreviewView = null;
    this._productCardFullView = null;
    this._productCardMapView = null;
    this._productCardGalleryView = null;

    this._isCardOpen = false;

    this.handleOpenCardClick = this.handleOpenCardClick.bind(this);
    this.handleCloseCardClick = this.handleCloseCardClick.bind(this);
    this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
  }


  // PUBLIC METHODS

  render(product) {
    this.id = product.id;
    this._product = product;

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

    // TODO: dirty

    if (this._isCardOpen) {
      this._cardOpen();
    }
  }

  destroy() {
    remove(this._productCardPreviewView);
  }


  // HANDLERS

  handleCloseCardClick() {
    this._cardClose();
  }

  handleOpenCardClick() {
    this._cardOpen();
  }

  handleFavoriteButtonClick() {
    this._productsModel.changeProductFavorite(this._product);
  }


  // PRIVATE METHODS

  _renderCardFull() {
    this._isCardOpen = true;

    // TODO: dirty

    const oldProductCardFullView = this._productCardFullView;
    this._productCardFullView = new ProductCardFullView(this._product);
    this._productCardFullView.setFavoriteButtonClickHandler(this.handleFavoriteButtonClick);
    this._productCardFullView.setCardCloseClickHandler(this.handleCloseCardClick);
    const mapContainer = this._productCardFullView.getMapContainer();
    const galleryContainer = this._productCardFullView.getGalleryContainer();


    if (oldProductCardFullView === null) {
      this._productCardMapView = new ProductCardMapView();
      this._productCardGalleryView = new ProductCardGalleryView(this._product);
      render(this._cardFullContainer, this._productCardFullView);
      render(galleryContainer, this._productCardGalleryView);
      render(mapContainer, this._productCardMapView, RenderPosition.AFTERBEGIN);
      this._productCardMapView.renderMap(this._product.coordinates);
    } else {
      replace(this._productCardFullView, oldProductCardFullView);
      render(mapContainer, this._productCardMapView, RenderPosition.AFTERBEGIN);
      render(galleryContainer, this._productCardGalleryView);
      this._productCardMapView.renderMap(this._product.coordinates);
    }
  }

  _cardOpen() {
    this._renderCardFull(this._product);
  }

  _cardClose() {
    this._productCardMapView.destroy();
    this._isCardOpen = false;
    remove(this._productCardFullView);
    this._productCardFullView = null;
  }
}
