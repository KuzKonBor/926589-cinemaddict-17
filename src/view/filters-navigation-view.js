import AbstractView from '../framework/view/abstract-view.js';

const titleToLowerCase = (title) => `#${title.split(' ')[0].toLowerCase()}`;

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;
  return (`
  <a href="${titleToLowerCase(name)}"
  class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">
  ${name} ${name === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>
  `);
};

const createFiltersNavigationViewTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return (`<nav class="main-navigation">
${filterItemsTemplate}
</nav>`
  );
};
export default class FiltersNavigationView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersNavigationViewTemplate(this.#filters);
  }
}
