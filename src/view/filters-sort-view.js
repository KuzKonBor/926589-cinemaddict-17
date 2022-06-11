import AbstractView from '../framework/view/abstract-view.js';
//import {SortType} from '../fish/const.js';

const createFiltersSortViewTemplate = () =>
  (`
<ul class="sort">
    <li><Sort href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button" >Sort by date</a></li>
    <li><a href="#" class="sort__button" >Sort by rating</a></li>
  </ul>`
  );

/*
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.SORT_BY_DEFAULT}"Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_BY_RATING}">Sort by rating</a></li>
  </ul>`
  );
  */
export default class FiltersSortView extends AbstractView {

  get template() {
    return createFiltersSortViewTemplate();
  }

  /*
  onSetSortTypeChange = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#onSortTypeChange);
  };

  #onSortTypeChange = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
  */
}

