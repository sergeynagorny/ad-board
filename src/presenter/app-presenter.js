import AppView from "../view/app-view";

import ResultsPresenter from "./results-presenter";
import FilterPresenter from "./filter-presenter";

import ProductsModel from "../model/products-model";
import FavoritesModel from "../model/favorites-model";
import CategoryModel from "../model/category-model";
import FilterModel from "../model/filter-model";

import {render} from "../utils/render";
import {UpdateType} from "../const";


export default class AppPresenter {
  constructor(container, api) {
    this._api = api;

    this._container = container;
    this._appView = new AppView();
    this._appContainer = this._appView.getAppContainer();

    this._resultsPresenter = null;
    this._filterPresenter = null;

    this._favoritesModel = new FavoritesModel();
    this._productsModel = new ProductsModel();
    this._categoryModel = new CategoryModel();
    this._filterModel = new FilterModel();
  }

  init() {
    this._api.getProducts()
      .then((data) => this._productsModel.adaptToClient(data))
      .then((data) => this._productsModel.setProducts(UpdateType.INIT, data));

    render(this._container, this._appView);

    this.renderFilter();
    this.renderResults();
  }

  renderFilter() {
    this._filterPresenter = new FilterPresenter({
      container: this._appContainer,
      productsModel: this._productsModel,
      categoryModel: this._categoryModel,
      favoritesModel: this._favoritesModel,
      filterModel: this._filterModel,
    });
    this._filterPresenter.init();
  }

  renderResults() {
    this._resultsPresenter = new ResultsPresenter({
      container: this._appContainer,
      productsModel: this._productsModel,
      categoryModel: this._categoryModel,
      favoritesModel: this._favoritesModel,
      filterModel: this._filterModel,
    });
    this._resultsPresenter.init();
  }
}
