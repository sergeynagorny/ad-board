import AbstractFilterView from "./abstract-filter-view";


const createFilterEstateTemplate = () => {
  return /* html */`
    <div class="filter__estate">
      <fieldset class="filter__type filter__type--estate">
        <legend>Тип недвижимости</legend>
        <ul class="filter__checkboxes-list filter__checkboxes-list--estate">
          <li class="filter__checkboxes-item">
            <input class="visually-hidden" type="checkbox" name="estate-type" value="house" id="house">
            <label for="house">Дом</label>
          </li>
          <li class="filter__checkboxes-item">
            <input class="visually-hidden" type="checkbox" name="estate-type" value="flat" id="flat">
            <label for="flat">Квартира</label>
          </li>
          <li class="filter__checkboxes-item">
            <input class="visually-hidden" type="checkbox" name="estate-type" value="apartment"
              id="apartments">
            <label for="apartments">Апартаменты</label>
          </li>
        </ul>
      </fieldset>
      <div class="filter__min-square">
        <label for="square">Минимальная площадь, м<sup>2</sup></label>
        <input type="number" id="square" name="min-square" min="1" value="" placeholder="0">
      </div>
      <fieldset id="rooms" class="filter__radiobuttons filter__radiobuttons--ram">
        <legend>Количество комнат</legend>
        <ul class="filter__ram-list">
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="any" id="any_room" checked>
            <label for="any_room">Любое</label>
          </li>
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="1" id="one">
            <label for="one">1</label>
          </li>
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="2" id="two">
            <label for="two">2</label>
          </li>
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="3" id="three">
            <label for="three">3</label>
          </li>
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="4" id="four">
            <label for="four">4</label>
          </li>
          <li class="filter__radiobuttons-item">
            <input class="visually-hidden" type="radio" name="rooms" value="fivemore" id="fivemore">
            <label for="fivemore">5+</label>
          </li>
        </ul>
      </fieldset>
    </div>
    `;
};

export default class FilterEstateView extends AbstractFilterView {
  getTemplate() {
    return createFilterEstateTemplate();
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    this.getElement().querySelector(`#rooms`).addEventListener(`change`, this.handleFilterChange);
    this.getElement().querySelector(`#square`).addEventListener(`change`, this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector(`.filter__type`).addEventListener(`change`, this.handleCheckboxFilterChange);
  }
}
