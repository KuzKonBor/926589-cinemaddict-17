import FilmListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import FiltersSortView from '../view/filters-sort-view.js';
import FilmListContainerView from '../view/films-list-container-view.js';
import FilmListExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import FilmListExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import FilmListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import {createFilmDetailsCommentTemplate} from '../view/comments-view.js';
import FilmCardModel from '../model/film-cards-model.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import {siteMainElement} from '../main.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortFilmsDown, getSortRating} from '../utils/film-card.js';
import {SortType} from '../fish/const.js';

const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

const FILM_CARD_COUNT_PER_STEP = 5;
export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsView = new FilmsView();
  #filmListView = new FilmListView();
  #filtersSortView = new FiltersSortView();
  #filmListContainerView = new FilmListContainerView();
  #filmListExtraTopRatedView = new FilmListExtraTopRatedView();
  #filmListExtraMostCommentedView = new FilmListExtraMostCommentedView();
  #filmListShowMoreButtonView = new FilmListShowMoreButtonView();
  #noFilmCardView = new NoFilmCardView();
  #boardFilmCard = [];
  #renderFilmCard = FILM_CARD_COUNT_PER_STEP;
  #filmCardPresenterMap = new Map();
  #currentSortType = SortType.SORT_BY_DEFAULT;
  #sourcedBoardFilms = [];

  constructor(boardContainer, filmCardModel) {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
  }

  init = () => {
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];
    this.#sourcedBoardFilms = [...this.#filmCardModel.filmCard];
    this.#renderSort();
    this.#renderBoard();
  };

  #onModeChange = () => {
    this.#filmCardPresenterMap.forEach((presenter) => presenter.resetView());
  };


  #onFilmCardChange = (updatedFilmCard) => {
    this.#boardFilmCard = updateItem(this.#boardFilmCard, updatedFilmCard);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilmCard);
    this.#filmCardPresenterMap.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #renderMovieCard = (movieCard) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmListContainerView.element, this.#onFilmCardChange, this.#onModeChange);
    filmCardPresenter.init(movieCard);
    this.#filmCardPresenterMap.set(movieCard.id, filmCardPresenter);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case sortType.SORT_BY_DATE:
        this.#boardFilmCard.sort(sortFilmsDown);
        break;
      case sortType.SORT_BY_RATING:
        this.#boardFilmCard.sort(getSortRating);
        break;
      default:
        this.#boardFilmCard = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortFilms(sortType);
    this.#clearFilmCardList();
    this.#renderFilmCardList();
  };


  #renderSort = () => {
    render(this.#filtersSortView, siteMainElement, RenderPosition.BEFOREEND);
    this.#filtersSortView.onSetSortTypeChange(this.#onSortTypeChange);
  };

  #renderFilmCardList = () => {
    render(this.#filmListView, this.#filmsView.element);
    render(this.#filmListContainerView, this.#filmListView.element);
    render(this.#filmListExtraTopRatedView, this.#filmsView.element);
    render(this.#filmListExtraMostCommentedView, this.#filmsView.element);
    this.#renderFilmCards(0, Math.min(this.#boardFilmCard.length, FILM_CARD_COUNT_PER_STEP));

    if (this.#boardFilmCard.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #onLoadMoreButtonClick = () => {
    this.#renderFilmCards(this.#renderFilmCard, this.#renderFilmCard + FILM_CARD_COUNT_PER_STEP);

    this.#renderFilmCard += FILM_CARD_COUNT_PER_STEP;

    if (this.#renderFilmCard >= this.#boardFilmCard.length) {
      remove(this.#filmListShowMoreButtonView);
    }
  };

  #renderFilmCards = (from, to) => {
    this.#boardFilmCard
      .slice(from, to)
      .forEach((movieCard) => this.#renderMovieCard(movieCard));
  };

  #clearFilmCardList = () => {
    this.#filmCardPresenterMap.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterMap.clear();
    this.#renderFilmCard = FILM_CARD_COUNT_PER_STEP;
    remove(this.#filmListShowMoreButtonView);
  };

  #renderNoFilmCard = () => {
    render(this.#noFilmCardView, this.#filmsView.element, RenderPosition.BEFOREEND);
  };

  #renderLoadMoreButton = () => {
    render(this.#filmListShowMoreButtonView, this.#filmListView.element);
    this.#filmListShowMoreButtonView.onSetClick(this.#onLoadMoreButtonClick);
  };

  #renderBoard = () => {
    render(this.#filmsView, this.#boardContainer);

    if (this.#boardFilmCard.every((filmCard) => filmCard === null)) {
      this.#renderNoFilmCard();
      return;
    }
    this.#renderFilmCardList();
  };
}

export {actualArrayComments};
