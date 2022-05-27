
import UserTitleView from './view/user-profile-view.js';
import FiltersSortView from './view/filters-view.js';
import FiltersNavigationView from './view/main-navigation-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilmCardModel from './model/film-cards-model.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmCardModel = new FilmCardModel();
const boardPresenter = new BoardPresenter(siteMainElement, filmCardModel);

render(new UserTitleView(), siteHeaderElement);
render(new FiltersNavigationView(), siteMainElement);
render(new FiltersSortView(), siteMainElement);

boardPresenter.init();

export {siteBodyElement};
