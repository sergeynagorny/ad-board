import {sortingButtons, SortType} from "../const";
import {render} from "../utils/render";
import {getSortedProducts} from "../utils/sort";

import AppResultsView from "../view/app-results-view";
import SortingFavoritesView from "../view/sorting-favorites-view";
import SortingOrderView from "../view/sorting-order-view";
import EmptyProductsMessageView from "../view/empty-products-message-view";
import EmptyFavoritesMessageView from "../view/empty-favorites-message-view";
import ProductCardsPresenter from "./product-cards-presenter";


export default class AppResultsPresenter {
  constructor(appContainer, products) {
    this._appContainer = appContainer;
    this._products = products;

    this._appResultsView = null;
    this._sortingOrderView = null;
    this._sortingFavoritesView = null;
    this._emptyProductsMessageView = null;
    this._emptyFavoritesMessageView = null;
    this._productCardsPresenter = null;

    this._showedProductCardsPresenters = [];

    this._selectedSortType = SortType.POPULAR;
    this._sortingButtons = sortingButtons;

    this._handleSortingOrderChange = this._handleSortingOrderChange.bind(this);
  }

  render() {
    this._appResultsView = new AppResultsView();

    this._renderSorting();
    this._renderResultsList();

    render(this._appContainer, this._appResultsView);
  }


  // HANDLERS

  _handleSortingOrderChange(sortType) {
    this._selectedSortType = sortType;
    this._renderResultsList();
  }


  // PRIVATE METHODS

  _renderSorting() {
    const sortingContainer = this._appResultsView.getSortingContainer();

    const sortingOrderView = new SortingOrderView(this._sortingButtons, this._selectedSortType);
    const sortingFavoritesView = new SortingFavoritesView();
    sortingOrderView.setSortingOrderChangeHandler(this._handleSortingOrderChange);

    render(sortingContainer, sortingOrderView);
    render(sortingContainer, sortingFavoritesView);
  }

  _getProducts() {
    return getSortedProducts(this._products, this._selectedSortType);
  }

  _renderProductCards(container, products) {
    return products.map((product) => {
      const productCardsPresenter = new ProductCardsPresenter(container, this._appContainer.parentNode);
      productCardsPresenter.render(product);

      return productCardsPresenter;
    });
  }

  _removeProductCards() {
    this._showedProductCardsPresenters.forEach((productCardsPresenter) => productCardsPresenter.destroy());
    this._showedProductCardsPresenters = [];
  }

  _renderResultsList() {
    this._removeProductCards();
    const products = this._getProducts();

    const resultsListContainer = this._appResultsView.getResultsListContainer();
    this._showedProductCardsPresenters = this._renderProductCards(resultsListContainer, products);
  }
}
