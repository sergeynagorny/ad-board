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
import {getMockData} from "./mocks/mocks";

const CARDS_PREVIEW_COUNT = 7;
const products = getMockData(CARDS_PREVIEW_COUNT);

const appView = new AppView();
const appContainer = appView.getAppContainer();
render(document.querySelector(`main`), appView);

const appFilterView = new AppFilterView();
const filterFormContainer = appFilterView.getFilterFormContainer();
render(appContainer, appFilterView);

const appResultsPresenter = new AppResultsPresenter(appContainer, products);
appResultsPresenter.render();


// App Filter
render(filterFormContainer, new FilterCategoryView());
render(filterFormContainer, new FilterRangeView());
render(filterFormContainer, new FilterCameraView());
render(filterFormContainer, new FilterEstateView());
render(filterFormContainer, new FilterLaptopView());
render(filterFormContainer, new FilterCarView());
render(filterFormContainer, new FilterShowButtonView());
