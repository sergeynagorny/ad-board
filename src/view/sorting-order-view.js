import AbstractView from "./abstract-view";


const getSortingOrderTabMarkup = (sortingButtons, checkedButton) => {
  return sortingButtons.map(({name, title}) => (/* html */`
    <li class="sorting__order-tab">
      <input class="visually-hidden" type="radio" name="sorting-order" value="${name}" id="sort-${name}"
        ${checkedButton === name ? `checked` : ``}>
      <label for="sort-${name}">${title}</label>
    </li>
  `)).join(`\n`);
};

const createSortingOrderTemplate = (sortingButtons, checkedButton) => {
  const sortingOrderTabMarkup = getSortingOrderTabMarkup(sortingButtons, checkedButton);

  return (/* html */`
    <fieldset class="sorting__order">
      <legend>Показать сначала:</legend>
      <ul class="sorting__order-list">
        ${sortingOrderTabMarkup}
      </ul>
    </fieldset>
  `);
};

export default class SortingOrderView extends AbstractView {
  constructor(sortingButtons, checkedButton) {
    super();

    this._sortingButtons = sortingButtons;
    this._checkedButton = checkedButton;

    this._sortingOrderChangeHandler = null;
  }

  getTemplate() {
    return createSortingOrderTemplate(this._sortingButtons, this._checkedButton);
  }

  disabled(isDisabled) {
    this.getElement().disabled = isDisabled;
  }

  setSortingOrderChangeHandler(handler) {
    this._sortingOrderChangeHandler = handler;
    this.getElement().addEventListener(`change`, (evt) => {
      this._checkedButton = evt.target.value;
      this._sortingOrderChangeHandler(this._checkedButton);
    });
  }
}
