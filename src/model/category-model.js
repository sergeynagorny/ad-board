import AbstractModel from "./abstract-model";
import {CategoryType} from "../const";


export default class CategoryModel extends AbstractModel {
  constructor() {
    super();
    this._currentCategory = CategoryType.ALL;
  }

  setCurrentCategory(currentCategory) {
    this._currentCategory = currentCategory;

    this.observer.notify();
  }

  getCurrentCategory() {
    return this._currentCategory;
  }
}
