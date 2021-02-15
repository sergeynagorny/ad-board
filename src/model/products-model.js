import AbstractModel from "./abstract-model";
import {UpdateType} from "../const";


export default class ProductsModel extends AbstractModel {
  constructor() {
    super();

    this._products = [];
  }

  getProducts() {
    return this._products;
  }

  setProducts(products) {
    this._products = products;

    this.observer.notify(UpdateType.MAJOR, products);
  }

  changeProductFavorite(product) {
    const newProduct = Object.assign({}, product, {isFavorite: !product.isFavorite});

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
}