import AbstractView from "./abstract-view";

const createAppTemplate = () => {
  return /* html */`
    <section class="onlineshop-app">
      <h1 class="visually-hidden">Главная</h1>
      <div class="onlineshop-app__blueline"></div>
      <div class="onlineshop-app__wrapper"></div>
    </section>
    `;
};

export default class AppView extends AbstractView {
  getTemplate() {
    return createAppTemplate();
  }
}
