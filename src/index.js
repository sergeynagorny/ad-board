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

import {render, remove} from "./utils/render";
import {getMockData} from "./mocks/mocks";

const CARDS_PREVIEW_COUNT = 7;
const products = getMockData(CARDS_PREVIEW_COUNT);

const root = document.querySelector(`main`);
render(root, new AppView());

const appWrapper = document.querySelector(`.onlineshop-app__wrapper`);
render(appWrapper, new AppFilterView());


const renderProducts = (containerCardPreview, containerCardFull, product) => {
  const productCardPreviewView = new ProductCardPreviewView(product);
  const productCardFullView = new ProductCardFullView(product);

  const productCardFullOpen = () => {
    productCardFullView.getElement().style.display = `block`;
    render(containerCardFull, productCardFullView);
  };

  const productCardFullClose = () => {
    remove(productCardFullView);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      productCardFullClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const addListenersOnProductCardFull = () => {
    productCardFullView.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.closest(`.popup__inner`) || evt.target.closest(`.popup__close`)) {
        productCardFullClose();
      }
    });
  };

  productCardPreviewView.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (evt.target.closest(`.product__title`) || evt.target.closest(`.product__image`)) {
      addListenersOnProductCardFull();
      document.addEventListener(`keydown`, onEscKeyDown);
      productCardFullOpen();
    }
  });

  render(containerCardPreview, productCardPreviewView);
};


const renderResults = (container, products) => {
  render(container, new AppResultsView());

  const sortingForm = document.querySelector(`.sorting__form`);
  render(sortingForm, new SortingOrderView());
  render(sortingForm, new SortingFavoritesView());


  const app = document.querySelector(`.onlineshop-app`);
  const resultsList = document.querySelector(`.results__list`);

  for (const product of products) {
    renderProducts(resultsList, app, product);
  }
};

renderResults(appWrapper, products);


// App Filter
const filterForm = document.querySelector(`.filter__form`);
render(filterForm, new FilterCategoryView());
render(filterForm, new FilterRangeView());
render(filterForm, new FilterCameraView());
render(filterForm, new FilterEstateView());
render(filterForm, new FilterLaptopView());
render(filterForm, new FilterCarView());
render(filterForm, new FilterShowButtonView());
