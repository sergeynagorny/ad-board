const createFilterRangeTemplate = () => {
  return /* html */`
    <div class="filter__range">
      <label for="range">Цена, ₽</label>
      <input type="text" id="sampleSlider" />
    </div>
    `;
};

export default createFilterRangeTemplate;
