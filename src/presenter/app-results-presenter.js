import {sortingButtons, SortType, UpdateType} from "../const";
import {render} from "../utils/render";
import {getSortedProducts} from "../utils/sort";

import AppResultsView from "../view/app-results-view";
import SortingFavoritesView from "../view/sorting-favorites-view";
import SortingOrderView from "../view/sorting-order-view";
import EmptyProductsMessageView from "../view/empty-products-message-view";
import EmptyFavoritesMessageView from "../view/empty-favorites-message-view";
import ProductCardsPresenter from "./product-cards-presenter";

export default class AppResultsPresenter {
  constructor(appContainer, productsModel, favoritesModel) {
    this._appContainer = appContainer;
    this._resultsListContainer = null;

    this._productsModel = productsModel;
    this._favoritesModel = favoritesModel;

    this._appResultsView = null;
    this._sortingOrderView = null;
    this._sortingFavoritesView = null;
    this._emptyProductsMessageView = null;
    this._emptyFavoritesMessageView = null;
    this._productCardsPresenter = null;

    this._productCardsPresenters = [];

    this._selectedSortType = SortType.POPULAR;
    this._sortingButtons = sortingButtons;

    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
    this.handleFavoritesShown = this.handleFavoritesShown.bind(this);

    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);
    this.handleProductsModelEvent = this.handleProductsModelEvent.bind(this);
    this._favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
    this._productsModel.addSubscriber(this.handleProductsModelEvent);
  }

  render() {
    this._appResultsView = new AppResultsView();
    this._resultsListContainer = this._appResultsView.getResultsListContainer();

    this._renderSorting();
    this._renderResultsList();

    render(this._appContainer, this._appResultsView);
  }


  // HANDLERS

  handleSortingOrderChange(sortType) {
    this._selectedSortType = sortType;
    this._renderResultsList();
  }

  handleFavoritesShown(isShown) {
    this._favoritesModel.setIsFavoritesShown(isShown);
  }


  // EVENTS

  handleFavoritesModelEvent() {
    const isSortingOrderDisabled = this._favoritesModel.getIsFavoritesShown();
    this._sortingOrderView.disabled(isSortingOrderDisabled);
    this._renderResultsList();
  }

  handleProductsModelEvent(updateType, newProduct) {
    switch (updateType) {
      case UpdateType.MINOR:
        const productCardsPresenters = this._productCardsPresenters.find((presenter) => presenter.id === newProduct.id);
        productCardsPresenters.render(newProduct);
        break;

      default:
        this._renderResultsList();
    }
  }


  // PRIVATE METHODS

  _renderSorting() {
    const sortingContainer = this._appResultsView.getSortingContainer();

    this._sortingOrderView = new SortingOrderView(this._sortingButtons, this._selectedSortType);
    this._sortingFavoritesView = new SortingFavoritesView();
    this._sortingOrderView.setSortingOrderChangeHandler(this.handleSortingOrderChange);
    this._sortingFavoritesView.setFavoritesShownHandler(this.handleFavoritesShown);

    render(sortingContainer, this._sortingOrderView);
    render(sortingContainer, this._sortingFavoritesView);
  }

  _getProducts() {
    let products = this._productsModel.getProducts();
    const isFavoritesShown = this._favoritesModel.getIsFavoritesShown();

    if (isFavoritesShown) {
      // TODO: Вынести фильтрацию в отдельную функцию
      products = products.slice().filter((product) => product.isFavorite === true);
    }

    return getSortedProducts(products, this._selectedSortType);
  }

  _renderProductCards(container, products) {
    return products.map((product) => {
      const productCardsPresenter = new ProductCardsPresenter(container, this._appContainer.parentNode, this._productsModel);
      productCardsPresenter.render(product);

      return productCardsPresenter;
    });
  }

  _removeProductCards() {
    this._productCardsPresenters.forEach((productCardsPresenter) => productCardsPresenter.destroy());
    this._productCardsPresenters = [];
  }

  _renderEmptyScreens() {
    const isFavoritesShown = this._favoritesModel.getIsFavoritesShown();

    if (isFavoritesShown) {
      render(this._resultsListContainer, new EmptyFavoritesMessageView());
    } else {
      render(this._resultsListContainer, new EmptyProductsMessageView());
    }
  }

  _clearResultsList() {
    this._resultsListContainer.innerHTML = ``;
    this._removeProductCards();
  }

  _renderResultsList() {
    this._clearResultsList();
    const products = this._getProducts();

    if (products.length === 0) {
      this._renderEmptyScreens();
    }

    this._productCardsPresenters = this._renderProductCards(this._resultsListContainer, products);
  }
}
