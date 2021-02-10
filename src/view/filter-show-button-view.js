import AbstractView from "./abstract-view";

const createFilterShowButtonTemplate = () => {
  return /* html */`
    <button class="button filter__button" type="submit">Показать</button>
    `;
};

export default class FilterShowButtonView extends AbstractView {
  getTemplate() {
    return createFilterShowButtonTemplate();
  }
}
