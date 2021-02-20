import AbstractModel from "./abstract-model";
import {UpdateType} from "../const";
import {adaptCategory} from "../utils/product-adapters";
import {convertStringTimestampToDate} from "../utils/date";
import LocalStorageWrapper from "../utils/localstorage-wrapper";


export default class ProductsModel extends AbstractModel {
  constructor() {
    super();
    this._products = [];
    this._favoritesStorage = new LocalStorageWrapper(`favoritesId`);
    this._favoritesId = this._favoritesStorage.getData();
  }

  getProducts() {
    return this._products;
  }

  setProducts(updateType, products) {
    this._products = products;
    this.observer.notify(updateType, products);
  }

  changeProductFavorite(product) {
    const {id, isFavorite} = product;

    this._favoritesStorage.setData(id);
    const newProduct = Object.assign({}, product, {isFavorite: !isFavorite});
    this.updateProduct(newProduct);
  }

  updateProduct(newProduct) {
    const index = this._products.findIndex((product) => product.id === newProduct.id);

    if (index === -1) {
      return false;
    }

    this._products = [
      ...this._products.slice(0, index),
      newProduct,
      ...this._products.slice(index + 1),
    ];

    this.observer.notify(UpdateType.MINOR, newProduct);

    return true;
  }

  adaptToClient({products}) {
    return products.map((product, index) => {
      const id = 1 + index;
      const publishDate = convertStringTimestampToDate(product[`publish-date`]);

      delete product[`publish-date`];

      return Object.assign({}, product, {
        'id': id,
        'isFavorite': this._favoritesId.has(id),
        'category': adaptCategory(product[`category`]),
        'publishDate': publishDate,
      });
    });
  }
}
