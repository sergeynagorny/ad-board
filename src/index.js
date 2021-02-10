import {render} from "./utils/render";

import AppView from "./view/app-view";
import AppFilterView from "./view/app-filter-view";
import AppResultsView from "./view/app-results-view";

import FilterCategoryView from "./view/filter-category-view";
import FilterRangeView from "./view/filter-range-view";
import FilterCameraView from "./view/filter-camera-view";
import FilterEstateView from "./view/filter-estate-view";
import FilterLaptopView from "./view/filter-laptop-view";
import FilterCarView from "./view/filter-car-view";
import FilterShowButtonView from "./view/filter-show-button-view";

import ProductCardPreviewView from "./view/product-card-preview-view";
import ProductCardFullView from "./view/product-card-full-view";

import SortingFavoritesView from "./view/sorting-favorites-view";
import SortingOrderView from "./view/sorting-order-view";

import EmptyProductsMessageView from "./view/empty-products-message-view";
import EmptyFavoritesMessageView from "./view/empty-favorites-message-view";

import {getMockData} from "./mocks/mocks";


const CARDS_PREVIEW_COUNT = 7;
const products = getMockData(CARDS_PREVIEW_COUNT);

// App
const root = document.querySelector(`main`);
render(root, new AppView());

const appWrapper = document.querySelector(`.onlineshop-app__wrapper`);
render(appWrapper, new AppFilterView());
render(appWrapper, new AppResultsView());


// App Results
const sortingForm = document.querySelector(`.sorting__form`);
render(sortingForm, new SortingOrderView());
render(sortingForm, new SortingFavoritesView());


const resultsList = document.querySelector(`.results__list`);
for (const product of products) {
  render(resultsList, new ProductCardPreviewView(product));
}


// App Filter
const filterForm = document.querySelector(`.filter__form`);
render(filterForm, new FilterCategoryView());
render(filterForm, new FilterRangeView());
render(filterForm, new FilterCameraView());
render(filterForm, new FilterEstateView());
render(filterForm, new FilterLaptopView());
render(filterForm, new FilterCarView());
render(filterForm, new FilterShowButtonView());


// Product Card Full
const app = document.querySelector(`.onlineshop-app`);
render(app, new ProductCardFullView());
