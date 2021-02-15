import AppView from "./view/app-view";
import AppFilterView from "./view/app-filter-view";

import FilterCategoryView from "./view/filter-category-view";
import FilterRangeView from "./view/filter-range-view";
import FilterCameraView from "./view/filter-camera-view";
import FilterEstateView from "./view/filter-estate-view";
import FilterLaptopView from "./view/filter-laptop-view";
import FilterCarView from "./view/filter-car-view";
import FilterShowButtonView from "./view/filter-show-button-view";

import AppResultsPresenter from "./presenter/app-results-presenter";

import {render} from "./utils/render";
import ProductsModel from "./model/products-model";
import FavoritesModel from "./model/favorites-model";
import API from "./api";

const END_POINT = `https://main-shop-fake-server.herokuapp.com`;
const api = new API(END_POINT);


const favoritesModel = new FavoritesModel();
const productsModel = new ProductsModel();

api.getProducts()
  .then((data) => productsModel.adaptToClient(data))
  .then((data) => productsModel.setProducts(data));


const appView = new AppView();
const appContainer = appView.getAppContainer();
render(document.querySelector(`main`), appView);


const appFilterView = new AppFilterView();
const filterFormContainer = appFilterView.getFilterFormContainer();
render(appContainer, appFilterView);

// App Filter
// render(filterFormContainer, new FilterCategoryView());
// render(filterFormContainer, new FilterRangeView());
// render(filterFormContainer, new FilterCameraView());
// render(filterFormContainer, new FilterEstateView());
// render(filterFormContainer, new FilterLaptopView());
// render(filterFormContainer, new FilterCarView());
// render(filterFormContainer, new FilterShowButtonView());


const appResultsPresenter = new AppResultsPresenter(appContainer, productsModel, favoritesModel);
appResultsPresenter.render();


