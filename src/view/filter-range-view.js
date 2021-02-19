import AbstractFilterView from "./abstract-filter-view";
const Slider = window.rSlider;

const createFilterRangeTemplate = () => {
  return /* html */`
    <div class="filter__range">
      <label for="range">Цена, ₽</label>
      <input type="text" id="range" />
    </div>
    `;
};

export default class FilterRangeView extends AbstractFilterView {
  constructor(priceRange) {
    super();

    this._slider = null;
    this._priceRange = priceRange;

    this.renderSlider = this.renderSlider.bind(this);
    this.setAfterRenderHandler(this.renderSlider);
  }

  getTemplate() {
    return createFilterRangeTemplate();
  }

  removeElement() {
    this._slider.destroy();
    super.removeElement();
  }

  renderSlider() {
    this._slider = new Slider({
      target: this.getElement().querySelector(`#range`),
      values: this._priceRange,
      set: this._priceRange,
      step: this._priceRange.max >= 1000000 ? 100000 : 1000,
      range: true,
      tooltip: true,
      scale: false,
      labels: false,
      onChange: (values) => {
        this.callbacks.valueFilterChange(values);
      }
    });
  }

  disabled(isDisabled) {
    this._slider.disabled(isDisabled);
  }
}
