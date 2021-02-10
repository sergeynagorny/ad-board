import AbstractView from "./abstract-view";

const createEmptyFavoritesMessageTemplate = () => {
  return /* html */`
    <div class="results__info results__info--empty-block">
      <p class="favorites__empty-message">У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко в карточке объявления.</p>
      <p class="favorites__notion">Вы можете вернуться к списку всех товаров, кликнув ещё раз на «Показать избранные»</p>
    </div>
    `;
};

export default class EmptyFavoritesMessageView extends AbstractView {
  getTemplate() {
    return createEmptyFavoritesMessageTemplate();
  }
}
