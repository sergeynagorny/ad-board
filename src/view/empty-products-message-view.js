import AbstractView from "./abstract-view";

const createEmptyProductsMessageTemplate = () => {
  return /* html */`
    <div class="results__info results__info--empty-block">
      <p class="results__empty-message">Мы не нашли товары по вашему запросу.</p>
      <p class="results__notion">Попробуйте поменять фильтры настройки объявлений в блоке слева</p>
    </div>
    `;
};

export default class EmptyProductsMessageView extends AbstractView {
  getTemplate() {
    return createEmptyProductsMessageTemplate();
  }
}
