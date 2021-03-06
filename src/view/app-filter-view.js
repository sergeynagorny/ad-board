import AbstractView from "./abstract-view";

const createAppFilterTemplate = () => {
  return /* html */`
    <section class="onlineshop-app__filter filter">
      <h2 class="title filter__title">Фильтр</h2>
      <form class="filter__form" action="#" method="post"></form>
    </section>
    `;
};

export default class AppFilterView extends AbstractView {
  getTemplate() {
    return createAppFilterTemplate();
  }

  getFilterFormContainer() {
    return this.getElement().querySelector(`.filter__form`);
  }

  disabled(isDisabled) {
    const form = this.getElement().querySelector(`.filter__form`);

    const inputs = form.getElementsByTagName(`input`);
    const buttons = form.getElementsByTagName(`button`);
    const selects = form.getElementsByTagName(`select`);

    [...inputs, ...selects, ...buttons].forEach((element) => {
      element.disabled = isDisabled;
    });
  }
}
