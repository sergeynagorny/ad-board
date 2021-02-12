import {SortType} from "../const.js";

export const getSortedProducts = (products, sortType) => {
  switch (sortType) {
    case SortType.CHEAP:
      return products.slice().sort((a, b) => a.price - b.price);

    case SortType.NEW:

      return products.slice().sort((a, b) => b.publishDate - a.publishDate);

    default:
      return products;
  }
};
