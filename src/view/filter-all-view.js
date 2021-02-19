import AbstractFilterView from "./abstract-filter-view";

const createFilterAllTemplate = () => {
  return `<div></div>`;
};

export default class FilterAllView extends AbstractFilterView {
  getTemplate() {
    return createFilterAllTemplate();
  }
}
