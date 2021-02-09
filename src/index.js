import {render} from "./utils/render";

import createAppTemplate from "./view/app-view";
import createAppResultsTemplate from "./view/app-results-view";
import createAppFilterTemplate from "./view/app-filter-view";

import createFilterCategoryTemplate from "./view/filter-category-view";
import createFilterRangeTemplate from "./view/filter-range-view";
import createFilterCameraTemplate from "./view/filter-camera-view";
import createFilterEstateTemplate from "./view/filter-estate-view";
import createFilterLaptopTemplate from "./view/filter-laptop-view";
import createFilterCarTemplate from "./view/filter-car-view";
import createFilterShowButtonTemplate from "./view/filter-show-button-view";

import createProductCardFullTemplate from "./view/product-card-full-view";
import createProductCardPreviewTemplate from "./view/product-card-preview-view";

import createSortingFavoritesTemplate from "./view/sorting-favorites-view";
import createSortingOrderTemplate from "./view/sorting-order-view";

import createEmptyProductsMessageTemplate from "./view/empty-products-message-view";
import createEmptyFavoritesMessageTemplate from "./view/empty-favorites-message-view";


const CARDS_PREVIEW_COUNT = 7;


// App
const root = document.querySelector(`main`);
render(root, createAppTemplate());

const appWrapper = document.querySelector(`.onlineshop-app__wrapper`);
render(appWrapper, createAppFilterTemplate());
render(appWrapper, createAppResultsTemplate());


// App Results
const sortingForm = document.querySelector(`.sorting__form`);
render(sortingForm, createSortingOrderTemplate());
render(sortingForm, createSortingFavoritesTemplate());

const resultsList = document.querySelector(`.results__list`);
for (let i = 0; i < CARDS_PREVIEW_COUNT; i++) {
  render(resultsList, createProductCardPreviewTemplate());
}


// App Filter
const filterForm = document.querySelector(`.filter__form`);
render(filterForm, createFilterCategoryTemplate());
render(filterForm, createFilterRangeTemplate());
render(filterForm, createFilterCameraTemplate());
render(filterForm, createFilterEstateTemplate());
render(filterForm, createFilterLaptopTemplate());
render(filterForm, createFilterCarTemplate());
render(filterForm, createFilterShowButtonTemplate());


// Product Card Full
const app = document.querySelector(`.onlineshop-app`);
render(app, createProductCardFullTemplate());
