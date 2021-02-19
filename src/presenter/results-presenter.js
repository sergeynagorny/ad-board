import {sortingButtons, SortType, UpdateType} from "../const";
import {render} from "../utils/render";
import {getSortedProducts} from "../utils/sort";
import {getFavoriteProducts, getFilteredProducts} from "../utils/products-filters";

import ResultsView from "../view/app-results-view";
import SortingFavoritesView from "../view/sorting-favorites-view";
import SortingOrderView from "../view/sorting-order-view";
import EmptyProductsMessageView from "../view/empty-products-message-view";
import EmptyFavoritesMessageView from "../view/empty-favorites-message-view";
import ProductCardsPresenter from "./product-cards-presenter";


export default class AppResultsPresenter {
  constructor({
    container,
    productsModel,
    favoritesModel,
    categoryModel,
    filterModel,
  }) {
    this._container = container;
    this._resultsContainer = null;

    this._productsModel = productsModel;
    this._favoritesModel = favoritesModel;
    this._categoryModel = categoryModel;
    this._filterModel = filterModel;

    this._resultsView = null;
    this._sortingOrderView = null;
    this._sortingFavoritesView = null;
    this._emptyProductsMessageView = null;
    this._emptyFavoritesMessageView = null;
    this._productCardsPresenter = null;

    this._isFavoriteProductsShown = this._favoritesModel.getIsFavoritesShown();

    this._productCardsPresenters = [];

    this._selectedSortType = SortType.POPULAR;
    this._sortingButtons = sortingButtons;

    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
    this.handleFavoritesShown = this.handleFavoritesShown.bind(this);

    this.handleProductsModelEvent = this.handleProductsModelEvent.bind(this);
    this.handleCategoryModelEvent = this.handleCategoryModelEvent.bind(this);
    this.handleFilterModelEvent = this.handleFilterModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);

    this._productsModel.addSubscriber(this.handleProductsModelEvent);
    this._categoryModel.addSubscriber(this.handleCategoryModelEvent);
    this._filterModel.addSubscriber(this.handleFilterModelEvent);
    this._favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
  }

  init() {
    this._resultsView = new ResultsView();
    this._resultsContainer = this._resultsView.getResultsListContainer();

    this.renderSorting();

    render(this._container, this._resultsView);
  }


  // HANDLERS

  handleSortingOrderChange(sortType) {
    this._selectedSortType = sortType;
    this.renderResultsList();
  }

  handleFavoritesShown(isShown) {
    this._favoritesModel.setIsFavoritesShown(isShown);
  }


  // EVENTS

  handleFavoritesModelEvent() {
    this._isFavoriteProductsShown = this._favoritesModel.getIsFavoritesShown();
    this._sortingOrderView.disabled(this._isFavoriteProductsShown);
    this.renderResultsList();
  }

  handleCategoryModelEvent() {
    this.renderResultsList();
  }

  handleFilterModelEvent(updateType) {
    if (updateType === UpdateType.MAJOR) {
      this.renderResultsList();
    }
  }

  handleProductsModelEvent(updateType, newProduct) {
    switch (updateType) {
      case UpdateType.MINOR:
        const productCardsPresenters = this._productCardsPresenters.find((presenter) => presenter.id === newProduct.id);
        productCardsPresenters.render(newProduct);
        break;

      default:
        this.renderResultsList();
    }
  }


  // PRIVATE METHODS

  renderSorting() {
    const sortingContainer = this._resultsView.getSortingContainer();

    this._sortingOrderView = new SortingOrderView(this._sortingButtons, this._selectedSortType);
    this._sortingFavoritesView = new SortingFavoritesView();
    this._sortingOrderView.setSortingOrderChangeHandler(this.handleSortingOrderChange);
    this._sortingFavoritesView.setFavoritesShownHandler(this.handleFavoritesShown);

    render(sortingContainer, this._sortingOrderView);
    render(sortingContainer, this._sortingFavoritesView);
  }

  getProducts() {
    const products = this._productsModel.getProducts();
    const currentCategory = this._categoryModel.getCurrentCategory();
    const currentFilters = this._filterModel.getFilters();

    if (this._isFavoriteProductsShown) {
      const favoriteProducts = getFavoriteProducts(products);
      return getSortedProducts(favoriteProducts, this._selectedSortType);
    }

    const filteredProducts = getFilteredProducts(products, currentCategory, currentFilters);
    return getSortedProducts(filteredProducts, this._selectedSortType);
  }

  renderProductCards(container, products) {
    return products.map((product) => {
      const productCardsPresenter = new ProductCardsPresenter(container, this._container.parentNode, this._productsModel);
      productCardsPresenter.render(product);

      return productCardsPresenter;
    });
  }

  removeProductCards() {
    this._productCardsPresenters.forEach((productCardsPresenter) => productCardsPresenter.destroy());
    this._productCardsPresenters = [];
  }

  renderEmptyScreens() {
    if (this._isFavoriteProductsShown) {
      render(this._resultsContainer, new EmptyFavoritesMessageView());
    } else {
      render(this._resultsContainer, new EmptyProductsMessageView());
    }
  }

  clearResultsList() {
    this._resultsContainer.innerHTML = ``;
    this.removeProductCards();
  }

  renderResultsList() {
    this.clearResultsList();
    const products = this.getProducts();

    if (products.length === 0) {
      this.renderEmptyScreens();
    }

    this._productCardsPresenters = this.renderProductCards(this._resultsContainer, products);
  }
}
