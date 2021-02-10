import AbstractView from "./abstract-view";

const createAppResultsTemplate = () => {
  return /* html */`
    <section class="onlineshop-app__results results">
      <div class="results__head">
        <h2 class="title results__title">Результаты</h2>
        <div class="results__sorting sorting">
          <form class="sorting__form"></form>
        </div>
      </div>
      <!-- results__info--empty-block -->
      <ul class="results__list"></ul>
    </section>
    `;
};

export default class AppResultsView extends AbstractView {
  getTemplate() {
    return createAppResultsTemplate();
  }
}
