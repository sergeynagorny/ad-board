import AbstractModel from "./abstract-model";


export default class FavoritesModel extends AbstractModel {
  constructor() {
    super();
    this._isFavoritesShown = false;
  }

  setIsFavoritesShown(isFavoritesShown) {
    this._isFavoritesShown = isFavoritesShown;
    this.observer.notify();
  }

  getIsFavoritesShown() {
    return this._isFavoritesShown;
  }
}
