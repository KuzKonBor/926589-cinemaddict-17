import FilmListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
//import FiltersSortView from './view/filters-sort-view.js';
import FilmListContainerView from '../view/films-list-container-view.js';
import FilmListExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import FilmListExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import FilmListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import {createFilmDetailsCommentTemplate} from '../view/comments-view.js';
import FilmCardModel from '../model/film-cards-model.js';
import NoFilmCardView from '../view/no-film-card-view.js';
//import {siteMainElement} from '../main.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import {updateItem} from '../utils/common.js';

const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

const FILM_CARD_COUNT_PER_STEP = 5;
export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsView = new FilmsView();
  #filmListView = new FilmListView();
  //#filtersSortView = new FiltersSortView();
  #filmListContainerView = new FilmListContainerView();
  #filmListShowMoreButtonView = new FilmListShowMoreButtonView();
  #noFilmCardView = new NoFilmCardView();
  #boardFilmCard = [];
  #renderFilmCard = FILM_CARD_COUNT_PER_STEP;
  #filmCardPresenter = new Map();

  constructor(boardContainer, filmCardModel) {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
  }

  init = () => {
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];
    this.#renderBoard();
  };

  #onModeChange = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.resetView());
  };


  #onFilmCardChange = (updatedFilmCard) => {
    this.#filmCardModel = updateItem(this.#filmCardModel, updatedFilmCard);
    this.#filmCardPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  };
  /*
  #onSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  #renderSort = () => {
    render(this.#filtersSortView, siteMainElement, RenderPosition.AFTERBEGIN);
    this.#filtersSortView.onSetSortTypeChange(this.#onSortTypeChange);
  };
*/

  #onLoadMoreButtonClick = () => {
    this.#renderFilmCards(this.#renderFilmCard, this.#renderFilmCard + FILM_CARD_COUNT_PER_STEP);

    this.#renderFilmCard += FILM_CARD_COUNT_PER_STEP;

    if (this.#renderFilmCard >= this.#boardFilmCard.length) {
      remove(this.#filmListShowMoreButtonView);
    }
  };

  #renderTaskList = () => {
    render(this.#filmListView, this.#filmsView.element);
    render(this.#filmListContainerView, this.#filmListView.element);
    render(new FilmListExtraTopRatedView(), this.#filmsView.element);
    render(new FilmListExtraMostCommentedView(), this.#filmsView.element);
    this.#renderFilmCards(0, Math.min(this.#boardFilmCard.length, FILM_CARD_COUNT_PER_STEP));

    if (this.#boardFilmCard.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderMovieCard = (movieCard) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmListContainerView.element, this.#onFilmCardChange, this.#onModeChange);
    filmCardPresenter.init(movieCard);
    this.#filmCardPresenter.set(movieCard.id, filmCardPresenter);
  };

  #renderFilmCards = (from, to) => {
    this.#boardFilmCard
      .slice(from, to)
      .forEach((movieCard) => this.#renderMovieCard(movieCard));
  };

  #clearTaskList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderFilmCard = FILM_CARD_COUNT_PER_STEP;
    remove(this.#filmListShowMoreButtonView);
  };

  #renderNoFilmCard = () => {
    render(this.#noFilmCardView, this.#filmsView.element, RenderPosition.AFTERBEGIN);
  };

  #renderLoadMoreButton = () => {
    render(this.#filmListShowMoreButtonView, this.#filmListView.element);
    this.#filmListShowMoreButtonView.onSetClick(this.#onLoadMoreButtonClick);
  };

  #renderBoard = () => {
    render(this.#filmsView, this.#boardContainer);

    if (this.#boardFilmCard.every((filmCard) => filmCard.isArchive)) {
      this.#renderNoFilmCard();
      return;
    }
    this.#renderTaskList();
  };
}

export {actualArrayComments};
