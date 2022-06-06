import FilmListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/films-list-container-view.js';
import FilmListExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import FilmListExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import FilmListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import {createFilmDetailsCommentTemplate} from '../view/comments-view.js';
import FilmCardModel from '../model/film-cards-model.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';

const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

const FILM_CARD_COUNT_PER_STEP = 5;
export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsView = new FilmsView();
  #filmListView = new FilmListView();
  #filmListContainerView = new FilmListContainerView();
  #filmListShowMoreButtonView = new FilmListShowMoreButtonView();
  #noFilmCardView = new NoFilmCardView();
  #boardFilmCard = [];
  #renderFilmCard = FILM_CARD_COUNT_PER_STEP;

  constructor(boardContainer, filmCardModel) {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
  }

  init = () => {
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];
    this.#renderBoard();
  };

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
    const filmCardPresenter = new FilmCardPresenter(this.#filmListContainerView.element);
    filmCardPresenter.init(movieCard);
  };

  #renderFilmCards = (from, to) => {
    this.#boardFilmCard
      .slice(from, to)
      .forEach((movieCard) => this.#renderMovieCard(movieCard));
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
    this.#renderTaskList ();
  };
}

export {actualArrayComments};
