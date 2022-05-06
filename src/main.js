
import UserTitleView from './view/user-title-view.js';
import {FiltersNavigationView, FiltersSortView} from'./view/filters-view.js';
import {FilmsListView} from './view/movie-card-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsListView = new FilmsListView();
const boardPresenter = new BoardPresenter();


render(new UserTitleView(), siteHeaderElement);
render(new FiltersNavigationView(), siteMainElement);
render(new FiltersSortView(), siteMainElement);

boardPresenter.init(siteMainElement);

export {filmsListView, siteMainElement, siteBodyElement};
