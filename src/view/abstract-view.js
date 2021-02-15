import {createElement} from "../utils/render";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one.`);
    }

    this._$element = null;

    this.callbacks = {
      afterRender: null,
    };
  }

  getTemplate() {
    throw new Error(`AbstractView method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._$element) {
      this._$element = createElement(this.getTemplate());
    }

    return this._$element;
  }

  removeElement() {
    this._$element = null;
  }

  setAfterRenderHandler(callback) {
    this.callbacks.afterRender = callback;
  }

  handleAfterRenderCallback() {
    if (typeof this.callbacks.afterRender === `function`) {
      this.callbacks.afterRender();
    }
  }
}
