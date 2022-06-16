import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../fish/const.js';

const createFiltersSortViewTemplate = () =>
  (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
  );

export default class FiltersSortView extends AbstractView {

  get template() {
    return createFiltersSortViewTemplate();
  }


  setActiveCurrentSortItem(currentSortItem) {
    const activeSortItem = this.element.querySelector('.sort__button--active');
    activeSortItem.classList.remove('sort__button--active');
    currentSortItem.classList.add('sort__button--active');
  }


  onSetSortTypeChange = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#onSortType);
  };

  #onSortType = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.setActiveCurrentSortItem(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
