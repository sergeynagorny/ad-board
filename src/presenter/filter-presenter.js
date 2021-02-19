import FilterView from "../view/app-filter-view";
import CategoryPresenter from "./category-presenter";

import FilterRangeView from "../view/filter-range-view";
import FilterAllView from "../view/filter-all-view";
import FilterCameraView from "../view/filter-camera-view";
import FilterEstateView from "../view/filter-estate-view";
import FilterLaptopView from "../view/filter-laptop-view";
import FilterCarView from "../view/filter-car-view";
import FilterShowButtonView from "../view/filter-show-button-view";

import {render, replace} from "../utils/render";
import {CategoryType, UpdateType} from "../const";
import {getProductsByCategory, getProductsPriceRange} from "../utils/products-filters";


export default class FilterPresenter {
  constructor({
    container,
    productsModel,
    categoryModel,
    favoritesModel,
    filterModel,
  }) {

    this._container = container;
    this._filtersContainer = null;

    this._productsModel = productsModel;
    this._categoryModel = categoryModel;
    this._favoritesModel = favoritesModel;
    this._filterModel = filterModel;

    this._selectedFilters = {};

    this._filterView = null;
    this._filterRangeView = null;
    this._filtersByCategoryView = null;
    this._filterShowButtonView = null;

    this.handleRangeFilterChange = this.handleRangeFilterChange.bind(this);
    this.handleFilterShowButtonClick = this.handleFilterShowButtonClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    this.handleProductsModelEvent = this.handleProductsModelEvent.bind(this);
    this.handleCategoryModelEvent = this.handleCategoryModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);

    this._productsModel.addSubscriber(this.handleProductsModelEvent);
    this._categoryModel.addSubscriber(this.handleCategoryModelEvent);
    this._favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
  }

  init() {
    this._filterView = new FilterView();
    render(this._container, this._filterView);

    this._filtersContainer = this._filterView.getFilterFormContainer();
    this._categoryPresenter = new CategoryPresenter(this._filtersContainer, this._categoryModel);
    this._categoryPresenter.init();
  }

  renderFilters() {
    this.renderFilterRange();
    this.renderFiltersByCategory();
    this.renderFilterShowButton();
  }

  renderFilterRange() {
    const currentCategory = this._categoryModel.getCurrentCategory();
    const productsAll = this._productsModel.getProducts();
    const productsByCategory = getProductsByCategory(productsAll, currentCategory);
    const priceRange = getProductsPriceRange(productsByCategory);

    const oldFilterRangeView = this._filterRangeView;
    this._filterRangeView = new FilterRangeView(priceRange);
    this._filterRangeView.setFilterChangeHandler(this.handleRangeFilterChange);

    if (oldFilterRangeView === null) {
      render(this._filtersContainer, this._filterRangeView);
    } else {
      replace(this._filterRangeView, oldFilterRangeView);
    }
  }

  getFilterViewByCategory(currentCategory) {
    switch (currentCategory) {
      case CategoryType.ALL:
        return new FilterAllView();
      case CategoryType.CAMERA:
        return new FilterCameraView();
      case CategoryType.LAPTOPS:
        return new FilterLaptopView();
      case CategoryType.CARS:
        return new FilterCarView();
      case CategoryType.ESTATE:
        return new FilterEstateView();

      default:
        return new FilterAllView();
    }
  }

  renderFiltersByCategory() {
    const currentCategory = this._categoryModel.getCurrentCategory();

    const oldFiltersByCategoryView = this._filtersByCategoryView;
    this._filtersByCategoryView = this.getFilterViewByCategory(currentCategory);
    this._filtersByCategoryView.setFilterChangeHandler(this.handleFilterChange);
    this._filtersByCategoryView.setCheckboxFilterChangeHandler(this.handleCheckboxChange);

    if (oldFiltersByCategoryView === null) {
      render(this._filtersContainer, this._filtersByCategoryView);
    } else {
      replace(this._filtersByCategoryView, oldFiltersByCategoryView);
    }
  }

  renderFilterShowButton() {
    const oldFilterShowButtonView = this._filterShowButtonView;
    this._filterShowButtonView = new FilterShowButtonView();
    this._filterShowButtonView.setFilterShowButtonHandler(this.handleFilterShowButtonClick);

    if (oldFilterShowButtonView === null) {
      render(this._filtersContainer, this._filterShowButtonView);
    } else {
      replace(this._filterShowButtonView, oldFilterShowButtonView);
    }
  }

  resetFilters() {
    this._selectedFilters = {};
    this._filterModel.setFilters(UpdateType.MINOR, this._selectedFilters);
  }


  // VIEW HANDLERS

  handleCheckboxChange(name, value, checked) {
    if (!this._selectedFilters[name]) {
      this._selectedFilters[name] = [];
    }

    if (checked) {
      this._selectedFilters[name].push(value);
    } else {
      this._selectedFilters[name] = this._selectedFilters[name].filter((item) => item !== value);

      if (this._selectedFilters[name].length === 0) {
        delete this._selectedFilters[name];
      }
    }
  }

  handleFilterChange(name, value) {
    this._selectedFilters[name] = value;
  }

  handleFilterShowButtonClick() {
    this._filterModel.setFilters(UpdateType.MAJOR, this._selectedFilters);
  }

  handleRangeFilterChange(values) {
    const [minPrice, maxPrice] = values.split(`,`);
    this._selectedFilters.minPrice = Number(minPrice);
    this._selectedFilters.maxPrice = Number(maxPrice);
  }


  // MODEL EVENTS

  handleProductsModelEvent(updateType) {
    if (updateType === UpdateType.INIT) {
      this.renderFilters();
    }
  }

  handleFavoritesModelEvent() {
    const isFormDisabled = this._favoritesModel.getIsFavoritesShown();
    this._filterView.disabled(isFormDisabled);
    this._filterRangeView.disabled(isFormDisabled);
  }

  handleCategoryModelEvent() {
    this.resetFilters();
    this.renderFilters();
  }
}
