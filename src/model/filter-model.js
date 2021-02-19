import AbstractModel from "./abstract-model";


export default class FilterModel extends AbstractModel {
  constructor() {
    super();
    this._filters = {};
  }

  setFilters(updateType, filters) {
    this._filters = filters;
    this.observer.notify(updateType);
  }

  getFilters() {
    return this._filters;
  }
}
