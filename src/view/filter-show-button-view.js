import AbstractView from "./abstract-view";

const createFilterShowButtonTemplate = () => {
  return /* html */`
    <button class="button filter__button" type="submit">Показать</button>
    `;
};

export default class FilterShowButtonView extends AbstractView {
  constructor() {
    super();

    this.callbacks = {
      filterShowButtonClick: null,
    };

    this.filterShowButtonHandler = this.filterShowButtonHandler.bind(this);
  }

  getTemplate() {
    return createFilterShowButtonTemplate();
  }

  setFilterShowButtonHandler(callback) {
    this.callbacks.filterShowButtonClick = callback;
    this.getElement().addEventListener(`click`, this.filterShowButtonHandler);
  }

  filterShowButtonHandler(evt) {
    evt.preventDefault();
    this.callbacks.filterShowButtonClick();
  }

  disabled(isDisabled) {
    this.getElement().disabled = isDisabled;
  }
}
