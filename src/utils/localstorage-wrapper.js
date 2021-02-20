export default class LocalStorageWrapper {
  constructor(prefix) {
    this._prefix = prefix;
    this._data = this._getInitialData();
  }

  _getInitialData() {
    const storageItem = localStorage.getItem(this._prefix);
    return storageItem !== null ? new Set(JSON.parse(storageItem)) : new Set();
  }

  _updateStorage() {
    localStorage.setItem(this._prefix, JSON.stringify(Array.from(this._data)));
  }

  setData(value) {
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
    this._data.has(value) ? this._data.delete(value) : this._data.add(value);
    this._updateStorage();
  }

  getData() {
    return this._data;
  }
}
