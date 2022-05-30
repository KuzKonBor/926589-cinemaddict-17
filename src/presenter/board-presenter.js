import FilmListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import FilmListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import FilmListExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import FilmListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FilmDetailsAndCommentsView from '../view/film-detals-and-comments-view.js';
import {createFilmDetailsCommentTemplate} from '../view/comments-view.js';
import FilmCardModel from '../model/film-cards-model.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import {siteBodyElement} from '../main.js';
import {render} from '../framework/render.js';

const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

const filmCardCountPerStep = 5;

export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsView = new FilmsView();
  #filmListView = new FilmListView();
  #filmListContainerView = new FilmListContainerView();
  #filmListShowMoreButtonView = new FilmListShowMoreButtonView();
  #boardFilmCard = [];
  #renderFilmCard = filmCardCountPerStep;

  constructor(boardContainer, filmCardModel) {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
  }

  init = () => {
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];
    this.#renderBoard();
  };

  #onLoadMoreButtonClick = () => {
    this.#boardFilmCard
      .slice(this.#renderFilmCard, this.#renderFilmCard + filmCardCountPerStep)
      .forEach((filmCard) => this.#renderMovieCard(filmCard));

    this.#renderFilmCard += filmCardCountPerStep;

    if (this.#renderFilmCard >= this.#boardFilmCard.length) {
      this.#filmListShowMoreButtonView.element.remove();
      this.#filmListShowMoreButtonView.removeElement();
    }
  };

  #renderMovieCard = (movieCard) => {
    const movieCardComponent = new FilmCardView(movieCard);
    const movieCardPopupComponent = new FilmDetailsAndCommentsView(movieCard);

    const getRenderPopup = () => {
      render(movieCardPopupComponent, siteBodyElement);
    };

    const getRemovePopup = () => {
      movieCardPopupComponent.element.remove();
    };

    const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        getRemovePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    movieCardComponent.onSetPosterClick(() => {
      getRenderPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    movieCardPopupComponent.onSetCrossClick(() => {
      getRemovePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(movieCardComponent, this.#filmListContainerView.element);

  };

  #renderBoard = () => {
    render(this.#filmsView, this.#boardContainer);

    if (this.#boardFilmCard.every((filmCard) => filmCard.isArchive)) {
      render(new NoFilmCardView(), this.#filmsView.element);
    } else {
      render(this.#filmListView, this.#filmsView.element);
      render(this.#filmListContainerView, this.#filmListView.element);
      render(new FilmListExtraTopRatedView(), this.#filmsView.element);
      render(new FilmListExtraMostCommentedView(), this.#filmsView.element);

      for (let i = 0; i < Math.min(this.#boardFilmCard.length, filmCardCountPerStep); i++) {
        this.#renderMovieCard(this.#boardFilmCard[i]);
      }
      if (this.#boardFilmCard.length > filmCardCountPerStep) {
        render(this.#filmListShowMoreButtonView, this.#filmListView.element);

        this.#filmListShowMoreButtonView.onSetClick(this.#onLoadMoreButtonClick);
      }
    }
  };
}

export {actualArrayComments};
