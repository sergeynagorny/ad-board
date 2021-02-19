import FilterCategoryView from "../view/filter-category-view";
import {categories} from "../const";
import {render} from "../utils/render";


export default class CategoryPresenter {
  constructor(container, categoryModel) {
    this._container = container;

    this._categoryModel = categoryModel;

    this._filterCategoryView = null;

    this.handleCategorySelectChange = this.handleCategorySelectChange.bind(this);
  }

  init() {
    const currentCategory = this._categoryModel.getCurrentCategory();
    this._filterCategoryView = new FilterCategoryView(categories, currentCategory);
    this._filterCategoryView.setCategorySelectHandler(this.handleCategorySelectChange);
    render(this._container, this._filterCategoryView);
  }

  handleCategorySelectChange(currentCategory) {
    this._categoryModel.setCurrentCategory(currentCategory);
  }
}
